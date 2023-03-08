import { _decorator, Component, Node, Prefab, resources, Button, Label, find, Sprite, SpriteFrame, SpriteAtlas } from 'cc';
import apic from '../Commons/apic';
import { gameDate } from '../Commons/gameDate';
import ResourceConfig from '../Commons/ResourceConfig';
import DynamicAssetManager from '../Manages/DynamicAssetManager';
import feibiaoPool from '../Manages/feibiaoPool';
import fruitPool from '../Manages/fruitPool';
import proNumPool from '../Manages/proNumPool';
import commonTool from '../Tools/commonTool';
import item_feibiao from './item_feibiao';
import item_fruits from './item_fruit';
import item_proNum from './item_proNum';
const { ccclass, property } = _decorator;

@ccclass('firstScene')
export class firstScene extends Component {
    private node_fruits: Node = null;
    private node_feibiao: Node = null;
    private layout_live: Node = null;

    private btn_stop: Button = null;
    private label_score: Label = null;
    private label_time: Label = null;

    private btn_stop_sprite: Sprite = null;

    private statue_btn: boolean = false;

    private curTime: number = 0;

    onLoad() {
        this.initView();
    }
    private initView() {
        this.node_fruits = find('Canvas/node_fruits');
        this.node_feibiao = find('Canvas/node_feibiao');
        this.layout_live = find('Canvas/png_dikuang/layout_live');

        this.btn_stop = find('Canvas/btn_stop').getComponent(Button);
        this.label_score = find('Canvas/png_dikuan2/label_score').getComponent(Label);
        this.label_time = find('Canvas/png_dikuan3/label_time').getComponent(Label);

        this.btn_stop_sprite = this.btn_stop.getComponent(Sprite);
    }
    onEnable() {
        this.initEvent();
        this.initData().then(() => {
            this.updateView();

        });
    }
    start() {}
    private async initData() {
        apic.gameMg.init();

        this.statue_btn = false;

        this.curTime = gameDate.gameTime;

        await apic.gameMg.loadRes(this.node).then(() => {
            feibiaoPool.GetInstance(feibiaoPool).initPool(gameDate.feibiaoNum);

            fruitPool.GetInstance(fruitPool).initPool(gameDate.fruitNum);

            proNumPool.GetInstance(proNumPool).initPool(gameDate.proNumNum);


        });
    }
    initEvent() {
        this.btn_stop && this.btn_stop.node.on('click', this.onClickHandel, this);
    }

    private updateView() {
        this.label_time.string = 'Time:' + gameDate.gameTime + 's';
        this.label_score.string = gameDate.gameScore_init + '';
    }
    private updatePro(){
        for (let index = 0; index < gameDate.proNum; index++) {
            let itemProNum:Node=
            
        }
    }
    update(deltaTime: number) {}

    lateUpdate() {}
    private onClickHandel(event) {
        let name: string = event.node.name;
        this.statue_btn = !this.statue_btn;
        switch (name) {
            case 'btn_stop':
                let spriteFrameName: string = this.statue_btn ? 'icon_zhanting' : 'icon_kaishi';

                this.btn_stop_sprite.spriteFrame = this.getSpriteAtlas(ResourceConfig.panelAtlas).getSpriteFrame(spriteFrameName);

                this.statue_btn ? this.gameStar() : this.gameStop();
                break;

            default:
                break;
        }
    }

    //game star
    private gameStar() {
        this.schedule(this.scheduleHandel, 1);
    }
    private gameStop() {
        this.unschedule(this.scheduleHandel);
    }

    private scheduleHandel() {
        this.curTime--;
        if (!this.curTime || this.curTime == 0) {
            this.gameStop();
        }
        this.label_time.string = 'Time:' + this.curTime + 's';
    }

    private getSpriteAtlas($spriteAtlasName: string) {
        return apic.gameMg.gameResMap.get($spriteAtlasName) as SpriteAtlas;
    }
    onDisable() {
        this.removeEvent();
        this.crealData();
    }
    removeEvent() {
        this.btn_stop && this.btn_stop.node.off('click', this.onClickHandel, this);
    }
    onDestroy() {
        this.crealData();
    }

    private crealData() {
        this.statue_btn = null;
        this.curTime = null;
        DynamicAssetManager.GetInstance(DynamicAssetManager).pullAsset(this.node, this.constructor.name);
        this.unscheduleAllCallbacks();
    }
}
