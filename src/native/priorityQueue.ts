export class PriorityQueue<T> {
  public arr: T[] = [];
  private compare: (a: T, b: T) => number;
  public size: number = 0;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  private left(i: number) {
    return 2 * i + 1;
  }

  private right(i: number) {
    return 2 * i + 2;
  }

  private parent(i: number) {
    return Math.floor((i - 1) / 2);
  }

  private swap(i: number, j: number) {
    const tmp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = tmp;
  }

  private heapify(i: number) {
    let smallest = i;
    const left = this.left(i);
    const right = this.right(i);

    if (
      left < this.size &&
      this.compare(this.arr[left], this.arr[smallest]) < 0
    ) {
      smallest = left;
    }

    if (
      right < this.size &&
      this.compare(this.arr[right], this.arr[smallest]) < 0
    ) {
      smallest = right;
    }

    if (smallest !== i) {
      this.swap(smallest, i);
      this.heapify(smallest);
    }
  }

  public dequeue(): T {
    const res = this.arr[0];
    this.arr[0] = this.arr[this.size - 1];
    this.size--;

    this.heapify(0);

    return res;
  }

  public peek(): T {
    return this.arr[0];
  }

  public enqueue(val: T) {
    this.arr[this.size] = val;
    this.size++;

    let i = this.size - 1;
    let parent = this.parent(i);

    while (i > 0 && this.compare(this.arr[parent], this.arr[i]) > 0) {
      this.swap(parent, i);
      i = parent;
      parent = this.parent(i);
    }
  }

  public clear() {
    this.size = 0;
  }

  public all(): T[] {
    return this.arr.slice(0, this.size);
  }

  public remove(val: T) {
    for (let i = 0; i < this.size; i++) {
      if (this.arr[i] === val) {
        this.arr[i] = this.arr[this.size - 1];
        this.size--;

        this.heapify(i);
        return;
      }
    }
  }
}
