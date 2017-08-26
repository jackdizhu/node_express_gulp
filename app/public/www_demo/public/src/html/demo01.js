
// require('./js/zepto.min.js');

// var axios = require('./js/axios.min.js');
// var vue = require('./js/vue.min.js');

// 模拟数据
// var Mock = require('./js/mock-min.js')
// var data = Mock.mock('http://127.0.0.1:3000/index.html',{
//     // 属性 list 的值是一个数组，其中含有 1 到 10  (随机)个元素
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]
// });

require(['./js/axios.min.js','./js/vue.min.js','./js/mock-min.js'],function (axios,Vue,Mock) {
    // 模拟数据
    // Mock.mock(rurl,rtype,function(options))
    // rurl表示要拦截的地址，可以使普通的url如http://c.cn，也可以是url正则表达式/\.json/
    // rtype表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等 (可以省略 即拦截所有)
    // funtion(options)表示用于生成响应数据的函数
    var data = Mock.mock(/http[s]?\:\/\/127\.0\.0\.1\:3000\/index\.html/,'post',{
        // 属性 list 的值是一个数组，其中含有 1 到 10  (随机)个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    });
    // console.log(axios);
    // 创建一个新的 axios 实例
    var _axios = axios.create({
      baseURL: 'http://127.0.0.1:3000/',
      timeout: 3000,
      headers: {'X-token': '------------'}
    });
    _axios({
      method:'post',
      url:'index.html?token=111111111111',
      // get
      params: {
        token: '------'
      },
      // post
      data: {
        token: '------'
      },
      // responseType --> 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType:'json'
    })
    .then(function(res) {
      console.log(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
});

