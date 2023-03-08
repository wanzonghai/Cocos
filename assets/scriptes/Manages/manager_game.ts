import { assert, Asset, Component, instantiate, Node, Prefab, SpriteAtlas, SpriteComponent } from 'cc';
import apic from '../Commons/apic';
import { gameDate } from '../Commons/gameDate';
import ResourceConfig from '../Commons/ResourceConfig';
import { IPlayerData } from '../Tools/interface';
import { Singleton } from '../Tools/singleton';

export default class manager_game extends Singleton<manager_game> {
    public itemPreTypeArray: Prefab[] = [];

    public gameResMap: Map<string, Asset> = null;

    public playerData: IPlayerData = null;

    public isGameFinish: boolean = false;

    /**初始化 */
    public init() {
        this.itemPreTypeArray.length = 0;
        this.gameResMap = new Map<string, Asset>();
        this.playerData = { proNum: gameDate.proNum, score: gameDate.gameScore_init };
        this.isGameFinish = false;
    }
    //加载的节点 作为托管驻点
    public loadRes(node) {
        //bx_mjb_zz_trocokingtrucoonline
        //fruitsAltals.plist
        return new Promise((resolve, reject) => {
            let panelAtlasUrl = ResourceConfig.textures + ResourceConfig.panelAtlas;
            let fruitsAltalsUrl = ResourceConfig.textures + ResourceConfig.fruitsAltals;
            apic.resMg.load(node, [panelAtlasUrl, fruitsAltalsUrl], SpriteAtlas, (assets: Asset[]) => {
                assets.forEach((element) => {
                    this.gameResMap.set(element.name, element);
                });
                resolve(this.gameResMap);
            });
        });
    }
}
