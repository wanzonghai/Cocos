package com.cocos.service;

import android.content.Context;
import com.cocos.analytics.CAAgent;
import java.util.ArrayList;
import android.util.Log;

public class ServiceAnalytics implements SDKWrapper.SDKInterface {

    private static ArrayList<CAAgent> agents = new ArrayList<>();

    public static int initAnalytics(String appID, String storeID, String engine, String callNumber) {
        CAAgent agent = new CAAgent();
        agents.add(agent);
        agent.inits(SDKWrapper.shared().getActivity(), appID, storeID, engine, callNumber);
        agent.onResumes();
        int id = CAAgent.getID(agent);
        Log.i("ServiceAnalytics","new agent id= " + id);
        return id;
    }

    public static boolean isInited(int id) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            return agent.isIniteds();
        } else {
            return false;
        }
    }

    public static void enableDebug(int id, boolean enable) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.enableDebugs(enable);
        }
    }

    public static void loginStart(int id) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().loginStarts();
        }
    }

    public static void loginStart(int id, String channel) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().loginStarts(channel);
        }
    }

    public static void loginSuccess(int id, String uid) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().loginSuccesss(uid);
        }
    }

    public static void loginSuccess(int id, String uid, int age, int sex, String channel) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().loginSuccesss(uid,age,sex,channel);
        }
    }

    public static void loginFailed(int id, String reason, String channel) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().loginFaileds(reason, channel);
        }
    }

    public static void logout(int id) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().logouts();
        }
    }

    public static void setAccountType(int id, String accountType) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().setAccountTypes(accountType);
        }
    }

    public static void setAge(int id, int age) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().setAges(age);
        }
    }

    public static void setGender(int id, int gender) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().setGenders(gender);
        }
    }

    public static void setLevel(int id, int level) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().setLevels(level);
        }
    }

    public static void createRole(int id, String roleID, String userName,
                           String race, String roleClass, String gameServer) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAccount().createRoles(roleID, userName, race,roleClass, gameServer);
        }
    }

    // CAEvent
    public static void onEvent(int id, final String eventName) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getEvent().onEvents(eventName);
        }
    }

    public static void onEventStart(int id, final String eventName) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getEvent().onEventStarts(eventName);
        }
    }

    public static void onEventEnd(int id, final String eventName) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getEvent().onEventEnds(eventName);
        }
    }

    // CAPayment
    public static void payBegin(int id, String amount, String orderID,
                          String payType, String subjectID,
                          String currencyType,  String virtualCurrencyAmount,
                          String accountID, String partner,
                          String gameServer, String level, String mission) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getPayment().payBegins(amount, orderID,payType, subjectID,
                    currencyType,virtualCurrencyAmount,accountID,
                    partner,gameServer,level,mission);
        }
    }

    public static void paySuccess(int id,String amount, String orderID,
                                  String payType, String subjectID,
                                  String currencyType, String virtualCurrencyAmount,
                                   String accountID, String partner,
                                    String gameServer, String level, String mission) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getPayment().paySuccesss(amount,orderID,payType,subjectID,currencyType,virtualCurrencyAmount,accountID,partner,gameServer,level,mission);
        }
    }

    public static void payFailed(int id, String amount, String orderID, String payType, String subjectID,
                           String currencyType, String virtualCurrencyAmount,
                           String accountID, String partner, String gameServer,
                           String level, String mission, String reason) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getPayment().payFaileds(amount,orderID,payType,subjectID,currencyType,
                    virtualCurrencyAmount,accountID,partner,gameServer,level,
                    mission,reason);
        }
    }

    public static void payCanceled(int id, String amount, String orderID, String payType, String subjectID,
                             String currencyType, String virtualCurrencyAmount,
                             String accountID, String partner,
                             String gameServer, String level, String mission) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getPayment().payCanceleds(amount, orderID, payType, subjectID, currencyType,
                    virtualCurrencyAmount, accountID, partner, gameServer, level,
                    mission);
        }
    }

    // CAlevel
    public static void begin(int id, String level) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getLevels().begins(level);
        }
    }

    public static void levelComplete(int id, String level) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getLevels().completes(level);
        }
    }

    public static void levelFailed(int id, String level, String reason) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getLevels().faileds(level,reason);
        }
    }

    // CAtask
    public static void begin(int id, String taskID, int taskType) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getTask().begins(taskID,taskType);
        }
    }

    public static void taskComplete(int id, String taskID) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getTask().completes(taskID);
        }
    }

    public static void taskFailed(int id, String taskID, String reason) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getTask().faileds(taskID, reason);
        }
    }

    // CAitem
    public static void buy(int id, String itemID, String itemType,
                     int itemCount, int virtualCoin,
                     String virtualType, String consumePoint) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getCAItem().buys(itemID,itemType,itemCount,virtualCoin,virtualType,consumePoint);
        }
    }

    public static void getItem(int id, String itemID,
                               String itemType, int itemCount,
                               String reason) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getCAItem().gets(itemID, itemType, itemCount, reason);
        }
    }

    public static void consumeItem(int id, String itemID,
                               String itemType, int itemCount,
                               String reason) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getCAItem().consumes(itemID, itemType, itemCount, reason);
        }
    }

    // CAvirtual
    public static void setVirtualNum(int id, String type, long count) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getVirtual().setVirtualNums(type, count);
        }
    }

    public static void getVirtual(int id, String type, long count, String reason) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getVirtual().gets(type, count, reason);
        }
    }

    public static void consumeVirtual(int id, String type, long count, String reason) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getVirtual().consumes(type, count, reason);
        }
    }

    // CAadvertising
    public static void beginAdvertising(int id, String adID) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAdvertising().begins(adID);
        }
    }

    public static void completeAdvertising(int id, String adID, String timeLong, String profit) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAdvertising().completes(adID, timeLong, profit);
        }
    }

    public static void failedAdvertising(int id, String adID, String reason) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getAdvertising().faileds(adID, reason);
        }
    }

    // CAcustomevent
    public static void onStarted(int id, final String eventID, String eventData) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getCustomEvent().onStarteds(eventID, eventData);
        }
    }

    public static void onSuccess(int id, final String eventID, String eventData) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getCustomEvent().onSuccesss(eventID, eventData);
        }
    }

    public static void onCancelled(int id, final String eventID, String eventData) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getCustomEvent().onCancelleds(eventID, eventData);
        }
    }

    public static void onFailed(int id, final String eventID, String eventData, String reason) {
        CAAgent agent = CAAgent.getInstanceWithID(id);
        if (null != agent) {
            agent.getCustomEvent().onFaileds(eventID, eventData, reason);
        }
    }

    @Override
    public void init(Context context) {
        for(CAAgent agent: agents) {
            agent.enableDebugs(false); 
        }
    }

    @Override
    public void onResume(){
        for(CAAgent agent: agents) {
            agent.onResumes();
        }
    }

    @Override
    public void onPause(){ 
        for(CAAgent agent: agents) {
            agent.onPauses(); 
        }
    }

    @Override
    public void onDestroy(){
        for(CAAgent agent: agents) {
            agent.onDestroys(); 
        }
    }
}
