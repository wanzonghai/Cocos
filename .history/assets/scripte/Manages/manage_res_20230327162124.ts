import apic from '../Commons/apic';
import Dictionary from '../Tools/Dictionary';
import { IInterResources } from '../Tools/interface';
import { Singleton } from '../Tools/singleton';

export default class manage_res extends Singleton<manage_res> {
    public spriteFrames: cc.SpriteAtlas = null;
    public otherSpriteFrames: cc.SpriteAtlas = null;

    private static _instance: manage_res = null;
    //类中对资源接口的声明，必须声明接口中的全部属性或者方法
    private _allResources: IInterResources = {
        Node: {},
        Prefab: {},
        NodePool: {},
        AnimationClip: {},
        ParticleAsset: {},
        TiledMapAsset: {},
        Mesh: {},
        AudioClip: {},
        Font: {},
        JsonAsset: {},
        SceneAsset: {},
        SpriteAtlas: {},
        SpriteFrame: {},
        TextAsset: {},
        Texture2D: {},
        Material: {},
        DragonBonesAsset: {},
        DragonBonesAtlasAsset: {},
    };
    constructor() {
        super();
    }

    public init(): void {}
    /**
     * 通过路径获取节点资源名称
     * @param {string} path 要获取的节点资源的路径
     * @returns {string} 返回节点名称的字符串
     */
    public getResourcesName(path: string): string {
        let index = path.lastIndexOf('/');
        if (index === -1) {
            return path;
        } else {
            return path.slice(index + 1);
        }
    }
    public getResourcesTypeName(name: string): string {
        let index = name.lastIndexOf('_');
        if (index === -1) {
            return name;
        } else {
            return name.slice(index + 1);
        }
    }
    /**初始化节点池 */
    public initNodePool(path: string) {
        return new Promise<void>((resolve, reject) => {
            cc.resources.loadDir(path, cc.Prefab, (err, assets) => {
                if (err) return reject();
                assets.forEach((element) => {
                    if (this.hasNode(element.name, cc.Prefab, path)) return resolve();
                    element.addRef();
                    this.putRes(element.name, element as cc.Prefab, cc.Prefab);
                    this.putNodePool(element.name, cc.instantiate(element as cc.Prefab));
                });
                resolve();
            });
        });
    }

    /**
     * 判断是否已经有了这个节点资源
     * @param {string} resName 判断是否已经存在节点资源的名字
     * @param {string} path 可选配置，节点资源的路径
     * @returns {boolean} 有返回true，没有返回false
     */
    public hasNode<T>(resName: string, typeRes: typeof cc.Asset, path?: string): boolean {
        let name: string;
        let typeName = this.getResourcesTypeName(typeRes.name);
        if (path) {
            name = this.getResourcesName(path);
        } else {
            name = resName;
        }
        return this._allResources[typeName][name];
    }
    /**
     * 获取节点，如果handle的Map中有就直接获取到，没有的话就实例化出来
     * @param {string} resName 要获取的节点名称
     * @param {string} path 可选参数，资源路径
     * @returns {cc.Node} 返回节点或者undefined
     */
    public getRes<T>(path: string, typeRes?: typeof cc.Asset): T {
        let resName = this.getResourcesName(path);
        let typeName = this.getResourcesTypeName(typeRes.name);
        //如果名称为name的节点池不存在，就新建一个；如果存在，判断大小，有就取出来用
        let resPool = null;
        if (typeRes) {
            resPool = this.getResPool(resName, typeRes);
            return resPool[resName];
        } else {
            resPool = this.getNodePool(resName);
            if (resPool.size() > 0) {
                return resPool.get();
            }
        }
    }
    //获取类型的字典容器
    private getResPool<T extends cc.Asset>(name: string, typeRes: typeof cc.Asset): T[] {
        let typeName = this.getResourcesTypeName(typeRes.name);

        let resPool: T[] = this._allResources[typeName];
        if (!resPool) {
            resPool = this._allResources[typeName] = [];
        }
        return resPool;
    }

