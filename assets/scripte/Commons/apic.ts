import manager_game from '../Manages/manager_game';

import manage_pool from '../Manages/manage_pool';
import manage_res from '../Manages/manage_res';
import { manage_ui } from '../Manages/manage_ui';

export default class apic {
    public static resMg = manage_res.GetInstance(manage_res);
    public static poolMg = manage_pool.GetInstance(manage_pool);
    public static gameMg = manager_game.GetInstance(manager_game);
    public static uiMg = manage_ui.GetInstance(manage_ui);
}
