package game.poker;

import android.app.Application;
import android.util.Log;

import org.cocos2dx.lua.tools.ClassUtils;
import org.cocos2dx.lua.tools.PTools;

public class GamePokerApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        ClassUtils.initApplication(this);
        PTools.pa_app_init(this);
    }
}
