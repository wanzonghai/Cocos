import BasePool from "../Commons/BasePool";
import ResourceConfig from "../Commons/ResourceConfig";
import item_proNum from "../Modules/item_proNum";

export default class proNumPool extends BasePool{
    public constructor() {
        super();
        //必须赋值(预制体路径)
        this.prefabUrl = "prefabs/"+ResourceConfig.prefab_proNum;
       //可选
        this.MemberFlag = "item_proNum";
        this.script = item_proNum;
        this.nodeName = "item_proNum";
        // this.poolSize = 15;//默认为10路径)

    }
}