    private getNodePool(name: string) {
        let resPool: cc.NodePool = this._allResources.NodePool[name];
        if (!resPool) {
            resPool = this._allResources.NodePool[name] = new cc.NodePool();
        }
        return resPool;
    }
    /**存资源节点 预设等 到字典容器中
     *
     *
     * @template T
     * @param {string} name
     * @param {T} targetRes
     * @param {number} type  1: //   cc.Prefab:2: //   cc.NodePool:3: //   cc.AnimationClip:4: //   cc.ParticleAsset:5: //   cc.TiledMapAsset:6: //   cc.Mesh:7: //   cc.AudioClip:8: //   cc.Font:9: //   cc.JsonAsset:10: //   cc.SceneAsset:11: //   cc.SpriteAtlas:12: //   cc.SpriteFrame:13: //   cc.TextAsset:14: //   cc.Texture2D:15: //   cc.Material:16: //   dragonBones.DragonBonesAsset :17: //   dragonBones.DragonBonesAtlasAsset :18: //cc.Node:
     * @memberof manage_res
     */
    public putRes<T extends cc.Asset>(name: string, targetRes: T, type?: typeof cc.Asset) {
        //如果名称为name的节点池不存在，就新建一个；如果存在，判断大小，有就取出来用
        let resPool = this.getResPool(name, type);
        let _targetRes = resPool[name];
        if (_targetRes) {
            return;
        }
        resPool[name] = targetRes;
    }
    public putNode(targetNode: cc.Node) {
        let name = targetNode.name;
        //如果名称为name的节点池不存在，就新建一个；如果存在，判断大小，有就取出来用
        let nodePool = this._allResources.NodePool[name];
        if (!nodePool) {
            nodePool = this._allResources.NodePool[name] = new cc.NodePool();
        }
        nodePool.put(targetNode);
    }
    public putNodePool<T>(name: string, targetRes: T) {
        //如果名称为name的节点池不存在，就新建一个；如果存在，判断大小，有就取出来用
        let resPool = null;
        resPool = this.getNodePool(name);
        if (resPool[name]) {
            return;
        }
        resPool.put(targetRes);
    }

    /**获取当前缓冲池的可用对象资源数量
     *
     * @param targetName
     * @returns
     */
    public getResPoolSize<T>(path: string, typeRes: typeof cc.Asset): number {
        let resName: string = this.getResourcesName(path);
        //如果名称为name的节点池不存在，就新建一个；如果存在，判断大小，有就取出来用
        let resPool: cc.Asset[] = this.getResPool(resName, typeRes);
        return resPool.length;
    }
    public getNodePoolSize<T>(name: string): number {
        //如果名称为name的节点池不存在，就新建一个；如果存在，判断大小，有就取出来用
        let resPool: cc.NodePool = this.getNodePool(name);
        return resPool.size();
    }
    /**销毁对象池中缓存的所有资源
     *
     * @param name
     * @param typeRes
     */
    public clearResPool(path: string, typeRes: typeof cc.Asset) {
        let resName: string = this.getResourcesName(path);
        //如果名称为name的节点池不存在，就新建一个；如果存在，判断大小，有就取出来用
        let resPool = this.getResPool(resName, typeRes);
        resPool.length = 0;
    }
    public clearNodePool(name: string) {
        //如果名称为name的节点池不存在，就新建一个；如果存在，判断大小，有就取出来用
        let resPool = this.getNodePool(name);
        resPool.clear();
    }
    /**动态加载 bundle 目录中的资源 */
    public loadBundleRes() {
        return new Promise<cc.SpriteFrame>((resolve, reject) => {
            cc.assetManager.loadBundle('bundle', (err: Error, bundle: cc.AssetManager.Bundle) => {
                bundle.load('HelloWorld', cc.SpriteFrame, (err, assets: cc.SpriteFrame) => {
                    console.log(cc.assetManager.assets);
                    console.log('spriteFrame.refCount : ' + assets.refCount);
                    //增加计数
                    assets.addRef();
                    resolve(assets);
                });
            });
        });
    }
    /**在加载了AB包之后，此 bundle 会一直存在整个游戏过程中，除非开发者手动移除
     * 当手动移除了某个不需要的 bundle，那么此 bundle 的缓存也会被移除，如果需要再次使用，则必须再重新加载一次 */
    public removeBundleRes($bundleName: string) {
        let bundle = cc.assetManager.getBundle($bundleName);
        cc.assetManager.removeBundle(bundle);
    }
    /**在移除AB包时，并不会释放该 bundle 中加载过的资源
     *如果需要释放，请先使用AB包的 release / releaseAll 方法：
     *
     * @param {number} $releasetype 释放类型 1：单个资源 2：整个包
     * @param {string} $bundleName  释放AB包名字
     * @param {string} $resName     释放的资源名字
     * @param {(cc.SpriteFrame|cc.Prefab|any)} $resType 释放的资源类型
     * @memberof manage_res
     */
    public releaseBundleResOnce($releasetype: number, $bundleName: string, $isRemoveBundle: boolean = true, $resName?: string, $resType?: cc.SpriteFrame | cc.Prefab | any) {
        // 释放在AB包中的单个资源
        let bundle = cc.assetManager.getBundle($bundleName);
        switch ($releasetype) {
            case 1:
                bundle.release($resName, $resType);
                break;
            case 2:
                // 释放所有属于AB包的资源
                bundle.releaseAll();
            default:
                break;
        }
        //单个资源时 决定是否释放整个包
        $isRemoveBundle && cc.assetManager.removeBundle(bundle);
    }

