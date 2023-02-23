import { Prefab, SpriteAtlas } from "cc";
import { resources } from "cc";
import apic from "../Commons/apic";
import { Singleton } from "../Tools/singleton";

export default class manage_res extends Singleton<manage_res>{
    public spriteFrames: SpriteAtlas = null;
    public otherSpriteFrames: SpriteAtlas = null;
    public loadOtherRes() {
        return new Promise<void>((resolve, reject) => {
             // textures 目录下的 poker.plist 文件
             resources.load("textures/poker2", SpriteAtlas, (error: Error, assets: SpriteAtlas) => {
                 if(error)reject()
                 apic.resMg.otherSpriteFrames = assets;
                 resolve();
             })
         })
       
     }
    public loadPokerRes() {
       return new Promise<void>((resolve, reject) => {
            // textures 目录下的 poker.plist 文件
            resources.load("textures/poker", SpriteAtlas, (error: Error, assets: SpriteAtlas) => {
                if(error)reject()
                // let frame = assets.getSpriteFrame("sheep_down_0");
                // this.sprite.spriteFrame = frame;
                apic.resMg.spriteFrames = assets;
                resolve();
            })
        })
      
    }

    public loadPokerPre() {
        return new Promise<Prefab>((resolve, reject) => {
             // prefabs 目录下的item_poker
             resources.load("prefabs/item_poker", Prefab, (error: Error, pre: Prefab) => {
                 if(error)reject()
                 resolve(pre);
             })
         })
       
     }

    public init(): void {
        
    }

    
}