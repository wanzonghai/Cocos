import manager_game from '../Manages/manager_game';

import DynamicAssetManager from '../Manages/DynamicAssetManager';

export default class apic {
    public static resMg = DynamicAssetManager.GetInstance(DynamicAssetManager);

    public static gameMg = manager_game.GetInstance(manager_game);
}
