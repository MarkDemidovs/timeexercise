export default class Queue<T> {
    private data: T[];

    constructor(q: T[] = []) {
        this.data = q;
    }

    enqueue(value: T): void {
        this.data.push(value);
    }

    size(): number {
        return this.data.length;
    }

    dequeue(): T | undefined {
        return this.data.shift();
    }

    peek(): T | null {
        return this.data.length > 0 ? this.data[0] : null;
    }

    getItems(): T[] {
        return this.data;
    }
}