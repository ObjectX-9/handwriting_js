/**
 * 基本数组结构
 */
class BasicArray {
    constructor() {
        this.length = 0;
        this.data = {};
    }

    add(item) {
        this.data[this.length] = item;
        this.length++;
    }

    insert(index, item) {
        if (index < 0) index = 0;
        if (index > this.length) index = this.length;
        // 从最后一个开始移动，让出i的位置
        if (index >= 0 && index <= this.length) {
            for (let i = this.length; i > index; i--) {
                this.data[i] = this.data[i - 1];
            }
            this.data[index] = item;
        } 
        this.length++;
    }

    delete(index) {
        const deleted = this.data[index];
        // 用i后面的元素覆盖之前的元素
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
        return deleted;
    }

    update(index, item) {
        this.data[index] = item;
    }

    getLength() {
        return this.length;
    }

    get(index) {
        return this.data[index];
    }

    // 打印数组内容
    print() {
        const result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(this.data[i]);
        }
        console.log(result);
    }
}



// 基本数组使用示例
const myArray = new BasicArray();
myArray.insert(0, 'a');
myArray.insert(1, 'b');
myArray.insert(2, 'c');
myArray.print(); // ['a', 'b', 'c']

myArray.update(1, 'x');
myArray.print(); // ['a', 'x', 'c']

myArray.delete(0);
myArray.print(); // ['x', 'c']

console.log(myArray.getLength()); // 2

