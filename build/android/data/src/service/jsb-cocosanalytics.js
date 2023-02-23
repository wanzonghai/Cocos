(function () {

    var sys = cc.sys;
    var platform = sys.platform;

    // Only android and iOS support cocos analytics
    if (platform === sys.ANDROID) {
        if (!JavascriptJavaBridge) return;
        let jsBridge = new JavascriptJavaBridge();
        cocosAnalytics = {};

        // var cls_CAAccount = "com/cocos/analytics/CAAccount";
        // var cls_CAAgent = "com/cocos/analytics/CAAgent";
        // var cls_CAEvent = "com/cocos/analytics/CAEvent";
        // var cls_CAItem = "com/cocos/analytics/CAItem";
        // var cls_CALevels = "com/cocos/analytics/CALevels";
        // var cls_CAPayment = "com/cocos/analytics/CAPayment";
        // var cls_CATask = "com/cocos/analytics/CATask";
        // var cls_CAVirtual = "com/cocos/analytics/CAVirtual";
        // var cls_CACustomEvent = "com/cocos/analytics/CACustomEvent";
        // var cls_CAAdvertising = "com/cocos/analytics/CAAdvertising";
        var cls_ServiceAnalytics = "com/cocos/service/ServiceAnalytics";

        cocosAnalytics.init = function (info) {
            if (info && info.appID) {
                return jsBridge.callStaticMethod(
                    cls_ServiceAnalytics,
                    "initAnalytics",
                    "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)I",
                    info.appID,
                    info.storeID,
                    info.engine,
                    info.callNumber
                );
            } else {
                console.error("The arguments passed to cocosAnalytics.init are wrong!");
                return -1;
            }
        };
        cocosAnalytics.isInited = function (id = cocosAnalyticsID1) {
            if (typeof id === "number") {
                return jsBridge.callStaticMethod(cls_ServiceAnalytics, "isInited","(I)Z", id);
            } else {
                console.error(
                    "The arguments passed to cocosAnalytics.isInited are wrong!"
                );
            }
        };

        cocosAnalytics.enableDebug = function (enabled, id = cocosAnalyticsID1) {
            if ((typeof enabled === "boolean") && (typeof id === "number")) {
                jsBridge.callStaticMethod(
                    cls_ServiceAnalytics,
                    "enableDebug",
                    "(IZ)V",
                    id,
                    enabled
                );
            } else {
                console.error(
                    "The arguments passed to cocosAnalytics.enableDebug are wrong!"
                );
            }

        };

        cocosAnalytics.CAAccount = {
            loginStart: function (info) {
                if (info && (typeof info.channel === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "loginStart",
                        "(ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.channel);
                } else if ((typeof(info) === "number") || (typeof(info) === "undefined")) {
                    jsBridge.callStaticMethod(cls_ServiceAnalytics, "loginStart", info || cocosAnalyticsID1, "(I)V");
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.loginStart are wrong!"
                    );
                }
            },

            loginSuccess: function (info) {
                if (info && (typeof info.userID === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "loginSuccess",
                        "(ILjava/lang/String;IILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.userID,
                        info.age || 0,
                        info.sex || 0,
                        info.channel || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAAccount.loginSuccess are wrong!"
                    );
                }
            },

            loginFailed: function (info) {
                if (typeof info === "object") {
                    if (typeof info.id === "undefined" ||
                    typeof info.id === "number") {
                        jsBridge.callStaticMethod(
                            cls_ServiceAnalytics,
                            "loginFailed",
                            "(ILjava/lang/String;Ljava/lang/String;)V",
                            info.id || cocosAnalyticsID1,
                            info.reason || "",
                            info.channel || "",
                        );
                    } else {
                        console.error(
                            "The arguments passed to cocosAnalytics.CAAccount.loginFailed are wrong!"
                        );
                    }
                } else if (typeof info === "number") {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "loginFailed",
                        "(ILjava/lang/String;Ljava/lang/String;)V",
                        info || cocosAnalyticsID1,
                        "",
                        "",
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAAccount.loginFailed are wrong!"
                    );
                }
            },

            logout: function (id = cocosAnalyticsID1) {
                if (typeof(id) == "number") {
                    jsBridge.callStaticMethod(cls_ServiceAnalytics, "logout", "(I)V", id);
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAAccount.logout are wrong!"
                    );
                }
            },

            setAccountType: function (type, id = cocosAnalyticsID1) {
                if ((typeof type === "string") && (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "setAccountType",
                        "(ILjava/lang/String;)V",
                        id,
                        type
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAAccount.setAccountType are wrong!"
                    );
                }
            },

            setAge: function (age, id = cocosAnalyticsID1) {
                if ((typeof age === "number") && (typeof id === "number")) {
                    jsBridge.callStaticMethod(cls_ServiceAnalytics, "setAge", "(II)V",id, age);
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAAccount.setAge is wrong!"
                    );
                }
            },

            setGender: function (gender, id = cocosAnalyticsID1) {
                if ((typeof gender === "number") && (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "setGender",
                        "(II)V",
                        id,
                        gender
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAAccount.setGender is wrong!"
                    );
                }
            },

            setLevel: function (level, id = cocosAnalyticsID1) {
                if ((typeof level === "number") && (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "setLevel",
                        "(II)V",
                        id,
                        level
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAAccount.setLevel is wrong!"
                    );
                }
            },

            createRole: function (info) {
                if (
                    info &&
                    info.roleID &&
                    info.userName &&
                    info.race &&
                    info["class"] &&
                    info.gameServer
                ) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "createRole",
                        "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.roleID,
                        info.userName,
                        info.race,
                        info["class"],
                        info.gameServer
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAAccount.createRole are wrong!"
                    );
                }
            }
        };

        cocosAnalytics.CAEvent = {
            onEvent: function (info) {
                if (info && (typeof info.eventName === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "onEvent",
                        "(ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.eventName
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAEvent.onEvent is wrong!"
                    );
                }
            },

            onEventStart: function (info) {
                if (info && (typeof info.eventName === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "onEventStart",
                        "(ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.eventName
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAEvent.onEventStart is wrong!"
                    );
                }
            },

            onEventEnd: function (info) {
                if (info && (typeof info.eventName === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "onEventEnd",
                        "(ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.eventName
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAEvent.onEventEnd is wrong!"
                    );
                }
            }
        };

        cocosAnalytics.CAPayment = {
            payBegin: function (info) {
                if (
                    info &&
                    info.amount &&
                    info.orderID &&
                    info.payType &&
                    info.iapID &&
                    info.currencyType
                ) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "payBegin",
                        "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.amount.toString(),
                        info.orderID,
                        info.payType,
                        info.iapID,
                        info.currencyType,
                        info.virtualCurrencyAmount || "0",
                        info.accountID || "",
                        info.partner || "",
                        info.gameServer || "",
                        info.level || "0",
                        info.mission || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAPayment.payBegin are wrong!"
                    );
                }
            },

            paySuccess: function (info) {
                if (
                    info &&
                    info.amount &&
                    info.orderID &&
                    info.payType &&
                    info.iapID &&
                    info.currencyType
                ) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "paySuccess",
                        "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.amount.toString(),
                        info.orderID,
                        info.payType,
                        info.iapID,
                        info.currencyType,
                        info.virtualCurrencyAmount || "0",
                        info.accountID || "",
                        info.partner || "",
                        info.gameServer || "",
                        info.level || "0",
                        info.mission || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAPayment.paySuccess are wrong!"
                    );
                }
            },

            payFailed: function (info) {
                if (
                    info &&
                    info.amount &&
                    info.orderID &&
                    info.payType &&
                    info.iapID &&
                    info.currencyType
                ) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "payFailed",
                        "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.amount.toString(),
                        info.orderID,
                        info.payType,
                        info.iapID,
                        info.currencyType,
                        info.virtualCurrencyAmount || "0",
                        info.accountID || "",
                        info.partner || "",
                        info.gameServer || "",
                        info.level || "0",
                        info.mission || "",
                        info.reason || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAPayment.payFailed are wrong!"
                    );
                }
            },

            payCanceled: function (info) {
                if (
                    info &&
                    info.amount &&
                    info.orderID &&
                    info.payType &&
                    info.iapID &&
                    info.currencyType
                ) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "payCanceled",
                        "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.amount.toString(),
                        info.orderID,
                        info.payType,
                        info.iapID,
                        info.currencyType,
                        info.virtualCurrencyAmount || "0",
                        info.accountID || "",
                        info.partner || "",
                        info.gameServer || "",
                        info.level || "0",
                        info.mission || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAPayment.payCanceled are wrong!"
                    );
                }
            }
        };

        cocosAnalytics.CALevels = {
            begin: function (info) {
                if (info && (typeof info.level === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "begin",
                        "(ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.level
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CALevels.begin is wrong!"
                    );
                }
            },

            complete: function (info) {
                if (info && (typeof info.level === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "levelComplete",
                        "(ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.level
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CALevels.complete is wrong!"
                    );
                }
            },

            failed: function (info) {
                if (info && (typeof info.level === "string") &&
                ((typeof info.reason === "string") || (typeof info.id === "undefined")) &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "levelFailed",
                        "(ILjava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.level,
                        info.reason || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CALevels.failed are wrong!"
                    );
                }
            }
        };

        cocosAnalytics.CATaskType = {
            GuideLine: 1,
            MainLine: 2,
            BranchLine: 3,
            Daily: 4,
            Activity: 5,
            Other: 100
        };

        cocosAnalytics.CATask = {
            begin: function (info) {
                if (info && (typeof info.taskID === "string") &&
                 (typeof info.type === "number") &&
                 ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "begin",
                        "(ILjava/lang/String;I)V",
                        info.id || cocosAnalyticsID1,
                        info.taskID,
                        info.type
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CATask.begin are wrong!"
                    );
                }
            },

            complete: function (info) {
                if (info && (typeof info.taskID === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "taskComplete",
                        "(ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.taskID
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CATask.complete is wrong!"
                    );
                }
            },

            failed: function (info) {
                if (info && (typeof info.taskID === "string") &&
                ((typeof info.reason === "string") || (typeof info.id === "undefined")) &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "taskFailed",
                        "(ILjava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.taskID,
                        info.reason || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CATask.failed are wrong!"
                    );
                }
            }
        };

        cocosAnalytics.CAItem = {
            buy: function (info) {
                if (
                    info &&
                    info.itemID &&
                    info.itemType &&
                    info.itemCount &&
                    info.virtualCoin &&
                    info.virtualType &&
                    info.consumePoint
                ) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "buy",
                        "(ILjava/lang/String;Ljava/lang/String;IILjava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.itemID,
                        info.itemType,
                        info.itemCount,
                        info.virtualCoin,
                        info.virtualType,
                        info.consumePoint
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAItem.buy are wrong!"
                    );
                }
            },

            get: function (info) {
                if (
                    info &&
                    info.itemID &&
                    info.itemType &&
                    info.itemCount &&
                    info.reason
                ) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "getItem",
                        "(ILjava/lang/String;Ljava/lang/String;ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.itemID,
                        info.itemType,
                        info.itemCount,
                        info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAItem.get are wrong!"
                    );
                }
            },

            consume: function (info) {
                if (
                    info &&
                    info.itemID &&
                    info.itemType &&
                    info.itemCount &&
                    info.reason
                ) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "consumeItem",
                        "(ILjava/lang/String;Ljava/lang/String;ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.itemID,
                        info.itemType,
                        info.itemCount,
                        info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAItem.consume are wrong!"
                    );
                }
            }
        };

        cocosAnalytics.CAVirtual = {
            setVirtualNum: function (info) {
                if (info && (typeof info.type === "string") &&
                (typeof info.count === "number") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "setVirtualNum",
                        "(ILjava/lang/String;J)V",
                        info.id || cocosAnalyticsID1,
                        info.type,
                        info.count
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAVirtual.setVirtualNum are wrong!"
                    );
                }
            },

            get: function (info) {
                if (info && (typeof info.type === "string") &&
                (typeof info.count === "number") && (typeof info.reason === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "getVirtual",
                        "(ILjava/lang/String;JLjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.type,
                        info.count,
                        info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAVirtual.get are wrong!"
                    );
                }
            },

            consume: function (info) {
                if (info && (typeof info.type === "string") &&
                (typeof info.count === "number") && (typeof info.reason === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "consumeVirtual",
                        "(ILjava/lang/String;JLjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.type,
                        info.count,
                        info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAVirtual.consume are wrong!"
                    );
                }
            }
        };

        cocosAnalytics.CAAdvertising = {
            begin: function (info) {
                if (info && (typeof info.adID === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "beginAdvertising",
                        "(ILjava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.adID
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAAdvertising.begin are wrong!"
                    );
                }
            },

            complete: function (info) {
                if (info && (typeof info.adID === "string") &&
                    (typeof info.timeLong === "number") && (typeof info.profit === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "completeAdvertising",
                        "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.adID,
                        info.timeLong.toString(),
                        info.profit
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAAdvertising.complete is wrong!"
                    );
                }
            },

            failed: function (info) {
                if (info && (typeof info.adID === "string") &&
                ((typeof info.reason === "string") || (typeof info.reason === "undefined")) &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "failedAdvertising",
                        "(ILjava/lang/String;Ljava/lang/String;)V",
                        info.id || cocosAnalyticsID1,
                        info.adID,
                        info.reason || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAAdvertising.failed are wrong!"
                    );
                }
            }
        };

        cocosAnalytics.CACustomEvent = {
            onStarted: function (eventID, eventData, id = cocosAnalyticsID1) {
                if ((typeof eventID === "string") && (typeof eventData === "object") &&
                (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "onStarted",
                        "(ILjava/lang/String;Ljava/lang/String;)V",
                        id,
                        eventID,
                        JSON.stringify(eventData)
                    );
                    console.log(JSON.stringify(eventData || {}))
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CACustomEvent.onStarted are wrong!"
                    );
                }
            },

            onSuccess: function (eventID, eventData, id = cocosAnalyticsID1) {
                if ((typeof eventID === "string") && (typeof eventData === "object") &&
                (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "onSuccess",
                        "(ILjava/lang/String;Ljava/lang/String;)V",
                        id,
                        eventID,
                        JSON.stringify(eventData)
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CACustomEvent.onSuccess is wrong!"
                    );
                }
            },

            onCancelled: function (eventID, eventData = {}, id = cocosAnalyticsID1) {
                if ((typeof eventID === "string") && (typeof eventData === "object") &&
                (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "onCancelled",
                        "(ILjava/lang/String;Ljava/lang/String;)V",
                        id,
                        eventID,
                        JSON.stringify(eventData)
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CACustomEvent.onCancelled are wrong!"
                    );
                }
            },

            onFailed: function (eventID, eventData = {}, reason = "", id = cocosAnalyticsID1) {
                if ((typeof eventID === "string") && (typeof eventData === "object") &&
                (typeof reason === "string") && (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                        cls_ServiceAnalytics,
                        "onFailed",
                        "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                        id,
                        eventID,
                        JSON.stringify(eventData),
                        reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CACustomEvent.onFailed are wrong!"
                    );
                }
            }
        };
    } else if (platform === sys.IPAD || platform === sys.IPHONE) {
        if (!JavaScriptObjCBridge) return;
        let jsBridge = new JavaScriptObjCBridge();
        cocosAnalytics = {};

        var cls_ServiceAnalytics = "ServiceAnalytics";

        cocosAnalytics.init = function (info) {
            if (info && info.appID) {
                return jsBridge.callStaticMethod(
                    cls_ServiceAnalytics,
                    "initAnalytics:storeID:engine:callNumber:",
                    info.appID,
                    info.storeID || "",
                    info.engine || "",
                    info.callNumber || ""
                );
            } else {
                console.error(
                    "The arguments passed to cocosAnalytics.init are wrong!"
                );
                return -1;
            }
        };

        cocosAnalytics.isInited = function (id = cocosAnalyticsID1) {
            if (typeof id === "number") {
              return jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "isInited:",
                id
              );
            } else {
              console.error(
                "The arguments passed to cocosAnalytics.isInited are wrong!"
              );
            }
        };
        cocosAnalytics.enableDebug = function (enabled, id = cocosAnalyticsID1) {
            if (typeof enabled === "boolean" && typeof id === "number") {
              jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "logDebug:enable:",
                id,
                enabled
              );
            } else {
              console.error(
                "The arguments passed to cocosAnalytics.enableDebug are wrong!"
              );
            }
        };

        cocosAnalytics.CAAccount = {
          loginStart: function (info) {
            if (info && (typeof info.channel === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
              jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "loginAccountStart:channel:",
                info.id || cocosAnalyticsID1,
                info.channel
              );
            } else if ((typeof (info) === "number") || (typeof (info) === "undefined")) {
                jsBridge.callStaticMethod(
                  cls_ServiceAnalytics,
                  "loginAccountStart:",
                  info || cocosAnalyticsID1
                );
            } else {
              console.error(
                "The arguments passed to cocosAnalytics.loginStart are wrong!"
              );
            }
          },

          loginSuccess: function (info) {
            if (info && (typeof info.userID === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
              jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "loginAccountSuccess:uid:age:sex:channel:",
                info.id || cocosAnalyticsID1,
                info.userID,
                info.age || 0,
                info.sex || 0,
                info.channel || ""
              );
            } else {
              console.error(
                "The arguments passed to cocosAnalytics.CAAccount.loginSuccess are wrong!"
              );
            }
          },

            loginFailed: function (info) {
              if (typeof info === "object") {
                if (
                  typeof info.id === "undefined" ||
                  typeof info.id === "number"
                ) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "loginAccountFailed:reason:channel:",
                      info.id || cocosAnalyticsID1,
                      info.reason || "",
                      info.channel || ""
                    );
                } else {
                  console.error(
                    "The arguments passed to cocosAnalytics.CAAccount.loginFailed are wrong!"
                  );
                }
              } else if (typeof info === "number") {
                  jsBridge.callStaticMethod(
                    cls_ServiceAnalytics,
                    "loginAccountFailed:reason:channel:",
                    info || cocosAnalyticsID1,
                    "",
                    ""
                  );
              } else {
                console.error(
                  "The arguments passed to cocosAnalytics.CAAccount.loginFailed are wrong!"
                );
              }
          },

          logout: function (id = cocosAnalyticsID1) {
            console.log("call logout = ", id);
            if (typeof id == "number") {
              jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "logoutAccount:",
                id
              );
            } else {
              console.error(
                "The arguments passed to cocosAnalytics.CAAccount.logout are wrong!"
              );
            }
          },

          setAccountType: function (type, id = cocosAnalyticsID1) {
            if (typeof type === "string" && typeof id === "number") {
              jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "setAccountType:type:",
                id,
                type
              );
            } else {
              console.error(
                "The arguments passed to cocosAnalytics.CAAccount.setAccountType are wrong!"
              );
            }
          },

          setAge: function (age, id = cocosAnalyticsID1) {
            if (typeof age === "number" && typeof id === "number") {
              jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "setAccountAge:age:",
                id || cocosAnalyticsID1,
                age
              );
            } else {
              console.error(
                "The argument passed to cocosAnalytics.CAAccount.setAge is wrong!"
              );
            }
          },

          setGender: function (gender, id = cocosAnalyticsID1) {
            if (typeof gender === "number" && typeof id === "number") {
              jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "setAccountGender:gender:",
                id,
                gender
              );
            } else {
              console.error(
                "The argument passed to cocosAnalytics.CAAccount.setGender is wrong!"
              );
            }
          },

          setLevel: function (level, id = cocosAnalyticsID1) {
            if (typeof level === "number" && typeof id === "number") {
              jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "setAccountLevel:level:",
                id,
                level
              );
            } else {
              console.error(
                "The argument passed to cocosAnalytics.CAAccount.setLevel is wrong!"
              );
            }
          },

          createRole: function (info) {
            if (
              info &&
              info.roleID &&
              info.userName &&
              info.race &&
              info["class"] &&
              info.gameServer
            ) {
              jsBridge.callStaticMethod(
                cls_ServiceAnalytics,
                "createAccountRole:roleID:userName:race:roleClass:gameServer:",
                info.id || cocosAnalyticsID1,
                info.roleID,
                info.userName,
                info.race,
                info["class"],
                info.gameServer
              );
            } else {
              console.error(
                "The arguments passed to cocosAnalytics.CAAccount.createRole are wrong!"
              );
            }
          },
        };

        cocosAnalytics.CAEvent = {
            onEvent: function (info) {
                if (info && (typeof info.eventName === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "onEvent:eventName:",
                      info.id || cocosAnalyticsID1,
                      info.eventName
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAEvent.onEvent is wrong!"
                    );
                }
            },

            onEventStart: function (info) {
                if (info && (typeof info.eventName === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "onEventStart:eventName:",
                      info.id || cocosAnalyticsID1,
                      info.eventName
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAEvent.onEventStart is wrong!"
                    );
                }
            },

            onEventEnd: function (info) {
                if (info && (typeof info.eventName === "string") &&
                ((typeof info.id === "undefined") || (typeof info.id === "number"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "onEventEnd:eventName:",
                      info.id || cocosAnalyticsID1,
                      info.eventName
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAEvent.onEventEnd is wrong!"
                    );
                }
            },
        };

        cocosAnalytics.CAPayment = {
            payBegin: function (info) {
                if (
                    info &&
                    info.amount &&
                    info.orderID &&
                    info.payType &&
                    info.iapID &&
                    info.currencyType
                ) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "payBegin:amount:orderID:payType:subjectID:currencyType:virtualCurrencyAmount:accountID:partner:gameServer:level:mission:",
                      info.id || cocosAnalyticsID1,
                      info.amount,
                      info.orderID,
                      info.payType,
                      info.iapID,
                      info.currencyType,
                      info.virtualCurrencyAmount || "0",
                      info.accountID || "",
                      info.partner || "",
                      info.gameServer || "",
                      info.level || "0",
                      info.mission || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAPayment.payBegin are wrong!"
                    );
                }
            },

            paySuccess: function (info) {
                if (
                    info &&
                    info.amount &&
                    info.orderID &&
                    info.payType &&
                    info.iapID &&
                    info.currencyType
                ) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "paySuccess:amount:orderID:payType:subjectID:currencyType:virtualCurrencyAmount:accountID:partner:gameServer:level:mission:",
                      info.id || cocosAnalyticsID1,
                      info.amount,
                      info.orderID,
                      info.payType,
                      info.iapID,
                      info.currencyType,
                      info.virtualCurrencyAmount || "0",
                      info.accountID || "",
                      info.partner || "",
                      info.gameServer || "",
                      info.level || "0",
                      info.mission || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAPayment.paySuccess are wrong!"
                    );
                }
            },

            payFailed: function (info) {
                if (
                    info &&
                    info.amount &&
                    info.orderID &&
                    info.payType &&
                    info.iapID &&
                    info.currencyType
                ) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "payFailed:amount:orderID:payType:subjectID:currencyType:virtualCurrencyAmount:accountID:partner:gameServer:level:mission:reason:",
                      info.id || cocosAnalyticsID1,
                      info.amount,
                      info.orderID,
                      info.payType,
                      info.iapID,
                      info.currencyType,
                      info.virtualCurrencyAmount || "0",
                      info.accountID || "",
                      info.partner || "",
                      info.gameServer || "",
                      info.level || "0",
                      info.mission || "",
                      info.reason || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAPayment.payFailed are wrong!"
                    );
                }
            },

            payCanceled: function (info) {
                if (
                    info &&
                    info.amount &&
                    info.orderID &&
                    info.payType &&
                    info.iapID &&
                    info.currencyType
                ) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "payCanceled:amount:orderID:payType:subjectID:currencyType:virtualCurrencyAmount:accountID:partner:gameServer:level:mission:",
                      info.id || cocosAnalyticsID1,
                      info.amount,
                      info.orderID,
                      info.payType,
                      info.iapID,
                      info.currencyType,
                      info.virtualCurrencyAmount || "0",
                      info.accountID || "",
                      info.partner || "",
                      info.gameServer || "",
                      info.level || "0",
                      info.mission || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAPayment.payCanceled are wrong!"
                    );
                }
            },
        };

        cocosAnalytics.CALevels = {
            begin: function (info) {
                if (info && (typeof info.level === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "levelBegin:level:",
                      info.id || cocosAnalyticsID1,
                      info.level
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CALevels.begin is wrong!"
                    );
                }
            },

            complete: function (info) {
                if (info && (typeof info.level === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "levelComplete:level:",
                      info.id || cocosAnalyticsID1,
                      info.level
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CALevels.complete is wrong!"
                    );
                }
            },

            failed: function (info) {
                if (info && (typeof info.level === "string") &&
                ((typeof info.reason === "string") || (typeof info.id === "undefined")) &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    info.reason = info.reason || "";
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "levelFailed:level:reason:",
                      info.id || cocosAnalyticsID1,
                      info.level,
                      info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CALevels.failed are wrong!"
                    );
                }
            },
        };

        cocosAnalytics.CATaskType = {
            GuideLine: 1,
            MainLine: 2,
            BranchLine: 3,
            Daily: 4,
            Activity: 5,
            Other: 100,
        };

        cocosAnalytics.CATask = {
            begin: function (info) {
                if (info && (typeof info.taskID === "string") &&
                 (typeof info.type === "number") &&
                 ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "taskBegin:taskID:taskType:",
                      info.id || cocosAnalyticsID1,
                      info.taskID,
                      info.type
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CATask.begin are wrong!"
                    );
                }
            },

            complete: function (info) {
                if (info && (typeof info.taskID === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "taskComplete:taskID:",
                      info.id || cocosAnalyticsID1,
                      info.taskID
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CATask.complete is wrong!"
                    );
                }
            },

            failed: function (info) {
                if (info && (typeof info.taskID === "string") &&
                ((typeof info.reason === "string") || (typeof info.id === "undefined")) &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    info.reason = info.reason || "";
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "taskFailed:taskID:reason:",
                      info.id || cocosAnalyticsID1,
                      info.taskID,
                      info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CATask.failed are wrong!"
                    );
                }
            },
        };

        cocosAnalytics.CAItem = {
            buy: function (info) {
                if (
                    info &&
                    info.itemID &&
                    info.itemType &&
                    info.itemCount &&
                    info.virtualCoin &&
                    info.virtualType &&
                    info.consumePoint
                ) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "buyItem:itemID:type:count:virtualCoin:virtualType:consumePoint:",
                      info.id || cocosAnalyticsID1,
                      info.itemID,
                      info.itemType,
                      info.itemCount,
                      info.virtualCoin,
                      info.virtualType,
                      info.consumePoint
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAItem.buy are wrong!"
                    );
                }
            },

            get: function (info) {
                if (
                    info &&
                    info.itemID &&
                    info.itemType &&
                    info.itemCount &&
                    info.reason
                ) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "getItem:itemID:type:count:reason:",
                      info.id || cocosAnalyticsID1,
                      info.itemID,
                      info.itemType,
                      info.itemCount,
                      info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAItem.get are wrong!"
                    );
                }
            },

            consume: function (info) {
                if (
                    info &&
                    info.itemID &&
                    info.itemType &&
                    info.itemCount &&
                    info.reason
                ) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "consumeItem:itemID:type:count:reason:",
                      info.id || cocosAnalyticsID1,
                      info.itemID,
                      info.itemType,
                      info.itemCount,
                      info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAItem.consume are wrong!"
                    );
                }
            },
        };

        cocosAnalytics.CAVirtual = {
            setVirtualNum: function (info) {
                if (info && (typeof info.type === "string") &&
                (typeof info.count === "number") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "setVirtualNum:type:count:",
                      info.id || cocosAnalyticsID1,
                      info.type,
                      info.count
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAVirtual.setVirtualNum are wrong!"
                    );
                }
            },

            get: function (info) {
                if (info && (typeof info.type === "string") &&
                (typeof info.count === "number") && (typeof info.reason === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "getVirtual:type:count:reason:",
                      info.id || cocosAnalyticsID1,
                      info.type,
                      info.count,
                      info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAVirtual.get are wrong!"
                    );
                }
            },

            consume: function (info) {
                if (info && (typeof info.type === "string") &&
                (typeof info.count === "number") && (typeof info.reason === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "consumeVirtual:type:count:reason:",
                      info.id || cocosAnalyticsID1,
                      info.type,
                      info.count,
                      info.reason
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAVirtual.consume are wrong!"
                    );
                }
            },
        };

        cocosAnalytics.CAAdvertising = {
            begin: function (info) {
                if (info && (typeof info.adID === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "beginAdvertising:adID:",
                      info.id || cocosAnalyticsID1,
                      info.adID
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAAdvertising.begin are wrong!"
                    );
                }
            },

            complete: function (info) {
                if (info && (typeof info.adID === "string") &&
                    (typeof info.timeLong === "number") && (typeof info.profit === "string") &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "completeAdvertising:adID:timeLong:profit:",
                      info.id || cocosAnalyticsID1,
                      info.adID,
                      info.timeLong,
                      info.profit
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CAAdvertising.complete is wrong!"
                    );
                }
            },

            failed: function (info) {
                if (info && (typeof info.adID === "string") &&
                ((typeof info.reason === "string") || (typeof info.reason === "undefined")) &&
                ((typeof info.id === "number") || (typeof info.id === "undefined"))) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "failedAdvertising:adID:reason:",
                      info.id || cocosAnalyticsID1,
                      info.adID,
                      info.reason || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CAAdvertising.failed are wrong!"
                    );
                }
            },
        };

        cocosAnalytics.CACustomEvent = {
            onStarted: function (eventID, eventData, id = cocosAnalyticsID1) {
                if ((typeof eventID === "string") && (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "onCustomEventStarted:eventID:eventBody:",
                      id,
                      eventID,
                      JSON.stringify(eventData || {})
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CACustomEvent.onStarted are wrong!"
                    );
                }
            },

            onSuccess: function (eventID, eventData, id = cocosAnalyticsID1) {
                if ((typeof eventID === "string") && (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "onCustomEventSuccess:eventID:eventBody:",
                      id,
                      eventID,
                      JSON.stringify(eventData || {})
                    );
                } else {
                    console.error(
                        "The argument passed to cocosAnalytics.CACustomEvent.onSuccess is wrong!"
                    );
                }
            },

            onCancelled: function (eventID, eventData = {}, id = cocosAnalyticsID1) {
                if ((typeof eventID === "string") && (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "onCustomEventCancelled:eventID:eventBody:",
                      id,
                      eventID,
                      JSON.stringify(eventData || {})
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CACustomEvent.onCancelled are wrong!"
                    );
                }
            },

            onFailed: function (eventID, eventData = {}, reason = "", id = cocosAnalyticsID1) {
                if ((typeof eventID === "string") && (typeof id === "number")) {
                    jsBridge.callStaticMethod(
                      cls_ServiceAnalytics,
                      "onCustomEventFailed:eventID:eventBody:reason:",
                      id,
                      eventID,
                      JSON.stringify(eventData || {}),
                      reason || ""
                    );
                } else {
                    console.error(
                        "The arguments passed to cocosAnalytics.CACustomEvent.onFailed are wrong!"
                    );
                }
            },
        };
    } else {
        // Empty implementation for other platforms
        cocosAnalytics = {};

        cocosAnalytics.init = function (info) {
            console.log("Cocos Analytics module isn't available on this platform!");
        };

        cocosAnalytics.isInited = function () {
            return false;
        };
        cocosAnalytics.enableDebug = function (enabled) {};

        cocosAnalytics.CAAccount = {
            loginStart: function () {},
            loginSuccess: function (info) {},
            loginFailed: function () {},
            logout: function (info) {},
            setAccountType: function (type) {},
            setAge: function (age) {},
            setGender: function (gender) {},
            setLevel: function (level) {},
            createRole: function (info) {}
        };

        cocosAnalytics.CAEvent = {
            onEvent: function (info) {},
            onEventStart: function (info) {},
            onEventEnd: function (info) {}
        };

        cocosAnalytics.CAPayment = {
            payBegin: function (info) {},
            paySuccess: function (info) {},
            payFailed: function (info) {},
            payCanceled: function (info) {}
        };

        cocosAnalytics.CALevels = {
            begin: function (info) {},
            complete: function (info) {},
            failed: function (info) {}
        };

        cocosAnalytics.CATaskType = {
            GuideLine: 1,
            MainLine: 2,
            BranchLine: 3,
            Daily: 4,
            Activity: 5,
            Other: 100
        };

        cocosAnalytics.CATask = {
            begin: function (info) {},
            complete: function (info) {},
            failed: function (info) {}
        };

        cocosAnalytics.CAItem = {
            buy: function (info) {},
            get: function (info) {},
            consume: function (info) {}
        };

        cocosAnalytics.CAVirtual = {
            setVirtualNum: function (info) {},
            get: function (info) {},
            consume: function (info) {}
        };

        cocosAnalytics.CAAdvertising = {
            begin: function (info) {},
            complete: function (info) {},
            failed: function (info) {}
        };

        cocosAnalytics.CACustomEvent = {
            onStarted: function (info) {},
            onSuccess: function (info) {},
            onCancelled: function (info) {},
            onFailed: function (info) {}
        };
    }
})();