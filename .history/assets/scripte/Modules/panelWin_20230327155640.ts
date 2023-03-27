// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BasePanel from '../BaseControl/BasePanel';

const { ccclass, property } = cc._decorator;

@ccclass
export default class panelWin extends BasePanel {
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        super.onLoad();
    }
    onEnable() {
        super.onEnable();
    }
    private initEvent(){

    }
    start() {
        super.start();
    }
    public ShowMe() {
        super.ShowMe();
    }
    protected OnClick(btnName: string) {
        super.OnClick(btnName);

    }

    protected OnValueChanged(toggleName: string, value: Boolean) {
        super.OnValueChanged(toggleName, value);
    }
    /// <summary>
    /// 隐藏自己
    /// </summary>
    public HideMe() {
        super.HideMe();
    }
    update(deltaTime: number) {
        super.update(deltaTime);
    }
    lateUpdate() {
        super.lateUpdate();
    }
    onDisable() {
        super.onDisable();
    }
    onDestroy() {
        super.onDestroy();
    }
}
