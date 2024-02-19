const BasicArray = require('../00实现数组结构/index')
class CollectArray extends BasicArray {
    log() {
        console.log('测试方法', this.getLength());
    }
}

const array = new CollectArray();

array.add(1);
array.add(2);
array.add(3);

array.log();
