import manager_ai from "../Manages/manager_ai";
import manager_game from "../Manages/manager_game";
import manage_poker from "../Manages/manage_poker";
import manage_pool from "../Manages/manage_pool";
import manage_res from "../Manages/manage_res";

export default class apic{
    public static resMg = manage_res.GetInstance(manage_res);
    public static poolMg = manage_pool.GetInstance(manage_pool);
    public static gameMg = manager_game.GetInstance(manager_game);
    public static pokerMg = manage_poker.GetInstance(manage_poker);
    public static aiMg = manager_ai.GetInstance(manager_ai);
}