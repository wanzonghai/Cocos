import { instantiate, Node, Prefab } from "cc";
import apic from "../Commons/apic";
import { IPlayerInfo } from "../Tools/interface";
import { Singleton } from "../Tools/singleton";

export default class manager_game extends Singleton<manager_game> {
    public itemPreType1: Prefab = null;
    public itemPreType2: Prefab = null;

    public playerInfo: IPlayerInfo = null;

    public isGameFinish: boolean = false;

    /**初始化 */
    public init() {
        this.itemPreType1 = null;
        this.itemPreType2 = null;
        apic.poolMg.init()
        apic.pokerMg.init();
        apic.aiMg.init();
        this.playerInfo = { name: 'Timtim',score:0,avatar: 'bg05',adree:1};

    }
    public loadRes($path:string) {
        return new Promise<void>((resolve, reject) => {
            // apic.resMg.loadResourceRes().then((pre) => {
               
            // })
           
        })
        
    }

    public creater(itemPre) {
        if (!itemPre) return;
        // if (this.itemPokerNode.length > 0) this.itemPokerNode.length = 0;
        return  apic.poolMg.createEnemy();
    }

    public remove(enemy: Node) {   
      
        apic.poolMg.pullEnemy(enemy);
    }
}


