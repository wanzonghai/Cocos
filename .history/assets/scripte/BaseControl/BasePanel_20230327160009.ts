import Dictionary from '../Tools/Dictionary';
import { IInterResources } from '../Tools/interface';
import { LinkedList } from '../Tools/LinkedList';

const { ccclass, property } = cc._decorator;
@ccclass
export default class BasePanel extends cc.Component {
    //通过里式转换原则 来存储所有的控件
    private controlDic: Dictionary<LinkedList<cc.Node>>;

    onLoad() {
        this.FindChildrenControl<cc.Button>(true);
        this.FindChildrenControl<cc.Sprite>();
        this.FindChildrenControl<cc.Label>();
        this.FindChildrenControl<cc.Toggle>();
        this.FindChildrenControl<cc.Slider>();
        this.FindChildrenControl<cc.RichText>();
       
    }
    onEnable() {}
    start() {}
    update(deltaTime: number) {}
    /// <summary>
    /// 显示自己
    /// </summary>
    public ShowMe() {}

    /// <summary>
    /// 隐藏自己
    /// </summary>
    public HideMe() {}

    protected OnClick(btnName: string) {}

    protected OnValueChanged(toggleName: string, value: Boolean) {}
    lateUpdate() {}
    onDisable() {
        this.FindChildrenControl<cc.Button>(false);
    }
    onDestroy() {
        this.FindChildrenControl<cc.Button>(false);
    }

    /**
     * @private
     * @template T
     * @param {Boolean} [statues]
     * @memberof BasePanel
     */
    private FindChildrenControl<T>(statues?: Boolean) {
        var controls: cc.Node[] = this.node.children;
        for (let i = 0; i < controls.length; ++i) {
            let objName: string = (controls[i] as cc.Node).name;
            if (this.controlDic.has(objName)) {
                this.controlDic[objName].Add(controls[i]);
            } else {
                let linkedListT = new LinkedList<cc.Node>();
                linkedListT.push(controls[i] as cc.Node);

                this.controlDic.set(objName, linkedListT);
            }
            //如果是按钮控件
            let btnControl = controls[i].getComponent(cc.Button);
            let toggleControl = controls[i].getComponent(cc.Toggle);
            if (btnControl) {
                if (statues) {
                    btnControl.node.on(
                        'click',
                        () => {
                            this.OnClick(objName);
                        },
                        this
                    );
                } else {
                    btnControl.node.off(
                        'click',
                        () => {
                            this.OnClick(objName);
                        },
                        this
                    );
                }
            }
            //如果是单选框或者多选框
            else if (toggleControl) {
                if (statues) {
                    toggleControl.node.on(
                        'toggle',
                        (value) => {
                            this.OnValueChanged(objName, value);
                        },
                        this
                    );
                } else {
                    toggleControl.node.off(
                        'toggle',
                        (value) => {
                            this.OnValueChanged(objName, value);
                        },
                        this
                    );
                }
            }
        }
    }
}
