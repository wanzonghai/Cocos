// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import apic from '../Commons/apic';
import { gameDate } from '../Commons/gameDate';
import resDate from '../Commons/resDate';
import mathematics from '../Tools/mathematics';

const { ccclass, property } = cc._decorator;

@ccclass
export default class firstScene extends cc.Component {
    private layout_task: cc.Node = null;
    private Top: cc.Node = null;
    private btn_pig: cc.Button = null;
    private sprite_pig: cc.Sprite = null;
    private btn_agaric: cc.Button = null;
    private sprite_agaric: cc.Sprite = null;
    private btn_cactus: cc.Button = null;
    private sprite_cactus: cc.Sprite = null;
    private btn_start: cc.Button = null;

    private label_score: cc.Label = null;
    private label_time: cc.Label = null;

    protected resAlats: cc.SpriteFrame[] = null;
    protected randromNArr: number[] = [];

    private isWin: boolean = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //获取屏幕分辨率
        let frame: cc.Size = cc.view.getFrameSize();
        //获取宽高比
        let ratio = frame.width / frame.height > 1920 / 1080;
        let fitHeight = ratio;
        let fitWidth = !ratio;
        cc.Canvas.instance.fitHeight = fitHeight;
        cc.Canvas.instance.fitWidth = fitWidth;
        this.initView();
    }
    private initView() {
        let Mid: cc.Node = this.node.getChildByName('Mid');
        this.Top = this.node.getChildByName('Top');
        this.layout_task = Mid.getChildByName('layout_task');
        this.btn_pig = Mid.getChildByName('btn_pig').getComponent(cc.Button);
        this.sprite_pig = this.btn_pig.getComponent(cc.Sprite);
        this.btn_agaric = Mid.getChildByName('btn_agaric').getComponent(cc.Button);
        this.sprite_agaric = this.btn_agaric.getComponent(cc.Sprite);
        this.btn_cactus = Mid.getChildByName('btn_cactus').getComponent(cc.Button);
        this.sprite_cactus = this.btn_cactus.getComponent(cc.Sprite);
        this.btn_start = Mid.getChildByName('btn_start').getComponent(cc.Button);

        this.label_score = Mid.getChildByName('label_score').getComponent(cc.Label);
        this.label_time = Mid.getChildByName('label_time').getComponent(cc.Label);
    }

    onEnable() {
        this.initEvent();
        this.initUi();
        apic.gameMg.loadRes().then(() => {
            this.resAlats = apic.resMg.getRes<cc.SpriteFrame[]>(resDate.spriteAlats, cc.SpriteFrame);
            apic.gameMg.loadPre().then(() => {
                this.OnCreateItem();
            });
        });
    }

    private initEvent() {
        this.btn_pig.node.on('click', this.OnClickHandel, this);
        this.btn_agaric.node.on('click', this.OnClickHandel, this);
        this.btn_cactus.node.on('click', this.OnClickHandel, this);
        this.btn_start.node.on('click', this.OnClickHandel, this);
    }
    start() {
        console.log();
    }
    update(deltaTime: number) {}
    private initUi() {
        this.label_score.string = gameDate.gameScore_init + '';
        this.label_time.string = 'Time:' + gameDate.gameTime + 'S';
    }

    private OnCreateItem() {
        this.isWin = false;
        this.label_time.string = 'Time:' + gameDate.gameTime + 'S';
        let itemTaskPrefab: cc.Prefab = apic.resMg.getRes<cc.Prefab>(resDate.itemTask, cc.Prefab);
        let lenNArr: number = this.randromNArr.length;
        if (this.layout_task.childrenCount > 0) {
            this.randromNArr.length = 0;
            apic.resMg.putRes(itemTaskPrefab.name, itemTaskPrefab, cc.Prefab);
            this.layout_task.removeAllChildren();
        }

        for (let index = 0; index < gameDate.proNum; index++) {
            let randromN: number = mathematics.randomNum(10, 14);
            while (this.randromNArr[lenNArr - 1] == randromN) {
                randromN = mathematics.randomNum(11, 14);
            }
            if (index == 4) {
                randromN = 14;
            }
            this.randromNArr.push(randromN);

            let randromName = 'png_' + randromN;
            let itemTaskNode: cc.Node = cc.instantiate(itemTaskPrefab);
            if (!itemTaskNode) {
                return;
            }
            itemTaskNode.getChildByName('sprite').getComponent(cc.Sprite).spriteFrame = apic.resMg.getResPoolElement(this.resAlats, randromName);
            this.layout_task.addChild(itemTaskNode);
        }
    }

    private UpdateTime() {
        this.unscheduleAllCallbacks();
        let curTime: number = gameDate.gameTime;
        let _updateTime = () => {
            curTime--;
            this.label_time.string = 'Time:' + curTime + 'S';
            if (curTime <= 0) {
                this.unschedule(_updateTime);
                return;
            }
        };

        this.schedule(_updateTime, 1);
    }

    lateUpdate() {}

    private OnClickHandel(event: cc.Button) {
        let btnNode: cc.Node = event.target;
        let name: string = btnNode?.name || '';
        if (name != 'btn_start') {
            if (this.isWin) {
                return;
            }
            this.OnChangeSprite();
            let btnSprite: cc.Sprite = btnNode.getComponent(cc.Sprite);
            btnSprite.spriteFrame = apic.resMg.getResPoolElement(this.resAlats, 'png_2');
        }
        switch (name!) {
            case 'btn_pig':
                this.selecJudge(11);
                // btnSprite.spriteFrame=
                break;
            case 'btn_agaric':
                this.selecJudge(12);
                // btnSprite.spriteFrame=
                break;
            case 'btn_cactus':
                this.selecJudge(13);
                // btnSprite.spriteFrame=
                break;
            case 'btn_start':
                this.OnCreateItem();
                this.UpdateTime();
                break;
            default:
                break;
        }
    }
    private selecJudge(selecIndex: number) {
        let judge: number = 0;
        for (let index = 0; index < this.randromNArr.length / 2; index++) {
            const element = this.randromNArr[index];
            for (let index_i = this.randromNArr.length / 2; index_i < this.randromNArr.length; index_i++) {
                const element_i = this.randromNArr[index_i];
                if (element_i == element) {
                    if (index != this.randromNArr.length / 2 - 1 && index_i != this.randromNArr.length - 1) {
                        let curIndex = index + 1;
                        judge = this.randromNArr[curIndex];
                        if (judge == this.randromNArr[curIndex + 1]) {
                            curIndex = curIndex >= this.randromNArr.length / 2 ? this.randromNArr.length / 2 - 1 : curIndex + 1;
                            judge = this.randromNArr[curIndex];
                            break;
                        }
                        break;
                    } else {
                        let curIndex_i = index - 1;
                        judge = this.randromNArr[curIndex_i];
                        if (judge == this.randromNArr[curIndex_i - 1]) {
                            curIndex_i = curIndex_i <= 0 ? 0 : curIndex_i - 1;
                            judge = this.randromNArr[curIndex_i];
                            break;
                        }
                        break;
                    }
                }
            }
        }
        if (judge == 0) {
            this.OnCreateItem();
            return;
        }
        if (selecIndex == judge) {
            let randromName: string = 'png_' + judge;
            this.layout_task.children[4].getChildByName('sprite').getComponent(cc.Sprite).spriteFrame = apic.resMg.getResPoolElement(this.resAlats, randromName);
            this.OnWinHandel();
        }
    }
    private OnChangeSprite() {
        this.sprite_agaric.spriteFrame = this.sprite_cactus.spriteFrame = this.sprite_pig.spriteFrame = apic.resMg.getResPoolElement(this.resAlats, 'png_3');
    }
    private OnWinHandel() {
        apic.uiMg.ShowPanel('panelWin', this.Top, () => {
            this.isWin = true;
            this.unscheduleAllCallbacks();
            gameDate.gameScore_init += gameDate.gameScore_change;
            this.label_score.string = gameDate.gameScore_init + '';
            this.label_time.string = 'Time:' + gameDate.gameTime + 'S';
        });
    }
    onDisable() {
        this.removeEvent();
    }
    onDestroy() {
        this.removeEvent();
        this.resAlats.forEach((element) => {
            element.decRef();
        });
    }
    private removeEvent() {
        this.btn_pig.node.off('click', this.OnClickHandel, this);
        this.btn_agaric.node.off('click', this.OnClickHandel, this);
        this.btn_cactus.node.off('click', this.OnClickHandel, this);
        this.btn_start.node.off('click', this.OnClickHandel, this);
    }
}
