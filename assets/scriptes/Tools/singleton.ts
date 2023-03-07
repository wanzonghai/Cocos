//Singleton.ts
export class Singleton<T> {
    private static instance: any = null;
    public static GetInstance<T>(c: { new(): T }): T
    {
        if (this.instance == null)
        {
            this.instance = new c();
        }
        return this.instance;
    }

    public init()
    {
        console.dir(this);
    }
}
