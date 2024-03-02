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

  isEmpty() {
    return this.queueData.length === 0;
  }

  size() {
    return this.queueData.length;
  }
}
