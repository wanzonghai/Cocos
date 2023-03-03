import { Prefab } from "cc";
import { Singleton } from "../Tools/singleton";

export default class manage_poker extends Singleton<manage_poker> {
    public pokerArr: string[] = [];
    public pokerBlue: string[] = [];
    public pokerRed: string[] = [];
    public init(): void {
        this.pokerArr.length = 0;
        this.pokerBlue.length = 0;
        this.pokerRed.length = 0;
       
        for (let count = 1; count < 14; count++) {
            for (let flowerColor = 1; flowerColor < 5; flowerColor++) {
                let poker = count + '-' + flowerColor;
                this.pokerArr.push(poker);
            }
        }
    }
   
}


