# 11Ajax封装

# 一、原生实现

## 1.XMLHttpRequest

XMLHttpRequest是一个用于在浏览器中发起HTTP请求的JavaScript对象。它允许在不刷新整个页面的情况下与服务器进行数据交换，从而实现异步通信。以下是关于XMLHttpRequest的详细解释：

1. **创建XMLHttpRequest对象**：要使用XMLHttpRequest，首先需要创建一个XMLHttpRequest对象，通常通过`new XMLHttpRequest()`来创建。
2. **设置请求参数**：一旦创建了XMLHttpRequest对象，你需要设置一些请求参数，包括请求的类型（GET、POST、PUT、PATCH等）、请求的URL，以及是否采用异步模式（通常是true）。
3. **发送请求**：使用`.send()`方法来发送请求。对于GET请求，不需要在`.send()`中传递数据；对于POST、PUT、PATCH等请求，你需要传递请求体中的数据。
4. **处理响应**：设置一个回调函数（通常是通过`onreadystatechange`属性）来处理服务器响应。XMLHttpRequest对象的`readyState`属性表示请求的状态，而`status`属性表示HTTP响应状态码。
   - `readyState`的值会在请求的不同阶段发生变化，0表示未初始化，1表示已经设置，2表示已发送，3表示交互中，4表示完成。
   - `status`包含了HTTP响应的状态码，例如200表示成功，404表示未找到，500表示服务器内部错误等。
5. **处理响应数据**：响应数据通常存储在`responseText`或`responseXML`属性中，具体取决于响应的类型。你可以在回调函数中对这些数据进行处理和展示。
6. **处理错误**：在回调函数中，你还需要处理可能发生的错误，如网络问题、HTTP错误等。

XMLHttpRequest是传统的Ajax方法，它提供了一种使用JavaScript在前端与服务器进行通信的方式。然而，现代Web开发趋势是更多地使用Fetch API，它提供了更简洁的语法和更强大的功能，而不需要创建XMLHttpRequest对象。但XMLHttpRequest仍然在一些旧的项目中得到使用，或者在某些特定情况下仍然很有用。

## 2.关键步骤

1. **创建XMLHttpRequest对象**：首先，你需要创建一个 XMLHttpRequest 对象。这通常通过 `new XMLHttpRequest()` 来完成。

   ```js
   var xhr = new XMLHttpRequest();
   ```

   

2. **设置请求参数**：在创建 XMLHttpRequest 对象后，你需要设置请求的参数，包括请求的类型（GET、POST、PUT、PATCH 等）、请求的URL，以及是否采用异步模式（通常是 `true`）。

   ```js
   xhr.open("GET", "https://example.com/api/data", true);
   ```

   

3. **发送请求**：使用 `.send()` 方法来发送请求。对于 GET 请求，不需要在 `.send()` 中传递数据；而对于 POST、PUT、PATCH 等请求，你需要传递请求体中的数据。

   ```js
   xhr.send(); // 对于GET请求
   // 或
   xhr.send(data); // 对于POST、PUT、PATCH请求
   ```

4. **处理状态变化**：设置一个回调函数来处理服务器的响应。通常，你会监听 `onreadystatechange` 事件，并在回调函数中进行处理。XMLHttpRequest 对象的 `readyState` 属性表示请求的状态，从 0 到 4 不同阶段：

   - 0: 未初始化
   - 1: 已经设置
   - 2: 已发送
   - 3: 交互中
   - 4: 完成

   ```js
   xhr.onreadystatechange = function() {
       if (xhr.readyState === 4) {
           // 处理响应
       }
   };
   ```

5. **处理响应**：一旦请求完成（`readyState` 变为 4），你可以访问响应数据，通常存储在 `responseText` 或 `responseXML` 属性中。这些属性包含了服务器返回的数据。

   ```js
   if (xhr.readyState === 4 && xhr.status === 200) {
       var response = xhr.responseText;
       // 处理响应数据
   }
   ```

