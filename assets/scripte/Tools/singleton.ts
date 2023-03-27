//Singleton.ts
export class Singleton<T> {
    private static instance: any = null;
    //资源管理者类的构造函数
    public constructor() {}

    public static GetInstance<T>(c: { new (): T }): T {
        if (this.instance == null) {
            this.instance = new c();
        }
        return this.instance;
    }

    public init() {
        console.dir(this);
    }
}
