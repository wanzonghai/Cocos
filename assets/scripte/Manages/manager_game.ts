import apic from '../Commons/apic';
import resDate from '../Commons/resDate';
import { IPlayerInfo } from '../Tools/interface';
import { Singleton } from '../Tools/singleton';

export default class manager_game extends Singleton<manager_game> {
    public itemPokerPre: cc.Prefab = null;
    public itemPokerNode: Node[] = [];
    public playerInfo: IPlayerInfo = null;

    public isGameFinish: boolean = false;

    /**初始化 */
    public init() {
        this.itemPokerPre = null;
        this.itemPokerNode.length = 0;
        apic.poolMg.init();
        this.playerInfo = { name: 'Timtim', score: 0, avatar: 'bg05', adree: 1 };
    }
    public loadRes() {
        return new Promise<void>((resolve, reject) => {
            apic.resMg.loadResourceDir(resDate.spriteAlats, cc.SpriteFrame, (error: Error, resources: cc.SpriteAtlas[]) => {
                if (error) reject();
                resources.forEach((element) => {
                    element.addRef();
                });
                resolve();
            });
        });
    }

    public loadPre() {
        return new Promise<void>((resolve, reject) => {
            apic.resMg.loadResource(resDate.itemTask, cc.Prefab, (error: Error, resource: cc.Prefab) => {
                if (error) reject();
                resource.addRef();
                resolve();
            });
        });
    }

    public createrPoker() {
        if (!this.itemPokerPre) return;
        // if (this.itemPokerNode.length > 0) this.itemPokerNode.length = 0;
        return apic.poolMg.createEnemy();
    }

    public removePoker(enemy: cc.Node) {
        apic.poolMg.pullEnemy(enemy);
        let a: cc.SpriteAtlas = null;
        a.getSpriteFrames();
    }
}