    /**
     * 加载预制体资源
     * @param path 预制体资源的路径
     * @param completeCallback 完成之后的回调
     */
    public loadPrefab(path: string, completeCallback: (error: Error, resource: cc.Prefab) => void) {
        let prefabName = this.getResourcesName(path);
        if (this._allResources.Prefab[prefabName]) {
            completeCallback(undefined, this._allResources.Prefab[prefabName][0] as cc.Prefab);
        } else {
            let callFunc = (error: Error, resource: cc.Prefab) => {
                if (!error) {
                    if (this.hasNode(prefabName, cc.Prefab, path)) return;
                    this.putRes(prefabName, resource, cc.Prefab);
                    // this._allResources.Prefab[prefabName];
                }
                completeCallback(error, resource);
            };
            cc.resources.load(path, cc.Prefab, callFunc);
        }
    }

    /**
     * 加载其他资源
     * @param path 加载的资源的路径
     * @param type 加载的资源的类型
     * @param completeCallback 加载完成之后的回调
     */
    public loadResource<T extends cc.Asset>(path: string, typeRes: typeof cc.Asset, completeCallback: (error: Error, resource: cc.Asset) => void) {
        let assetName = this.getResourcesName(path);
        let typeName = this.getResourcesTypeName(typeRes.name);
        if (this._allResources[typeName][assetName]) {
            completeCallback(undefined, this._allResources[typeName][assetName]);
        } else {
            let callFunc = (err: Error, resource: T) => {
                if (!err) {
                    if (this.hasNode(assetName, typeRes, path)) return;
                    this._allResources[typeName][assetName] = resource;
                }
                completeCallback(err, resource);
            };
            cc.resources.load(path, typeRes, callFunc);
        }
    }
    /**
     * 加载目录下的资源
     * @param path 加载的资源的路径
     * @param type 加载的资源的类型
     * @param completeCallback 加载完成之后的回调
     */
    public loadResourceDir<T extends cc.Asset>(path: string, typeRes: typeof cc.Asset, completeCallback: (error: Error, resource: cc.Asset[]) => void) {
        let assetName = this.getResourcesName(path);
        let typeName = this.getResourcesTypeName(typeRes.name);

        if (this._allResources[typeName][assetName]) {
            completeCallback(undefined, this._allResources[typeName][assetName]);
        } else {
            let callFunc = (err: Error, resource: T[]) => {
                if (!err) {
                    this._allResources[typeName][assetName] = resource;
                }
                completeCallback(err, resource);
            };
            cc.resources.loadDir(path, callFunc);
        }
    }

    public getResPoolElement<T extends cc.Asset>(resPool: T[], targetName: string) {
        let targetRes: T = null;
        try {
            resPool.forEach((element) => {
                if (element.name == targetName) {
                    targetRes = element;
                    throw Error();
                }
            });
        } catch (error) {
            return targetRes;
        }
    }
}
