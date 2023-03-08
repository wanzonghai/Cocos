import { _decorator, Component, director } from 'cc';
import DynamicAssetManager from '../Manages/DynamicAssetManager';

const { ccclass } = _decorator;

/**
 * 游戏全局管理器
 */
@ccclass
export default class GameManager extends Component {
    onLoad() {
        director.addPersistRootNode(this.node);
        //macro.ENABLE_MULTI_TOUCH = false;
        GameManager.initMgr(); //注册所有管理器
    }

    static initMgr() {
        DynamicAssetManager.GetInstance(DynamicAssetManager).init(); //动态资源管理器

        // SoundManager.init();//音频管理器

        // ResourceManager.init(); //Protobuf资源管理器

        // NetworkManager.init();//网路管理器

        // HeartBeatManager.init(); //心跳管理器
    }
}
