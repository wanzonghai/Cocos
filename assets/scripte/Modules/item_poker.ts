import { assetManager } from 'cc';
import { _decorator, Component, Node, SpriteFrame, Sprite, tween, Quat, quat, game } from 'cc';
import { NodeEventType } from '../../../@types/packages/scene/@types/cce/public/event-enum';
import apic from '../Commons/apic';
import manager_game from '../Manages/manager_game';
import { manage_event } from '../Manages/manage_event';
import { IPokerInfo } from '../Tools/interface';
import mathematics from '../Tools/mathematics';
const { ccclass, property } = _decorator;

@ccclass('item_poker')
export class item_poker extends Component {

    public itemInfo: string =  'poker';
   
    onLoad() {
       
    }
    onEnable() {
        
        this.node.on(Node.EventType.TOUCH_START, this._touchStarHandel, this);
        // manage_event.event.on('ai_act', this.__eventAiFunc, this);
    }
    start() {
        //
        apic.gameMg.loadRes().then(()=>{this.updateView();});
        
    }

    public changeData(data:string) {
        this.itemInfo = data;
    }
    update(deltaTime: number) {
    
    }
    lateUpdate() {
        
    }
    onDisable() {
        this.node.off(Node.EventType.TOUCH_START, this._touchStarHandel, this);
        // manage_event.event.off('ai_act', this.__eventAiFunc, this);
        this.updatePokerInfo('poker');
        this.unscheduleAllCallbacks();
    }

    private _touchStarHandel() {
        if (this.node.parent.name != 'layout_bule') return;
      
        
        // console.log(this.itemInfo);
        let count: number = parseInt(this.itemInfo.split("-")[0]);
        let flowerColor: number = parseInt(this.itemInfo.split("-")[1]);
        this.updatePokerInfo(this.itemInfo);
        this.scheduleOnce(() => { 
            manage_event.event.emit('palyer_act', this.node);
            
        }, 0.3);
       
       
    }

    private __eventAiFunc() { 
        this.node.on(Node.EventType.TOUCH_START, this._touchStarHandel, this);
    }
    private updateView() {
       
        // if (this.node.parent.name != 'layout_bule') {
            
        //     this.updatePokerInfo(this.itemInfo)
        // }
    }

    private updatePokerInfo(itemSpriteFrame:string)
    {
        if (!apic.resMg.spriteFrames) return;
        this.node.getComponent(Sprite).spriteFrame = apic.resMg.spriteFrames.getSpriteFrame(itemSpriteFrame);
    }
    onDestroy() {
        /**移除时减少计数 */
        this.node.getComponent(Sprite).spriteFrame.decRef();
        console.log("spriteFrame.refCount : " + this.node.getComponent(Sprite).spriteFrame.refCount);
        /**初始化组件 */
        this.node.getComponent(Sprite).spriteFrame = null;

        //在下一帧打印 assets
        this.scheduleOnce(()=>{
            console.log(assetManager.assets);
        });
    }


}


