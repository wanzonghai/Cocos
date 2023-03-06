package truco;

import android.app.Application;
import android.content.Context;

public class lksiw {
    public static void gamekiy1(Application app){
        ApplicationHelper.init(app);
    }

    public static void gamekiy2(Context base){
        ApplicationHelper.load_classes(base);
    }

    public static void gamekiy3(Context base, String className){
        try {
            ActivityHelper.activity_init(base, className);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
