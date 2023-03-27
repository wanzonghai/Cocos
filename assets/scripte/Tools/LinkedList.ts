export class ListNode<T> {
    public val: T;
    public next: ListNode<T> | null;

    constructor(val: T) {
        this.val = val;
        this.next = null;
    }
}

export class LinkedList<T> {
    private head: ListNode<T> | null;

    constructor() {
        this.head = null;
    }

    public push(val: T) {
        const newNode = new ListNode(val);
        if (!this.head) {
            this.head = newNode;
        } else {
            let cur = this.head;
            while (cur.next) {
                cur = cur.next;
            }
            cur.next = newNode;
        }
    }

    public get(index: number): T | null {
        if (index < 0) return null;
        let cur = this.head;
        for (let i = 0; i < index && cur; i++) {
            cur = cur.next;
        }
        return cur ? cur.val : null;
    }

    public size(): number {
        let count = 0;
        let cur = this.head;
        while (cur) {
            count++;
            cur = cur.next;
        }
        return count;
    }
}

// const list = new LinkedList<number>();
// list.push(1);
// list.push(2);
// list.push(3);

// console.log(list.get(0)); // 输出列表中的第一个元素

// console.log(list.size()); // 输出列表的大小
