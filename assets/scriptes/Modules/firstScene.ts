import { _decorator, Component, Node, Prefab, resources, Button, Label, find, Sprite, SpriteFrame } from 'cc';
import apic from '../Commons/apic';
import { gameDate } from '../Commons/gameDate';
import ResourceConfig from '../Commons/ResourceConfig';
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

        await apic.gameMg.loadRes().then(() => {
            feibiaoPool.GetInstance(feibiaoPool).initPool(gameDate.feibiaoNum);
            fruitPool.GetInstance(fruitPool).initPool(gameDate.fruitNum);
            proNumPool.GetInstance(proNumPool).initPool(gameDate.proNumNum);
        });
    }
    initEvent() {
        this.btn_stop && this.btn_stop.node.on('click', this.onClickHandel, this);
    }

    private updateView() {}
    private updateUI() {
        this.label_time.string = 'Time:' + gameDate.gameTime + 's';
        this.label_score.string = gameDate.gameScore_init + gameDate.gameScore_change + '';
    }
    update(deltaTime: number) {}

    lateUpdate() {}
    private onClickHandel(event) {
        let name: string = event.node.name;
        this.statue_btn = !this.statue_btn;
        switch (name) {
            case 'btn_stop':
                let spriteFrameName: string = this.statue_btn ? 'icon_zhanting' : 'icon_kaishi';

                this.btn_stop_sprite.spriteFrame = apic.gameMg.spriteFramesPanel.getSpriteFrame(spriteFrameName);
                break;

            default:
                break;
        }
    }
    onDisable() {
        this.removeEvent();
        this.statue_btn = false;
    }
    removeEvent() {
        this.btn_stop && this.btn_stop.node.off('click', this.onClickHandel, this);
    }
    onDestroy() {
        this.statue_btn = false;
        apic.gameMg.spriteFramesPanel.decRef();
        apic.gameMg.spriteFramesFruit.decRef();
    }
}
