import { Prefab, Sprite, SpriteAtlas } from "cc";
import { assetManager } from "cc";
import { AssetManager, SpriteFrame } from "cc";
import { resources } from "cc";
import apic from "../Commons/apic";
import { Dictionary } from "../Commons/Dictionary";
import { Singleton } from "../Tools/singleton";

export default class manage_res extends Singleton<manage_res>{
    public spriteFrames: SpriteAtlas = null;
    public otherSpriteFrames: SpriteAtlas = null;

    /**动态加载 bundle 目录中的资源 */
    public loadBundleRes() {
        return new Promise<SpriteFrame>((resolve, reject) => {
            assetManager.loadBundle("bundle", (err: Error, bundle: AssetManager.Bundle) => {
                bundle.load("HelloWorld", SpriteFrame, (err, assets: SpriteFrame) => {
                    console.log(assetManager.assets);
                    console.log("spriteFrame.refCount : " + assets.refCount);
                    //增加计数
                    assets.addRef();
                    resolve(assets)
                });
            });
        })
       
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
    public releaseBundleResOnce($releasetype:number,$bundleName: string,$isRemoveBundle:boolean=true,$resName?: string, $resType?: SpriteFrame|Prefab|any) {
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
        $isRemoveBundle&& assetManager.removeBundle(bundle);
    }
    /**
     * loadResourceRes
     * 释放时assetManager.releaseAsset(texture);
     * this.spriteFrame.decRef();this.spriteFrame = null;
     * @param $path 资源地址
     * @returns 
     */
    public loadResourceRes($path: string) {
       return new Promise((resolve, reject) => {
            resources.load($path, (error: Error, assets) => {
                if (error) reject(error); 
                // let frame = assets.getSpriteFrame("sheep_down_0");
                // this.sprite.spriteFrame = frame;
                assets.addRef();
                resolve(assets);
            })
        })
      
    }

    public fanxing<T>(value: T){
        // return value;
    }
}