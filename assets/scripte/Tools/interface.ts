export interface IPokerInfo {
    /**点数 */
    count: number;
    /**花色 */
    flowerColor: number;
}

export interface IPlayerInfo {
    /**name */
    name?: string;
    /**score */
    score?: number;
    /**avater */
    avatar?: string;

    adree?: number;
    /***.... */
}
export interface IInterResources {
    //节点类型
    Node?: { [propName: string]: cc.Node[] };
    Prefab?: { [PropName: string]: cc.Prefab[] };
    NodePool?: { [propName: string]: cc.NodePool };
    //资源动画
    AnimationClip?: { [propName: string]: cc.AnimationClip[] };
    ParticleAsset?: { [propName: string]: cc.ParticleAsset[] };
    TiledMapAsset?: { [propName: string]: cc.TiledMapAsset[] };
    Mesh?: { [propName: string]: cc.Mesh[] };
    AudioClip?: { [propName: string]: cc.AudioClip[] };
    Font?: { [propName: string]: cc.Font[] };
    JsonAsset?: { [propName: string]: cc.JsonAsset[] };
    SceneAsset?: { [propName: string]: cc.SceneAsset[] };
    SpriteAtlas?: { [propName: string]: cc.SpriteAtlas[] };
    SpriteFrame?: { [propName: string]: cc.SpriteFrame[] };
    TextAsset?: { [propName: string]: cc.TextAsset[] };
    Texture2D?: { [propName: string]: cc.Texture2D[] };
    Material?: { [propName: string]: cc.Material[] };
    //龙骨
    DragonBonesAsset?: { [propName: string]: dragonBones.DragonBonesAsset[] };
    DragonBonesAtlasAsset?: { [propName: string]: dragonBones.DragonBonesAtlasAsset[] };
}

export interface IDictionary<T> {
    [key: string]: T;
}
