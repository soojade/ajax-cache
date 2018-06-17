const URL = "https://route.showapi.com/181-1";
let page = 3;
let content = document.getElementsByClassName("news")[0]; // 性能：get > query > $，其中get支持动态选择器
let ul = document.getElementsByClassName("pages")[0];
let goto = cacheData();

getJson();

ul.addEventListener("click", e => {
  if (e.target.tagName.toLowerCase() === "button") {
    page = e.target.innerText; // 获取第几页
    let arr = document.getElementsByClassName("active");
    if (arr[0] != undefined) {
      for (const i in arr) {
        arr[i].className = ""; // 清除全部active类
      }
    }
    e.target.className = "active";
    goto.get(page);
  }
});

// 缓存数据
function cacheData() {
  let cache = {}; // 存放缓存，在闭包中保存数据
  return {
    get: function(page) {
      if (page in cache) {
        showData(cache[page]);
        console.log("使用缓存数据页：" + page);
      } else {
        getJson();
      }
    },
    set: function(page, dataArr) {
      cache[page] = dataArr;
    }
  };
}

// 获取json数据
function getJson() {
  let xhr = new XMLHttpRequest(); // 创建Ajax对象
  let params = []; // 暂存数据
  let sendData = {
    showapi_appid: "30603",
    showapi_sign: "98960666afeb4992ae91971d13494090",
    page: page,
    num: 6 // 一页显示多少条
  };

  for (let key in sendData) {
    // 把请求的对象转换成数组，为下面拼接字符串做准备
    params.push(`${key}=${sendData[key]}`);
  }

  postData = params.join("&"); // 返回拼接后的字符串
  xhr.open("GET", `${URL}?${postData}`, true); // 开启数据信道
  xhr.send(null); // 发送数据 传递null，兼容性问题，安全性问题

  xhr.onreadystatechange = () => {
    // 监听数据信道
    // console.log(xhr.status); // 服务器响应状态码
    // console.log(xhr.readyState); // ajax 通讯状态，0：未初始化；1：send已经载入，正在发送请求；2：send 执行完成，已经收到响应内容；3：正在解析响应内容；4：响应内容解析完成，可以在客户端调用
    if (xhr.status === 200 && xhr.readyState === 4) {
      let dataArr = JSON.parse(xhr.response).showapi_res_body.newslist; // xhr.response 返回的是字符串
      goto.set(page, dataArr); // page作为key，缓存数据
      showData(dataArr); // 在页面展示数据
    }
  };
}

/**
 * 解析数据，通过html模板添加到页面中
 * @param {Array} arr 包含数据的数组
 */
function showData(arr) {
  let template = "";
  // 注意不要省略最后的分号
  for (let i = 0, item; (item = arr[i++]); ) {
    template += `
      <li>
        <img src="${item.picUrl}" alt="">
        <a href="${item.url}">
           ${item.title} &GT;
        </a>
      </li>
    `;
  }
  content.innerHTML = template;
}
