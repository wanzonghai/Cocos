import { Singleton } from './singleton';

export default class mathematics extends Singleton<mathematics> {
    public static randomNum(maxnum, minnum) {
        if (!(maxnum instanceof Number) || !(minnum instanceof Number)) {
            maxnum = parseInt(maxnum);
            minnum = parseInt(minnum);
        }
        return Math.floor(Math.random() * (maxnum - minnum + 1) + minnum);
    }

    public static isAfreshSele(arrAfresh: number[] | string[], afresh: number | string): boolean {
        try {
            arrAfresh.forEach((element) => {
                if (element === afresh) {
                    throw Error();
                }
            });
        } catch (error) {
            return true;
        }
        return false;
    }
}
