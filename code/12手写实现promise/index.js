class myPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    // new promise的时候必须传入一个执行函数，并且会自动执行
    constructor(func) {
        // console.log('✅ ~ constructor ~ this:', this);
        // 这里这两个state的初始化需要在func之前，因为resolve，reject是在func里面调用的，用到了初始态的判断
        this.PromiseState = myPromise.PENDING;
        this.PromiseResult = null;
        this.onFulfilledCallbacks = []; // 保存成功回调
        this.onRejectedCallbacks = []; // 保存失败回调

        // 在这里捕获错误，避免在func中直接抛出错误，没做处理
        try {
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result) {

        if (this.PromiseState === myPromise.PENDING) {
            // console.log('✅ ~ resolve ~ this:', this.PromiseState);

            this.PromiseState = myPromise.FULFILLED
            this.PromiseResult = result;
            // 判断下是否有其他的未执行完的回调
            this.onFulfilledCallbacks.forEach(fn => fn(result))
        }
    }

    reject(reason) {

        if (this.PromiseState === myPromise.PENDING) {
            console.log('✅ ~ reject ~ this:', this.PromiseState);

            this.PromiseState = myPromise.REJECTED
            this.PromiseResult = reason;
            // 判断下是否有其他的未执行完的回调
            this.onRejectedCallbacks.forEach(fn => fn(reason))
        }
    }

    // 这里then方法有两个参数，一个处理成功，一个处理失败，所以这里需要传入两个参数
    // catch方法其实就是用于处理失败的，语法糖而已
    then(onFulfilled, onRejected) {
        const promise2 = new myPromise((resolve, reject) => {
            // 待定态的处理，这里主要是为了new promise的构造时，func中用了setTimeout将resolve包裹的情况
            // 这里push进去的也需要settimeout，需要保证回调都是异步执行的
            // 规范规定，onFulfilled/这里成功的回调是异步的
            if (this.PromiseState === myPromise.FULFILLED) {
                setTimeout(() => {
                    try {
                        if (typeof onFulfilled !== 'function') {
                            resolve(this.PromiseResult);
                        } else {
                            let x = onFulfilled(this.PromiseResult); // 捕获前面onFulfilled中抛出的异常
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            // 规范规定，onRejected/这里失败的回调也是异步的
            else if (this.PromiseState === myPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        if (typeof onRejected !== 'function') {
                            reject(this.PromiseResult);
                        } else {
                            let x = onRejected(this.PromiseResult)
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            else if (this.PromiseState === myPromise.PENDING) {
                // 状态未变化时，保存成功和失败的回调，用数组是因为链式调用
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onFulfilled !== 'function') {
                                resolve(this.PromiseResult);
                            } else {
                                let x = onFulfilled(this.PromiseResult);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onRejected !== 'function') {
                                reject(this.PromiseResult);
                            } else {
                                let x = onRejected(this.PromiseResult)
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        })

        return promise2;
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 2.3.1 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    if (x === promise2) {
        throw new TypeError('Chaining cycle detected for promise');
    }

    // 2.3.2 如果 x 为 Promise ，则使 promise 接受 x 的状态,需要继续执行拿到的 x 的状态
    if (x instanceof myPromise) {
        x.then(y => {
            resolvePromise(promise2, y, resolve, reject);
        }, reject)
    } else if (x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
        // 2.3.3 如果 x 为对象或函数
        let then;
        try {
            // 2.3.3.1 把 x.then 赋值给 then
            then = x.then;
        } catch (e) {
            // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
            return reject(e);
        }

        if (typeof then === 'function') {
            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            let called = false; // 避免多次调用
            try {
                then.call(
                    x,
                    // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    // 2.3.3.3.2 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } catch (e) {
                /**
                 * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
                 * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
                 */
                if (called) return;
                called = true;

                /**
                 * 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
                 */
                reject(e);
            }

        } else {
            // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
            resolve(x);
        }
    } else {
        // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
        return resolve(x);
    }
}




// // 测试代码
// let promise1 = new myPromise((resolve, reject) => {
//     resolve('这次一定');
// })
// console.log(promise1);
// // myPromise {PromiseState: 'fulfilled', PromiseResult: '这次一定'}
// let promise2 = new myPromise((resolve, reject) => {
//     reject('下次一定');
// })
// console.log(promise2);
// // myPromise {PromiseState: 'rejected', PromiseResult: '下次一定'}

// // 测试代码
// let promise3 = new myPromise((resolve, reject) => {
//     resolve('这次一定');
//     reject('下次一定');
// })
// promise3.then(
//     result => {
//         console.log(result)
//     },
//     reason => {
//         console.log(reason.message)
//     }
// )

// console.log("🚀 ~ promise3 ~ promise3:", promise3)


// // 测试代码
// let promise4 = new myPromise((resolve, reject) => {
//     throw new Error('白嫖不成功');
// })
// promise1.then(
//     result => {
//         console.log('fulfiiled:', result)
//     },
//     reason => {
//         console.log('rejected:', reason)
//     }
// )

// let promise5 = new myPromise((resolve, reject) => {
//     resolve('这次一定');
// })

// promise5.then(
//     undefined,
//     reason => {
//         console.log('rejected:', reason)
//     }
// )


// 测试代码：测试执行顺序
// console.log(1);
// let promise1 = new myPromise((resolve, reject) => {
//     console.log(2);
//     resolve('这次一定');
// })
// promise1.then(
//     result => {
//         console.log('fulfilled:', result);
//     },
//     reason => {
//         console.log('rejected:', reason)
//     }
// )
// console.log(3);

// 测试代码：测试异步时resolve没执行的原因
// console.log(1);
// let promise1 = new myPromise((resolve, reject) => {
//     console.log(2);  
//     setTimeout(() => {
//         resolve('这次一定');
//         console.log(4);
//     });
// })
// promise1.then(
//     result => {
//         console.log('fulfilled:', result);
//     },
//     reason => {
//         console.log('rejected:', reason)
//     }
// )    
// console.log(3);


// 测试代码
// 测试pengding状态下的回调执行顺序
// console.log(1);
// let promise1 = new myPromise((resolve, reject) => {
//     console.log(2);
//     setTimeout(() => {
//         console.log('A', promise1.PromiseState);
//         resolve('这次一定');
//         console.log('B', promise1.PromiseState);
//         console.log(4);
//     });
// })
// promise1.then(
//     result => {
//         console.log('C', promise1.PromiseState);
//         console.log('fulfilled:', result);
//     },
//     reason => {
//         console.log('rejected:', reason)
//     }
// )
// console.log(3);


// 测试代码
// 测试多次调用
// const promise = new myPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('success')
//     }, 2000);
// })
// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
// })
// promise.then(value => {
//     console.log(2)
//     console.log('resolve', value)
// })
// promise.then(value => {
//     console.log(3)
//     console.log('resolve', value)
// })

// 测试代码：测试链式调用
let p1 = new myPromise((resolve, reject) => {
    resolve(10)
})
p1.then(res => {
    console.log('fulfilled', res);
    return 2 * res
}).then(res => {
    console.log('fulfilled', res)
}) 

 myPromise.deferred = function () {
         let result = {};
         result.promise = new myPromise((resolve, reject) => {
             result.resolve = resolve;
             result.reject = reject;
         });
         return result;
     }
    
module.exports = myPromise;