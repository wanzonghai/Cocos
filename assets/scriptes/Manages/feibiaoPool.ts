import BasePool from "../Commons/BasePool";
import ResourceConfig from "../Commons/ResourceConfig";
import item_feibiao from "../Modules/item_feibiao";

export default class feibiaoPool extends BasePool{
    public constructor() {
        super();
        //必须赋值(预制体路径)
        this.prefabUrl = "prefabs/"+ResourceConfig.prefab_feibiao;
       //可选
        this.MemberFlag = "item_feibiao";
        this.script = item_feibiao;
        this.nodeName = "item_feibiao";
        // this.poolSize = 15;//默认为10路径)
    }
}