class BaseQueue {
  queueData = [];

  enqueue(elem) {
    this.queueData.push(elem);
  }

  dequeue() {
    const delElem = this.queueData.shift();
    return delElem;
  }

  front() {
    return this.queueData[0];
  }

  rear() {
    return this.queueData[this.queueData.length - 1];
  }

  isEmpty() {
    return this.queueData.length === 0;
  }

  size() {
    return this.queueData.length;
  }
}
