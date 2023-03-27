import { IDictionary } from './interface';

export default class Dictionary<T> {
    private dictionary: IDictionary<T>;
    constructor() {
        this.dictionary = {};
    }
    has(key: any): boolean {
        return this.dictionary.hasOwnProperty(key);
    }
    set(key: string, val: T) {
        this.dictionary[key] = val;
    }
    delete(key: any): boolean {
        if (this.has(key)) {
            delete this.dictionary[key];
        }
        return false;
    }
    get(key: any): any {
        return this.has(key) ? this.dictionary[key] : undefined;
    }
    values(): any[] {
        let values: any[] = [];
        for (let k in this.dictionary) {
            if (this.has(k)) {
                values.push(this.dictionary[k]);
            }
        }
        return values;
    }
}