6. **处理错误**：在回调函数中，你还需要处理可能发生的错误，如网络问题、HTTP 错误等。可以检查 `status` 属性来了解 HTTP 响应的状态码。

   ```js
   if (xhr.status !== 200) {
       // 处理错误
   }
   ```

这些步骤组成了使用 XMLHttpRequest 发起、处理和处理响应的典型过程。这个过程允许你与服务器进行异步通信，以获取或发送数据，而不需要刷新整个页面。注意，XMLHttpRequest 在现代Web开发中被 Fetch API 替代，后者提供了更现代、强大且易于使用的方法来处理HTTP请求。



## 3.其他

1. `onload` 事件处理程序：
   - 当XMLHttpRequest对象成功接收响应并且HTTP状态码在2xx范围内（通常是200 OK）时触发。
   - 通常用于处理成功的HTTP请求，您可以在该事件处理程序中获取响应数据，并采取相应的操作。
2. `onerror` 事件处理程序：
   - 当XMLHttpRequest对象在发出请求或接收响应时遇到错误时触发。
   - 用于处理HTTP请求失败的情况，例如网络问题、无效的URL、跨域请求等。
   - 在`onerror`事件处理程序中，您通常会执行错误处理操作，例如记录错误、向用户显示错误消息或者进行重试等。

## 4.封装

```js
class HttpRequest {
  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  sendRequest(method, url, data, callback) {
    this.xhr.open(method, url, true);
    this.xhr.setRequestHeader("Content-Type", "application/json");

    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState === 4) {
        if (this.xhr.status === 200) {
          callback(null, this.xhr.responseText);
        } else {
          callback(this.xhr.status, null);
        }
      }
    };

    if (method === "GET" || method === "DELETE") {
      this.xhr.send();
    } else {
      this.xhr.send(data);
    }
  }

  get(url, callback) {
    this.sendRequest("GET", url, null, callback);
  }

  post(url, data, callback) {
    this.sendRequest("POST", url, data, callback);
  }

  put(url, data, callback) {
    this.sendRequest("PUT", url, data, callback);
  }

  patch(url, data, callback) {
    this.sendRequest("PATCH", url, data, callback);
  }

  delete(url, callback) {
    this.sendRequest("DELETE", url, null, callback);
  }
}

const http = new HttpRequest();

http.get("https://www.baidu.com", function (err, response) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Response from Baidu:", response);
  }
});

// 定义你的查询数据
const queryData = {
  prompt:
    "Translate the following English text to French: 'Hello, how are you?'",
  max_tokens: 50
};

// 将数据转换为 JSON 字符串
const jsonData = JSON.stringify(queryData);

// 设置请求头为 application/json
http.post("https://www.baidu.com", jsonData, function (err, response) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Response from baidu:", response);
  }
});

```

# 二、promise封装

