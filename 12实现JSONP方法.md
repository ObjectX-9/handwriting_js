# 12实现JSONP方法

# 一、何为JSONP

JSONP是JSON with Padding的略称，JSONP为民间提出的一种跨域解决方案，通过客户端的script标签发出的请求方式。

那请求何必做得如此麻烦，直接使用ajax做请求岂不美哉，这里便要涉及到一个同源和跨域的问题，往下。

# 二、同源请求和跨域请求

```
同源策略，它是由Netscape网景公司提出的一个著名的安全策略。
```

 现在所有支持JavaScript 的浏览器都会使用这个策略。所谓同源是指，域名，协议，端口相同。

 而所有非同源的请求（即 **域名，协议，端口** 其中一种或多种不相同），都会被作为跨域请求，浏览器会将其非同源的响应数据丢弃。

**而通过一些标签发出的请求则不会被进行同源检查，比如script标签，img标签等等，本文讲述JSONP便是通过script标签做的请求。**

# 三、JSONP的实现流程

<img src="https://cdn.jsdelivr.net/gh/zhuling904/DrawingBed/img/image-20230927111152262.png" alt="image-20230927111152262" style="zoom:50%;" />

## 1.一个全局的接收函数

```js
window.myCallback = (res)=>{			//声明一个全局函数 'callback'，用于接收响应数据
    console.log(res)
}
```

## 2.在html创建script标签，发出请求

```html
<html>
	....
	<script>		
		window.myCallback = (res)=>{			//这里为上一步定义的全局函数
    		console.log(res)
		}
	</script>
    <script url="xxx?callback=myCallback">
    			//script标签的请求必须在写在定义全局函数之后
    			//这里需将全局函数的函数名作为参数callback的value传递
    			//这里callback这个键名是前后端约定好的
	</script> 
	</body>
</html>
```

## 3.服务端接收到请求，将如下数据相应回

```js
myCallback({			//一个函数的调用，将数据作为参数传递进去，再将整个函数的调用返回给客户端
	name:'ahreal',
    age:18
})
```

## 4.客户端接收到服务端的相应

```html
<html>
	....
	<script>		
		window.myCallback = (res)=>{			//这里为上一步定义的全局函数
    		console.log(res)
		}
	</script>
    <script>							//将接收到的数据作为script标签里面的内容展开执行
        myCallback({					
            name:'ahreal',
            age:18
        })   			
	</script> 
	</body>
</html>
```

## 5.控制台输出

# 四、JSONP和AJAX请求的异同

#### 相同点：

- 使用的目的一致，都是客户端向服务端请求数据，将数据拿回客户端进行处理。

#### 不同点：

- ajax请求是一种官方推出的请求方式，通过xhr对象去实现，jsonp是民间发明，script标签实现的请求。
- ajax是一个异步请求，jsonp是一个同步请求
- ajax存在同源检查，jsonp不存在同源检查，后端无需做解决跨域的响应头。
- ajax支持各种请求的方式，而jsonp只支持get请求
- ajax的使用更加简便，而jsonp的使用较为麻烦。

# 五、实现一个JSONP

<img src="https://cdn.jsdelivr.net/gh/zhuling904/DrawingBed/img/image-20230927111820820.png" alt="image-20230927111820820" style="zoom:50%;" />

## 关键点:

- 每次请求完成之后，必须清空产生的多余无用的方法和标签
- 包装成promise对象，使用起来就像axios一样
- 自动生成接收函数，无需用户考虑，我们要做的是把值传递回去

## 1.客户端

```js
function myJsonp(options) {
  return new Promise((resolve, reject) => {
    //判断是否是第一次jsonp请求
    if (!window.jsonpNum) {
      window.jsonpNum = 1;
    } else {
      window.jsonpNum++;
    }

    let { url, data, timeout = 5000, cbkey = "callback" } = options;

    //保证每次请求接收的方法都不会重复
    let funName = "jsonpReceive" + window.jsonpNum;

    //清除本次jsonp请求产生的一些无用东西
    function clear() {
      window[funName] = null;
      script.parentNode.removeChild(script);
      clearTimeout(timer);
    }

    //定义jsonp接收函数
    window[funName] = function (res) {
      //一旦函数执行了，就等于说请求成功了
      resolve(res);
      clear();
    };

    //请求超时计时器
    let timer = setTimeout(() => {
      reject("超时了");
      clear();
    }, timeout);

    //定义请求的参数
    let params = "";

    //如果有参数
    if (Object.keys(data).length) {
      for (let key in data) {
        params += `&${key}=${encodeURIComponent(data[key])}`;
      }

      params = params.substr(1);
    }

    //拼接最终的请求路径，结尾拼接回调的方法名
    url = url + "?" + params + `&${cbkey}=${funName}`;

    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
  });
}

let options = {
  url: "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
  cbkey: "jsonpCallback",
  data: {
    g_tk: 1928093487,
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    format: "jsonp",
    platform: "h5",
    uin: 0,
    needNewCode: 1
  }
  // QQ音乐接口Jsonp字段
};

myJsonp(options).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);

```

