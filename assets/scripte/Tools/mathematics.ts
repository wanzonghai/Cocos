
import { Component } from "cc";
import { addPrefabInfo } from "../../../@types/packages/engine/@types/editor-extends/utils/prefab";
import { Singleton } from "./singleton";


export default class mathematics extends Singleton<mathematics> {
    public static randomNum(maxnum,minnum){
        if(! (maxnum instanceof Number)||!(minnum instanceof Number) ){
            maxnum=parseInt(maxnum);
            minnum=parseInt(minnum);
        }
        return Math.floor(Math.random()*(maxnum-minnum+1)+minnum);
    }
}