```js
class HttpRequest {
  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  makeRequest(method, url, data = null) {
    return new Promise((resolve, reject) => {
      this.xhr.open(method, url, true);
      this.xhr.setRequestHeader("Content-Type", "application/json");

      this.xhr.onload = () => {
        if (this.xhr.status >= 200 && this.xhr.status < 300) {
          resolve(this.xhr.responseText);
        } else {
          reject(new Error(`Request failed with status ${this.xhr.status}`));
        }
      };

      this.xhr.onerror = () => {
        reject(new Error("Request failed"));
      };

      if (data) {
        this.xhr.send(JSON.stringify(data));
      } else {
        this.xhr.send();
      }
    });
  }

  get(url) {
    return this.makeRequest("GET", url);
  }

  post(url, data) {
    return this.makeRequest("POST", url, data);
  }

  put(url, data) {
    return this.makeRequest("PUT", url, data);
  }

  patch(url, data) {
    return this.makeRequest("PATCH", url, data);
  }
}

const http = new HttpRequest();

// GET请求示例
http
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    console.log("GET Response:", JSON.parse(response));
  })
  .catch((error) => {
    console.error("GET Error:", error);
  });

// POST请求示例
const postData = { title: "foo", body: "bar", userId: 1 };
http
  .post("https://jsonplaceholder.typicode.com/posts", postData)
  .then((response) => {
    console.log("POST Response:", JSON.parse(response));
  })
  .catch((error) => {
    console.error("POST Error:", error);
  });

// PUT请求示例
const putData = { id: 1, title: "foo", body: "bar", userId: 1 };
http
  .put("https://jsonplaceholder.typicode.com/posts/1", putData)
  .then((response) => {
    console.log("PUT Response:", JSON.parse(response));
  })
  .catch((error) => {
    console.error("PUT Error:", error);
  });

// PATCH请求示例
const patchData = { title: "foo" };
http
  .patch("https://jsonplaceholder.typicode.com/posts/1", patchData)
  .then((response) => {
    console.log("PATCH Response:", JSON.parse(response));
  })
  .catch((error) => {
    console.error("PATCH Error:", error);
  });

```

# 三、Fetch API

Fetch API是一种用于发起网络请求的现代Web API，它提供了一种替代传统的XMLHttpRequest的方式。Fetch API使用Promise对象，使异步请求更加清晰和易于处理。

## 1.基本使用步骤

下面是使用Fetch API的基本步骤：

1. 创建一个Fetch请求： 使用`fetch()`函数来创建一个HTTP请求。这个函数接受一个URL作为参数，可以包括可选的配置选项。例如：

   ```js
   fetch('https://api.example.com/data', {
     method: 'GET', // 或 'POST', 'PUT', 'DELETE' 等
     headers: {
       'Content-Type': 'application/json' // 可选的请求头信息
     },
     // 可选：请求体，用于POST或PUT请求
     // body: JSON.stringify({ key: 'value' })
   })
   ```

2. 处理Promise： `fetch()`返回一个Promise对象，你可以使用`.then()`方法来处理请求的响应。在`.then()`中，你可以解析响应并执行适当的操作。例如：

   ```js
   fetch('https://api.example.com/data')
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json(); // 解析响应为JSON格式
     })
     .then(data => {
       console.log(data);
       // 处理获取的数据
     })
     .catch(error => {
       console.error('Fetch error:', error);
     });
   ```

3. 处理响应： 在`.then()`中，你可以处理响应对象，检查HTTP状态码（例如，200表示成功），解析响应数据，和处理任何可能的错误。

4. 处理请求错误： 使用`.catch()`方法来捕获网络请求的错误，例如网络问题或不可用的URL。这样你可以在出现问题时采取适当的措施。

Fetch API的优点包括更简洁的语法、更好的Promise支持和更强大的请求和响应对象处理能力。然而，需要注意的是，在某些情况下，可能需要额外的配置选项来处理跨域请求或设置其他特定的HTTP头部信息。

## 2.API参数

以下是 `fetch` 方法的参数以及它们的描述，列成表格：

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `input`       | 必需参数，表示资源的URL地址或 `Request` 对象。               |
| `init`        | 可选参数，一个包含各种请求配置选项的对象。它包括：           |
| `method`      | 请求的HTTP方法，如 `'GET'`、`'POST'`、`'PUT'`、`'PATCH'`、`'DELETE'` 等。默认为 `'GET'`。 |
| `headers`     | 包含请求头信息的对象，可以设置各种请求头，例如 `'Content-Type'`、`'Authorization'` 等。 |
| `body`        | 请求的主体内容，通常用于POST或PUT请求，可以是字符串、`FormData` 对象、`URLSearchParams` 对象等。 |
| `mode`        | 请求模式，例如 `'cors'`（跨域请求）或 `'same-origin'`（同源请求）。 |
| `cache`       | 请求的缓存模式，如 `'no-cache'`、`'default'` 等。            |
| `credentials` | 用于跨域请求时是否发送凭据，可以是 `'same-origin'`、`'include'` 或 `'omit'`。 |
| `redirect`    | 指定重定向模式，如 `'follow'`、`'error'` 或 `'manual'`。     |

