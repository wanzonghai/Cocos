import { Asset, Component, Node, Prefab, Sprite, SpriteAtlas } from 'cc';
import { assetManager } from 'cc';
import { AssetManager, SpriteFrame } from 'cc';
import { resources } from 'cc';
import apic from '../Commons/apic';
import { Dictionary } from '../Commons/Dictionary';
import { Singleton } from '../Tools/singleton';
/**
 * 动态资源加载管理类
 */

export default class DynamicAssetManager extends Singleton<DynamicAssetManager> {
    private _assetMap: Map<string, Asset[]> = null;
    private _assetRefCountMap: Map<string, number> = null;

    /**
     * 初始化
     */
    init() {
        this._assetMap = new Map<string, Asset[]>();
        this._assetRefCountMap = new Map<string, number>();
        console.log('动态资源管理器初始化完成');
    }

    /**
     * 动态加载资源(可以同时加载多个资源)
     * @param node 加载的节点 作为托管驻点
     * @param url 资源路径
     * @param callBackFun 加载完成返回
     */
    public load(node: Node, url: string | string[], assetType: typeof Asset, callBackFun: Function) {
        return new Promise((resolve, reject) => {
            if (node && url) {
                if (Array.isArray(url))
                    resources.load(url, assetType, (err, assets: Asset[]) => {
                        if (err) {
                            console.error(err.message || err);
                            reject(err);
                            return;
                        }
                        if (this.pushAsset(node, assets)) {
                            callBackFun(assets);
                            resolve(assets);
                        }
                    });
                else
                    resources.load(url, assetType, (err, asset: Asset) => {
                        if (err) {
                            console.error(err.message || err);
                            reject(err);
                            return;
                        }
                        if (this.pushAsset(node, asset)) {
                            callBackFun(asset);
                            resolve(asset);
                        }
                    });
            }
        });
    }

    /**
     * 动态加载目录全部资源
     * @param node
     * @param url
     * @param callBackFun
     */
    public loadDir(node: Node, url: string, assetType: typeof Asset, callBackFun: Function) {
        if (node && url) {
            resources.loadDir(url, assetType, (err, assets: Asset[]) => {
                if (err) {
                    console.error(err.message || err);
                    return;
                }
                if (this.pushAsset(node, assets)) {
                    callBackFun(assets);
                }
            });
        }
    }

    /**
     * 动态加载资源(可以同时加载多个资源) Bundel
     * @param node
     * @param url
     * @param callBackFun
     */
    public loadBundel(node: Node, url: string | string[], assetType: typeof Asset, callBackFun: Function) {
        assetManager.loadBundle('bundle', (err: Error, bundle: AssetManager.Bundle) => {
            if (node && url) {
                if (Array.isArray(url))
                    bundle.load(url, assetType, (err, assets: Asset[]) => {
                        if (err) {
                            console.error(err.message || err);
                            return;
                        }
                        if (this.pushAsset(node, assets)) {
                            callBackFun(assets);
                        }
                    });
                else
                    bundle.load(url, assetType, (err, asset: Asset) => {
                        if (err) {
                            console.error(err.message || err);
                            return;
                        }
                        if (this.pushAsset(node, asset)) {
                            callBackFun(asset);
                        }
                    });
            }
        });
    }

    /**
     * 动态加载目录全部资源 Bundel
     * @param node
     * @param url
     * @param callBackFun
     */
    public loadBundelDir(node: Node, url: string, assetType: typeof Asset, callBackFun: Function) {
        assetManager.loadBundle('bundle', (err: Error, bundle: AssetManager.Bundle) => {
            if (node && url) {
                bundle.loadDir(url, assetType, (err, assets: Asset[]) => {
                    if (err) {
                        console.error(err.message || err);
                        return;
                    }
                    if (this.pushAsset(node, assets)) {
                        callBackFun(assets);
                    }
                });
            }
        });
    }
    /**在加载了AB包之后，此 bundle 会一直存在整个游戏过程中，除非开发者手动移除
     * 当手动移除了某个不需要的 bundle，那么此 bundle 的缓存也会被移除，如果需要再次使用，则必须再重新加载一次 */
    public removeBundleRes($bundleName: string) {
        let bundle = assetManager.getBundle($bundleName);
        assetManager.removeBundle(bundle);
    }
    /**
     *在移除AB包时，并不会释放该 bundle 中加载过的资源
     *如果需要释放，请先使用AB包的 release / releaseAll 方法：
     * @param {number} $releasetype 释放类型 1：单个资源 2：整个包
     * @param {string} $bundleName  释放AB包名字
     * @param {string} $resName     释放的资源名字
     * @param {(SpriteFrame|Prefab|any)} $resType 释放的资源类型
     * @memberof manage_res
     */
    public releaseBundleResOnce($releasetype: number, $bundleName: string, $isRemoveBundle: boolean = true, $resName?: string, $resType?: SpriteFrame | Prefab | any) {
        // 释放在AB包中的单个资源
        let bundle = assetManager.getBundle($bundleName);
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
        $isRemoveBundle && assetManager.removeBundle(bundle);
    }

    /**
     * 托管资源
     * @param node
     * @param asset
     */
    private pushAsset(node: Node, asset: Asset | Asset[]): boolean {
        if (node && node.isValid) {
            let nodeId: string = node.uuid;
            if (!nodeId || !asset) {
                console.log(`pushAsset参数不正确:nodeId:${nodeId},asset:${asset}`);
                return false;
            }
            if (asset instanceof Array) {
                for (let as of asset) {
                    this.extracted(as, nodeId);
                }
            } else {
                this.extracted(asset, nodeId);
            }
            return true;
        } else {
            if (asset) {
                console.log(`还没加载完`);
                if (asset instanceof Array) {
                    for (let as of asset) {
                        as.decRef();
                    }
                } else {
                    asset.decRef();
                }
            }
            return false;
        }
    }
    //增加计数
    private extracted(asset: Asset, nodeId: string) {
        let assetArray: Asset[] = this._assetMap.get(nodeId);
        if (!assetArray) {
            assetArray = [];
        }
        //同一个节点只增加一次计数
        if (assetArray.indexOf(asset) < 0) {
            asset.addRef();
            assetArray.push(asset);
            this._assetMap.set(nodeId, assetArray);
        }
    }

    /**
     * 释放资源
     * @param node
     * @param source
     */
    public pullAsset(node: Node, source: string) {
        if (node && node.isValid) {
            let nodeId: string = node.uuid;
            if (this._assetMap.has(nodeId)) {
                let assetArray: Asset[] = this._assetMap.get(nodeId);
                for (let as of assetArray) {
                    console.log(`释放资源:${as.name}`);
                    as.decRef();
                }
                this._assetMap.delete(nodeId);
            }
        } else {
            console.error(`无法释放资源:传了个null,源头:${source}`);
        }
    }

    /**
     * 当前资源种类数量
     */
    public getSize() {
        return this._assetMap.size;
    }

    /**
     * 资源keys
     */
    public getKeys() {
        return this._assetMap.keys();
    }

    public fanxing<T>(value: T) {
        // return value;
    }
}
