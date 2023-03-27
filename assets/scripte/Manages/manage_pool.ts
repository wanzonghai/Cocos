import { Singleton } from '../Tools/singleton';

export default class manage_pool extends Singleton<manage_pool> {
    public enemyPrefab: cc.Prefab = null;
    public enemyPool: cc.NodePool = null;
    public init(): void {
        this.enemyPrefab = null;
        this.enemyPool = null;
    }
    /**初始化对象池 */
    public initPool(initCount: number = 5) {
        this.enemyPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
            this.enemyPool.put(enemy); // 通过 put 接口放入对象池
        }
    }
    /** createEnemy 从对象池请求对象*/
    public createEnemy() {
        let enemy: cc.Node = null;
        if (this.enemyPool.size() > 0) {
            // 通过 size 接口判断对象池中是否有空闲的对象
            // get()获取对象
            enemy = this.enemyPool.get();
        } else {
            // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.enemyPrefab);
        }
        return enemy;
        // enemy.parent = parentNode; // 将生成的敌人加入节点树
        // enemy.getComponent(this.enemyPrefab.name).init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    }
    /** 将对象返回对象池*/
    public pullEnemy(enemy: cc.Node) {
        // enemy 应该是一个 cc.Node
        this.enemyPool.put(enemy); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    }
}
