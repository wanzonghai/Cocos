import { Label, Tween, Vec3 } from 'cc';
import { Sprite } from 'cc';
import { _decorator, Component, Node, find, Button, UITransform, tween } from 'cc';
import apic from '../Commons/apic';
import { gameDate } from '../Commons/gameDate';
import manager_ai from '../Manages/manager_ai';
import { manage_event } from '../Manages/manage_event';
import manage_poker from '../Manages/manage_poker';
import manage_pool from '../Manages/manage_pool';
import mathematics from '../Tools/mathematics';
import { item_poker } from './item_poker';
const { ccclass, property } = _decorator;

@ccclass('scene_main')
export class scene_main extends Component {
    private btn_star:Button=null;
    private btn_finish:Button=null;
    private btn_nextGame:Button=null;
    private layout_bule: Node=null;
    private layout_red: Node = null;
    private item_poker: Node = null;

    private avatar_red:Node=null;
    private avatar_bule: Node = null;
    
    private bule_laber: Label = null;
    private red_laber: Label = null;
    private bule_head: Sprite = null;
    private red_head: Sprite = null;

    private playerAct: boolean = false;
    onLoad() {
      
        apic.gameMg.init();
        this.initView();
        
    }
    private initView(){
        this.btn_star=find('Canvas/btn_star').getComponent(Button);
        this.btn_finish=find('Canvas/btn_finish').getComponent(Button);
        this.btn_nextGame = find('Canvas/btn_nextGame').getComponent(Button);
        this.layout_bule=find('Canvas/layout_bule');
        this.layout_red = find('Canvas/layout_red');
        this.item_poker = find('Canvas/item_poker');
        this.avatar_red=find('Canvas/avatar_red');
        this.avatar_bule = find('Canvas/avatar_bule');
        this.bule_laber=this.avatar_bule.getChildByName('score').getComponent(Label);
        this.red_laber=this.avatar_red.getChildByName('score').getComponent(Label);
        this.bule_head=this.avatar_bule.getChildByName('sprite_head').getComponent(Sprite);
        this.red_head=this.avatar_red.getChildByName('sprite_head').getComponent(Sprite);
       
    }
    onEnable () {
        this.btn_star&&this.btn_star.node.on("click",this.onClickHandel,this);
        this.btn_finish&&this.btn_finish.node.on("click",this.onClickHandel,this);
        this.btn_nextGame && this.btn_nextGame.node.on("click", this.onClickHandel, this);
        manage_event.event.on('palyer_act', this.__eventPlayerFunc, this);
        manage_event.event.on('ai_act', this.__eventAiFunc, this);
        
    }
    start() {
        let adree: number = mathematics.randomNum(2, 1);
       
        apic.gameMg.loadRes().then(() => {
            this.updateDate();
        });
    }
    update (deltaTime: number) {
        
    }
    lateUpdate () {
    
    }
    onDisable () {
       this.btn_star&&this.btn_star.node.off("click",this.onClickHandel,this);
        this.btn_finish&&this.btn_finish.node.off("click",this.onClickHandel,this);
        this.btn_nextGame && this.btn_nextGame.node.off("click", this.onClickHandel, this);
        manage_event.event.off('palyer_act', this.__eventPlayerFunc, this);
        manage_event.event.off('ai_act', this.__eventAiFunc, this);
        this.unscheduleAllCallbacks();
        this.playerAct = false;
    }

    private updateDate() {
        let playerInfo = apic.gameMg.playerInfo;
        let aiInfo = apic.aiMg.aiInfo;
        this.red_laber.string = playerInfo.name + playerInfo.score;
        this.red_head.spriteFrame = apic.resMg.otherSpriteFrames.getSpriteFrame(playerInfo.avatar);
        this.bule_laber.string = aiInfo.name + aiInfo.score;
        this.bule_head.spriteFrame = apic.resMg.otherSpriteFrames.getSpriteFrame(aiInfo.avatar);
    }

    private onClickHandel(event){
        let name: string = event.node.name;
        this.btn_star.interactable =name=='btn_star'? false:true;
        switch (name) {
            case "btn_star":
            case  "btn_nextGame":
                if (!apic.resMg.spriteFrames) {
                    apic.gameMg.loadRes().then(() => {
                        this.gameStar();
                    });
                    break;
                }
                this.gameStar();
                break;
            case  "btn_finish"  :
                this.gameFinish();
                break;
        
            default:
                break;
        }
    }
    private gameFinish() {
        this.layout_bule.removeAllChildren();
        this.layout_red.removeAllChildren();
        apic.pokerMg.init();
        apic.gameMg.isGameFinish = false;
    }

