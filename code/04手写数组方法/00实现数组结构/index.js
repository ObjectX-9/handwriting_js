/**
 * 基本数组结构
 */
class BasicArray {
    constructor() {
        this.length = 0;
        this.data = {};
    }

    /**
     * 末尾增加元素
     * @param {*} item 
     */
    add(item) {
        this.data[this.length] = item;
        this.length++;
    }

    /**
     * 任意位置插入元素
     * @param {*} index 
     * @param {*} item 
     */
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

    /**
     * 删除指定位置元素
     * @param {*} index 
     * @returns 
     */
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

    /**
     * 更新元素
     * @param {*} index 
     * @param {*} item 
     */
    update(index, item) {
        this.data[index] = item;
    }

    /**
     * 获取数组长度
     * @returns 
     */
    getLength() {
        return this.length;
    }

    /**
     * 获取元素
     * @param {*} index 
     * @returns 
     */
    get(index) {
        return this.data[index];
    }

    /**
     * 打印
     */
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

