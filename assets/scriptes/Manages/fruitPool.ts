import BasePool from "../Commons/BasePool";
import ResourceConfig from "../Commons/ResourceConfig";
import item_fruits from "../Modules/item_fruit";

export default class fruitPool extends BasePool{
    public constructor() {
        super();
        //必须赋值(预制体路径)
        this.prefabUrl = "prefabs/"+ResourceConfig.prefab_fruit;
       //可选
        this.MemberFlag = "item_fruits";
        this.script = item_fruits;
        this.nodeName = "item_fruits";
        // this.poolSize = 15;//默认为10路径)

    }
}