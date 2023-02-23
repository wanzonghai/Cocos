import { instantiate, Node, Prefab } from "cc";
import apic from "../Commons/apic";
import { item_poker } from "../Modules/item_poker";
import { IPlayerInfo } from "../Tools/interface";
import { Singleton } from "../Tools/singleton";

export default class manager_game extends Singleton<manager_game> {
    public itemPokerPre: Prefab = null;
    public itemPokerNode: Node[] = [];
    public playerInfo: IPlayerInfo = null;

    public isGameFinish: boolean = false;

    /**初始化 */
    public init() {
        this.itemPokerPre = null;
        this.itemPokerNode.length = 0;  
        apic.poolMg.init()
        apic.pokerMg.init();
        apic.aiMg.init();
        this.playerInfo = { name: 'Timtim',score:0,avatar: 'bg05',adree:1};

    }
    public loadRes() {
        return new Promise<void>((resolve, reject) => {
            apic.resMg.loadPokerPre().then((pre) => {
                this.itemPokerPre = pre;
                apic.poolMg.enemyPrefab = pre;
                apic.poolMg.initPool(11);   
                apic.resMg.loadOtherRes().then(() => {
                    apic.resMg.loadPokerRes().then(() => {
                        resolve()  
                    }).catch(() => {
                    reject()
                    });  
                })
                
            })
           
        })
        
    }

    public createrPoker() {
        if (!this.itemPokerPre) return;
        // if (this.itemPokerNode.length > 0) this.itemPokerNode.length = 0;
        return  apic.poolMg.createEnemy();
    }

    public removePoker(enemy: Node) {   
      
        apic.poolMg.pullEnemy(enemy);
    }
}


