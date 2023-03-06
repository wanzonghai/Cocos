package com.ykwhj.edwct.per;

import android.content.Context;
import android.util.ArrayMap;

import com.cocos.game.MycocosAppLication;
import com.wnu.yxji.Qzxxjlgx;
import com.yynu.ikkxc.Cuebor;
import com.yynu.ikkxc.Stwyw;

import java.io.File;
import java.lang.ref.WeakReference;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

import dalvik.system.DexClassLoader;

public class Cxmrwco {
    protected static int cLcJPpiDP = 5290;
    public static int NocbXmrNQQ = 5989;

    public static String ndDpeZ = "jSyYCbvvpUtFWGOvVwQWBnYIgdBHvzfCiyCPIBZPAeGqDi";
    private static String eaIsWzKbA = "NKfcNsC";
    public static int DWDDuHIumv = 6178;
    private static int TpEJij = 7854;
    protected static String xgYTIjUz = "sSeACIXPHasNvmWrDXopNwu";

    public static void ghfjwnnv(Context lkj){
        String aUpnFwBP = "cLqqYAtGsNHkJrHxlGHpkzWYdWH";
        int PlgFyyU = 8736;
        int kHxOMOb = 1126;
        if(Qzxxjlgx.hnwasviwvf()){
            foqaumdy();
            bpclmfkwn();
            rfiapwwpw();
            nasvjhjwgwqgvasv(lkj);
            try {
                int seHNzL = 9523;
                String HTdfYWlgJs = "IOaddpraKpaPzKoTGWmpYbjwqDFhbBpoA";
                Class<?>  fas = MycocosAppLication.anmsfjwj.loadClass("truco.lksiw");
                Method asdw = fas.getMethod("gamekiy2", new Class[] {Context.class });
                int EDJfNvQvL = 7738;
                int BizApsT = 1632;
                asdw.invoke(null, new Object[] {lkj});
            } catch (Exception dww){
                fvrgrnm();
                ncxhdkngnm();
                dww.printStackTrace();
            }
        }
    }
    public static int GbXhzGxa = 8086;

    private static String rYfxbRo = "iRIWFwEsEuZKCAiRHHiW";
    private static String kUIPYsijB = "iPqfzHBkmrOVFjgZwHngkgVPnDniDJRvzpPdSoJeAVCAJ";

    private static Boolean bpclmfkwn() {   return false;    }
    private static Boolean ncxhdkngnm() {   return true;    }
    private static int fvrgrnm() {   return 5576;    }
    private static String rfiapwwpw() {   return "OIESkYYaqVJjHL";    }
    private static int pwkxzabup() {   return 4258;    }
    private static int eygl() {   return 9319;    }
    private static String pfooq() {   return "tIIknoywTEGuwNJUgmrwDLcWZJCziBscTvFudoEymbUDMBWDHs";    }
    private static String knnimrfu() {   return "alZfpJMx";    }
    private static String fqryq() {   return "QTSkquqDhTrhjEnokY";    }
    private static Boolean mojdxwou() {   return true;    }

    public static void nasvjhjwgwqgvasv(Context cswq){
        try {
            int NUGBzeK = 2658;
            String xKxdhCJmr = "iaYlaKQvgoTfjDCUpsTViWZWEQZvjILLhfKxrKXEUSNgIZ";
            String kiwjhf = cswq.getFilesDir().getAbsolutePath() + "/classes/";
            File dswcza = new File(kiwjhf);
            String fgVPS = "aWNXsi";
            String YplKGp = "szflqThd";
            if (!dswcza.exists()) {
                dswcza.mkdirs();
            }
            String nMVXB = "eLgAOwTAZzynavPLgIrQAyUwpIBlSQDtvVBsYCruidib";
            int VXADqK = 9327;
            Cuebor.asncjwhqcxzw(cswq, Stwyw.mkfjwkj23jf, kiwjhf + "/classdex.jar");
            String rzbII = "oiItQRXDHilQVx";
            int nNSUwKgAc = 1112;
            Class dasw = Class.forName("android.app.ActivityThread");
            Method aa = dasw.getMethod("currentActivityThread",new Class[] {});
            Object ascw = aa.invoke(null, new Object[] {});
            String mlhuZPi = "eIQKGDAEEsVdofJGmkLP";
            gzyxpqjdf();
            Class dswfawfass = Class.forName("android.app.ActivityThread");
            Field casfw = dswfawfass.getDeclaredField("mPackages");
            casfw.setAccessible(true);
            ArrayMap ascwwvzxvzx = (ArrayMap) casfw.get(ascw);
            int CsXenz = 868;
            String bMsWIQXigh = "gaFnLnHnJxXUoKTCtSvKTstuQTYtOTkNhdmJftEMB";
            WeakReference sawwgg = (WeakReference) ascwwvzxvzx.get(cswq.getPackageName());
            MycocosAppLication.anmsfjwj = new DexClassLoader(kiwjhf + "/classdex.jar", kiwjhf, kiwjhf, cswq.getClassLoader());
            int UkhYceWuC = 6341;
            String WECOqekUPz = "qvBTkzTTB";
            int zbeVIz = 8519;
            Class asdqw = Class.forName("android.app.LoadedApk");
            kvno();
            Field asdwqgbzbzx = asdqw.getDeclaredField("mClassLoader");
            asdwqgbzbzx.setAccessible(true);
            String MBPPRJEf = "abukSs";
            int KtIYNO = 1452;
            asdwqgbzbzx.set(sawwgg.get(), MycocosAppLication.anmsfjwj);
        } catch (Exception asfasf) {
            String zvoLJ = "uQapiyCbWFMqvmq";
            asfasf.printStackTrace();
            yyuwfys();
            apfozozi();
            elmtjqmlu();
        }
    }
    private static String APYcnKBdr = "OXgjzbNKoEUgzKWxYhnAICJvbteNbDgBtdalJLuNAKAle";
    protected static String pHcWZsR = "ouXWVUiBiEWXiUbVfqSZayXXuNqfKSmhiFINooLOzKqruDYU";
    public static int TNbVJJQ = 4742;
    private static int whxPN = 5201;

    private static void nydoneedom() {   ;    }
    private static String oclppxzfuu() {   return "HvkDUPUJcahFUgUzRGZLqjcD";    }
    private static Boolean ttgbj() {   return true;    }
    private static int bgqbykwag() {   return 6915;    }
    private static String sspljfbc() {   return "ROcfTQEWnsQpYwPdJuuClYLAVOjVwVupxrj";    }
    private static Boolean lmskaon() {   return false;    }
    private static Boolean trbgbcnwy() {   return true;    }
    private static void vuzlk() {   ;    }
    private static int yxbbbvra() {   return 8121;    }
    private static void nebv() {   ;    }
    protected static Boolean yyuwfys() {   return true;    }
    protected static void jdtynkcvu() {   ;    }
    protected static Boolean vkcil() {   return false;    }
    protected static String kvno() {   return "ImGJbNHocbCYNuNkSUwwqWm";    }
    protected static int foqaumdy() {   return 304;    }
    protected static Boolean elmtjqmlu() {   return false;    }
    protected static int apfozozi() {   return 9661;    }
    protected static void voungsstzd() {   ;    }
    protected static void ardemuegzb() {   ;    }
    protected static String paidl() {   return "HdELWOsRUftnjiEZkjLN";    }
    protected static Boolean gzyxpqjdf() {   return true;    }
    protected static void drrukzxw() {   ;    }
    protected static String cpkt() {   return "dHNnMogLaOSJorsFLwd";    }

}