## 3.封装

```js
class HttpClient {
  constructor() {
    this.headers = {
      "Content-Type": "application/json"
    };
    this.baseUrl = ""; // 设置你的API基本URL
  }

  sendRequest(url, method, data = null) {
    const config = {
      method,
      headers: this.headers,
      mode: "cors", // 可选：处理跨域请求
      cache: "no-cache" // 可选：不缓存请求
    };

    if (data !== null) {
      config.body = JSON.stringify(data);
    }

    return fetch(this.baseUrl + url, config)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // 解析响应为JSON格式
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        throw error; // 重新抛出错误以便上游处理
      });
  }

  get(url) {
    return this.sendRequest(url, "GET");
  }

  post(url, data) {
    return this.sendRequest(url, "POST", data);
  }

  put(url, data) {
    return this.sendRequest(url, "PUT", data);
  }

  patch(url, data) {
    return this.sendRequest(url, "PATCH", data);
  }
}

// 创建HttpClient实例
const httpClient = new HttpClient();

// 例子：GET请求
httpClient
  .get("/data")
  .then((data) => {
    console.log(data);
    // 处理获取的数据
  })
  .catch((error) => {
    // 处理错误
  });

// 例子：POST请求
const postData = { key: "value" };
httpClient
  .post("/data", postData)
  .then((data) => {
    console.log(data);
    // 处理响应
  })
  .catch((error) => {
    // 处理错误
  });

// 例子：PUT请求
const putData = { updatedKey: "updatedValue" };
httpClient
  .put("/data/1", putData)
  .then((data) => {
    console.log(data);
    // 处理PUT请求的响应
  })
  .catch((error) => {
    // 处理PUT请求的错误
  });

// 例子：PATCH请求
const patchData = { partialUpdate: "newValue" };
httpClient
  .patch("/data/1", patchData)
  .then((data) => {
    console.log(data);
    // 处理PATCH请求的响应
  })
  .catch((error) => {
    // 处理PATCH请求的错误
  });

```

# 四、async&await&fetch实现

```js
class AjaxClient {
  constructor() {
    this.baseUrl = ''; // 设置你的API基本URL
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  async get(url) {
    const response = await fetch(this.baseUrl + url, {
      method: 'GET',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  async post(url, data) {
    const response = await fetch(this.baseUrl + url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  async put(url, data) {
    const response = await fetch(this.baseUrl + url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  async patch(url, data) {
    const response = await fetch(this.baseUrl + url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
}

// 创建AjaxClient实例
const ajaxClient = new AjaxClient();

// 例子：GET请求
(async () => {
  try {
    const data = await ajaxClient.get('/data');
    console.log(data);
    // 处理获取的数据
  } catch (error) {
    console.error('Error:', error);
  }
})();

// 例子：POST请求
const postData = { key: 'value' };
(async () => {
  try {
    const data = await ajaxClient.post('/data', postData);
    console.log(data);
    // 处理POST请求的响应
  } catch (error) {
    console.error('Error:', error);
  }
})();

// 例子：PUT请求
const putData = { updatedKey: 'updatedValue' };
(async () => {
  try {
    const data = await ajaxClient.put('/data/1', putData);
    console.log(data);
    // 处理PUT请求的响应
  } catch (error) {
    console.error('Error:', error);
  }
})();

// 例子：PATCH请求
const patchData = { partialUpdate: 'newValue' };
(async () => {
  try {
    const data = await ajaxClient.patch('/data/1', patchData);
    console.log(data);
    // 处理PATCH请求的响应
  } catch (error) {
    console.error('Error:', error);
  }
})();

```