    private gameStar() {
        this.btn_star.interactable = false;  
        let pokerIndex: number = mathematics.randomNum(10, 5);
        this.gameFinish();
        for (let index = 0; index < 11; index++) {
            let enemy: Node = apic.gameMg.createrPoker();

            let count:number = mathematics.randomNum(13, 1);
            let flowerColor: number = mathematics.randomNum(4, 1);

            while ( apic.pokerMg.pokerArr.indexOf(count + '-' + flowerColor)== -1) {
                count = mathematics.randomNum(13, 1);
                flowerColor = mathematics.randomNum(4, 1);
            }
            let pocker: string = count + '-' + flowerColor;
            if (index < 5) {
                apic.pokerMg.pokerBlue.push(pocker);
               
            } else {
                if (pokerIndex == index) {
                    pocker = 'poker';
                }
                
                apic.pokerMg.pokerRed.push(pocker);
                this.updatePokerInfo(enemy,pocker);
            }
            apic.pokerMg.pokerArr.splice(apic.pokerMg.pokerArr.indexOf(count + '-' + flowerColor), 1);
            enemy.getComponent(item_poker).changeData(pocker);
            enemy.parent = index < 5 ? this.layout_bule : this.layout_red;    
        }
        
    }
    private updatePokerInfo(cardNode:Node, itemSpriteFrame:string)
    {
        if (!apic.resMg.spriteFrames) return;
        cardNode.getComponent(Sprite).spriteFrame = apic.resMg.spriteFrames.getSpriteFrame(itemSpriteFrame);
    }

    private __eventPlayerFunc($node: Node) {
        this.playerAct = true;
        apic.gameMg.isGameFinish = true;
        let indexId: number = null;
        let isPush: boolean = true;
        let pockerName: string = $node.getComponent(item_poker).itemInfo;
        
        if (!pockerName) return;
        for (let index = 0; index < apic.pokerMg.pokerBlue.length; index++) {
            if (apic.pokerMg.pokerBlue[index] == pockerName) {
                indexId = index;
            } 
        }
        if (indexId == null) {
            $node&&apic.gameMg.removePoker($node); return;
        }
        for (let index = 0; index < apic.pokerMg.pokerRed.length; index++) {
                let element = apic.pokerMg.pokerRed[index];
             
                if (parseInt(element.split("-")[0])==parseInt(pockerName.split("-")[0])) {
                    
                    let elementCard: Node = this.layout_red.children[index];
                    isPush = false;
                    
                    this.scheduleOnce(() => {
                        apic.pokerMg.pokerRed.splice(index, 1);
                        apic.pokerMg.pokerBlue.splice(indexId, 1);
                        $node&& apic.gameMg.removePoker($node);
                        elementCard&&apic.gameMg.removePoker(elementCard);
            
                     }, 0.8);
                } 
        }
        if(isPush){
            apic.pokerMg.pokerRed.push(apic.pokerMg.pokerBlue[indexId]);
            $node.parent = this.layout_red;
            apic.pokerMg.pokerBlue.splice(indexId, 1);
        }

        this.gameOver(apic.pokerMg.pokerBlue).then(() => {
            apic.aiMg.aiInfo.score += gameDate.gameScore_change;
            this.updateDate();
        });
        //ai
        if (apic.gameMg.isGameFinish) {
            this.scheduleOnce(() => {
                apic.aiMg.aiDrawCard();
            }, 0.2);
        }

        // console.log(apic.pokerMg.pokerBlue, apic.pokerMg.pokerRed);
       
    }

    private __eventAiFunc(indexId: number) {
        
        let playerCard: Node = this.layout_red.children[indexId];
        let isPush: boolean = true;

        let showPoker=(pokerCard:Node,poker:string) => {
            pokerCard.getComponent(Sprite).spriteFrame = apic.resMg.spriteFrames.getSpriteFrame(poker); 
        }
        
        if (playerCard) {
            let pokerRedElement = apic.pokerMg.pokerRed[indexId];
            
            if (!pokerRedElement) return;
            for (let index = 0; index < apic.pokerMg.pokerBlue.length; index++) {
                let element = apic.pokerMg.pokerBlue[index];
                
                
                if (!element) return;
                let count: number = parseInt(pokerRedElement.split("-")[0]);
                if (parseInt(element.split("-")[0])==count) {
                    // console.log("相同" + count);
                    let elementCard: Node = this.layout_bule.children[index];
                    isPush = false;
                    showPoker(elementCard, element);
                    // console.log('apic.pokerMg.pokerBlue', apic.pokerMg.pokerBlue, apic.pokerMg.pokerRed);
                    apic.pokerMg.pokerBlue.splice(index, 1);
                    this.scheduleOnce(() => {
                        apic.pokerMg.pokerRed.splice(indexId, 1);
                       playerCard&&  apic.gameMg.removePoker(playerCard);
                       elementCard&& apic.gameMg.removePoker(elementCard);
            
                     }, 0.5);
                  
                } 
            }
            if (isPush) {
                apic.pokerMg.pokerBlue.push(pokerRedElement);
                apic.pokerMg.pokerRed.splice(indexId, 1);
                playerCard.parent = this.layout_bule;
                showPoker(playerCard,'poker');
            }
         
           
            this.gameOver(apic.pokerMg.pokerRed).then(() => {
                apic.gameMg.playerInfo.score += gameDate.gameScore_change;
                this.updateDate();
            });
        }

        //player
      
    }

    private gameOver(pokerArr: string[]) {
        return new Promise<void>((resolve, reject) => {
            if (pokerArr.length <= 0 || (pokerArr.length == 1 && pokerArr[0] == 'poker')) {
                this.btn_star.interactable = true;
                this.scheduleOnce(() => {
                    this.gameStar();
                },0.8)
               
                resolve();
            }
        })
        
    }

    onDestroy () {
    
    }
    
}


