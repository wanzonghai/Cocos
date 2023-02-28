import apic from "../Commons/apic";
import { IPlayerInfo } from "../Tools/interface";
import mathematics from "../Tools/mathematics";
import { Singleton } from "../Tools/singleton";
import { manage_event } from "./manage_event";

export default class manager_ai extends Singleton<manager_ai> {
    public aiInfo: IPlayerInfo = null;
   
    public init(): void {
        this.aiInfo = { name: 'kalami', score: 0, avatar: 'bg05', adree: 2 };
        
    }
    /**Ai抽牌 */
    public aiDrawCard() {
        
        let pokerIndex: number = mathematics.randomNum(apic.pokerMg.pokerRed.length, 0);
        manage_event.event.emit('ai_act',pokerIndex);
    }

}


