export class Dictionary<KT, VT> {
	private keys: KT[] = [];
	private values: VT[] = [];
	private isCache: boolean;
	public get count(): number {
		return this.Count();
    }
    public set isCacheStatue($isCache: boolean) {
        this.isCache=$isCache;
    }

	public constructor(isCache: boolean = false) {
		this.isCache = isCache;
	}
    //添加
	public Add(key: any, value: any): number {
		if (this.isCache) {
			this[key] = value;
		}
		this.keys.push(key);
		return this.values.push(value);
	}
    //移除
	public Remove(key: any) {
		var index = this.keys.indexOf(key, 0);
		this.keys.splice(index, 1);
		this.values.splice(index, 1);
		if (this.isCache) {
			delete this[key];
		}
	}
    //字典长度
	private Count(): number {
		return this.keys.length;
	}
    //set字典value
	public SetDicValue(key: any, value: any) {
		var index = this.keys.indexOf(key, 0);
		if (index != -1) {
			this.keys[index] = key;
			this.values[index] = value;
			if (this.isCache) {
				this[key] = value;
			}
		}
		else {
			this.Add(key, value);
		}
	}
    //Try获取字典value
	public TryGetValue(key: KT): VT {
		var index = this.keys.indexOf(key, 0);
		if (index != -1) {
			return this.values[index];
		}
		return null;
	}
     //字典是否包含value
	public ContainsKey(key: any): boolean {
		let ks = this.keys;
		for (let i = 0; i < ks.length; ++i) {
			if (ks[i] == key) {
				return true;;
			}
		}
		return false;
	}
    //获取keys[]
	public GetKeys(): KT[] {
		return this.keys;
	}
    //获取Values[]
	public GetValues(): VT[] {
		return this.values;
    }
}
