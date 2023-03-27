import BasePanel from '../BaseControl/BasePanel';
import apic from '../Commons/apic';
import Dictionary from '../Tools/Dictionary';
import { Singleton } from '../Tools/singleton';
enum E_UI_Layer {
    Bot,
    Mid,
    Top,
    System,
}
export class manage_ui extends Singleton<manage_ui> {
    public panelDic: Dictionary<BasePanel> = new Dictionary<BasePanel>();

    //记录我们UI的Canvas父对象 方便以后外部可能会使用它
    public canvas: cc.Node = null;
    constructor() {
        super();
    }

    /// <summary>
    /// 显示面板
    /// </summary>
    /// <typeparam name="T">面板脚本类型</typeparam>
    /// <param name="panelName">面板名</param>
    /// <param name="layer">显示在哪一层</param>
    /// <param name="callBack">当面板预设体创建成功后 你想做的事</param>
    public ShowPanel<T>(panelName: string, layer: cc.Node, callBack): BasePanel {
        if (this.panelDic.has(panelName)) {
            this.panelDic.get(panelName).ShowMe();
            // 处理面板创建完成后的逻辑
            if (callBack != null) callBack(this.panelDic[panelName] as T);
            //避免面板重复加载 如果存在该面板 即直接显示 调用回调函数后  直接return 不再处理后面的异步加载逻辑
            return;
        }

        apic.resMg.loadPrefab('ui/' + panelName, (error: Error, pre: cc.Prefab) => {
            //把他作为 Canvas的子对象
            //并且 要设置它的相对位置
            //找到父对象 你到底显示在哪一层
            let father: cc.Node = layer;

            let obj: cc.Node = cc.instantiate(pre);
            //设置父对象  设置相对位置和大小
            obj.setParent(father);
            obj.setPosition(new cc.Vec3());

            //得到预设体身上的面板脚本
            let panel = obj.getComponent(panelName);
            // 处理面板创建完成后的逻辑
            if (callBack != null) callBack(panel);

            //把面板存起来
            this.panelDic.set(panelName, panel);
        });
    }

    /// <summary>
    /// 隐藏面板
    /// </summary>
    /// <param name="panelName"></param>
    public HidePanel(panelName: string) {
        if (this.panelDic.has(panelName)) {
            apic.resMg.putNodePool(panelName, this.panelDic.get(panelName));
            this.panelDic.get(panelName).HideMe();
   
            this.panelDic.delete(panelName);
        }
    }

    /// <summary>
    /// 得到某一个已经显示的面板 方便外部使用
    /// </summary>
    public GetPanel<T>(name: string): BasePanel {
        if (this.panelDic.has(name)) return this.panelDic[name];
        return null;
    }
}