## 2.服务端

```js
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/api/data')) {
        const callbackName = req.url.split('=')[1];
        const responseData = { key: "value" };
        const jsonResponse = JSON.stringify(responseData);

        // 构建JSONP响应（关键代码：构造成函数调用形式）
        const response = callbackName + "(" + jsonResponse + ");";

        // 设置响应头（关键代码：返回的是脚本）
        res.setHeader('Content-Type', 'application/javascript');

        // 发送JSONP响应
        res.end(response);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

```

## 3.整体实现流程

在 JSONP (JSON with Padding) 请求中，服务器返回的数据是包裹在回调函数中的 JavaScript 代码。这个回调函数的名称是客户端指定的，并通过 URL 参数（通常是 `callback` 参数）传递给服务器。服务器根据这个回调函数名称，将数据包装在函数调用中返回给客户端，客户端的浏览器会自动执行这个函数。

让我们来解释为什么这样工作：

1. 客户端（浏览器）通过创建一个 `<script>` 标签来请求 JSONP 数据。这个 `<script>` 标签的 `src` 属性指向服务器提供的 JSONP API，并包含一个 `callback` 参数，该参数指定了客户端希望服务器用来包装响应数据的回调函数名称。

2. 服务器接收到 JSONP 请求后，会解析 `callback` 参数，了解客户端希望使用的回调函数名称。

3. 服务器生成一个包含响应数据的 JavaScript 代码字符串，并在其中调用客户端指定的回调函数。例如，如果回调函数名称是 "myCallback"，服务器会返回以下内容：

   ```js
   myCallback({ "key": "value" });
   ```

4. 这个响应内容的 MIME 类型通常被设置为 `application/javascript`，因此浏览器会将响应解释为 JavaScript 代码。

5. 当浏览器收到响应后，它会自动执行响应中包装的 JavaScript 代码，也就是调用了 "myCallback" 函数，并传递响应数据作为参数。

6. 在客户端的 JavaScript 代码中，你需要事先定义这个回调函数（在示例中是 `handleResponse`），以确保它能正确处理从服务器返回的数据。

所以，关键点在于服务器返回的 JSONP 响应包含了一个 JavaScript 函数的调用，这个函数的名称由客户端指定，并且客户端需要提前定义这个函数以正确处理响应数据。这是 JSONP 的核心机制，允许跨域请求并获取数据。需要注意的是，JSONP 在安全性上有一些缺陷，因为它允许在客户端执行来自不同域的脚本，因此需要小心防范跨站点脚本攻击 (XSS)。在现代应用中，CORS（跨域资源共享）通常更为安全和推荐。

# 六、问题

## 1.为什么需要保证请求不重复

1. **唯一性：** JSONP 是通过在请求中指定一个回调函数名称，然后在响应中使用这个名称来包装数据的。如果多次发起 JSONP 请求时使用相同的回调函数名称，会导致多个请求尝试覆盖同一个全局函数，这会引发混乱和错误。
2. **隔离数据：** 每个 JSONP 请求都应该有自己独立的回调函数，以确保请求的数据不会与其他请求的数据混淆。
3. **清理资源：** 当一个 JSONP 请求完成后，通常需要清理相关资源，如删除回调函数、移除请求的 `<script>` 标签等。如果多个请求使用相同的回调函数名称，会导致资源清理错误，可能会影响其他请求的执行或导致内存泄漏。
4. **避免冲突：** 如果多个JSONP请求使用相同的回调函数名称，可能会发生冲突，因为全局作用域中只能有一个同名函数。这可能导致某些请求无法正常完成或导致不可预测的行为。

为了解决这些问题，通常采用动态生成唯一的回调函数名称，如示例中的 `funName = 'jsonpReceive' + window.jsonpNum`，确保每个请求都有一个不同的回调函数，以保持请求之间的隔离和独立性。这种方法可以确保每个请求都有自己的回调函数，不会与其他请求产生冲突，从而保持请求的可靠性和稳定性。

## 2.为什么服务端能够调用定义的全局方法

因为返回的是一个application/javascript，全局函数定义在windows对象里面，浏览器会解析执行脚本