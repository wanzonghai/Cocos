import { assert, Component, instantiate, Node, Prefab, SpriteAtlas, SpriteComponent } from 'cc';
import apic from '../Commons/apic';
import { gameDate } from '../Commons/gameDate';
import { IPlayerData } from '../Tools/interface';
import { Singleton } from '../Tools/singleton';

export default class manager_game extends Singleton<manager_game> {
    public itemPreTypeArray: Prefab[] = [];

    public spriteFramesPanel: SpriteAtlas = null;
    public spriteFramesFruit: SpriteAtlas = null;

    public playerData: IPlayerData = null;

    public isGameFinish: boolean = false;

    /**初始化 */
    public init() {
        this.itemPreTypeArray.length = 0;
        this.spriteFramesPanel = null;
        this.spriteFramesFruit = null;
        this.playerData = { proNum: gameDate.proNum, score: gameDate.gameScore_init };
        this.isGameFinish = false;
    }
    public loadRes() {
        //bx_mjb_zz_trocokingtrucoonline
        //fruitsAltals.plist
        return new Promise<void>((resolve, reject) => {
            apic.resMg.
            apic.resMg
                .load('textures/panelAtlas')
                .then((atlasPanel: SpriteAtlas) => {
                    this.spriteFramesPanel = atlasPanel as SpriteAtlas;
                    apic.resMg
                        .loadResourceRes('textures/fruitsAltals')
                        .then((atlasFruit: SpriteAtlas) => {
                            this.spriteFramesFruit = atlasFruit as SpriteAtlas;
                            console.log(atlasFruit.getSpriteFrame('png_shuiguo1'));
                            // apic.resMg.loadResourceMoreRes('prefabs').then((preArray: Prefab[]) => {
                            //         this.itemPreTypeArray = preArray;
                            resolve();
                            // }).catch((err) => {
                            //         console.log(err.message);
                            // });;
                        })
                        .catch((err) => {
                            reject(err);
                            console.log(err.message);
                        });
                })
                .catch((err) => {
                    reject(err);
                    console.log(err.message);
                });
        });
    }
}
