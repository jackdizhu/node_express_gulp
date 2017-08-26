
// var Chat = require('./html/chat.vue');

var data = {
        friendsList: {
          user1: {
            user: {
              username: 'user1',
              nickname: '用户01',
              img: '//www.baidu.com/img/bd_logo1.png'
            },
            chatRecord: [
              {
                from: 'user1',
                to: 'me',
                msg: '你好',
                time: '2017-12-12 23:12',
                type: 'text'
              },
              {
                from: 'me',
                to: 'user1',
                src: '//www.baidu.com/img/bd_logo1.png',
                time: '2017-12-12 23:12',
                type: 'img'
              }
            ]
          }
        },
        touser: {
          username: 'user1',
          nickname: '用户02',
          img: '//www.baidu.com/img/bd_logo1.png'
        },
        meuser: {
          username: 'me',
          nickname: '用户00',
          img: '//www.baidu.com/img/bd_logo1.png'
        }
    };
var _vm;
var fn_vue = function () {
    _vm = new Vue({
        el: '#app',
        // components: {Chat},
        data: function () {
           return data;
        },
        methods: {
            friendsList_click: function (Obj) {
                this.$data.touser = Obj.user;
            },
            sendText_click: function () {
               var _text = this.$refs.textarea.value;
               _text = _text.replace(/^\s+|\s+$/g,'');
              // 输入 空格
               if(!_text.length){
                  this.$refs.textarea.value = '';
                  return false;
               }
               var _this = this;
               var _msg = {
                  from: 'me',
                  to: 'user1',
                  msg: _text,
                  time: new Date().toLocaleString(),
                  type: 'text'
                };
                _this.$data.friendsList.user1.chatRecord.push(_msg);
                _this.$nextTick(function () {
                    var _child = _this.$refs.msgBox.childNodes;
                    // + 20 margin
                    var _lastH = _child[_child.length - 1].offsetHeight + 22;
                    _this.$refs.msgBox.scrollTop += _lastH;
                })
                this.$refs.textarea.value = '';
                // 异步 发送 接收消息
                axios({
                    method:'post',
                    url:'http://192.168.1.110:8080/api/chatbot/chat.do',
                    data: {
                      uid: '',
                      tk: '',
                      body: {
                          text: _text
                      }
                    },
                    responseType:'json'
                  })
                  .then(function(res) {
                    if(res.data.code == 'S_OK'){
                      var _msg = {
                        from: 'user1',
                        to: 'me',
                        msg: res.data.var.answer,
                        time: new Date().toLocaleString(),
                        type: 'text'
                      };
                      _this.$data.friendsList.user1.chatRecord.push(_msg);
                      _this.$nextTick(function () {
                          var _child = _this.$refs.msgBox.childNodes;
                          // + 20 margin
                          var _lastH = _child[_child.length - 1].offsetHeight + 22;
                          _this.$refs.msgBox.scrollTop += _lastH;
                      })
                    }else{
                      console.log(res.data);
                    }
                  })
                  .catch(function (err) {
                    console.log('获取数据失败');
                  });
            }
        }
    })
}

// var _data = Mock.mock(/^http[s]?\:\/\/192\.168\.1\.110\:8080\/api\/chatbot\/chat\.do[^ ]*/,{
//     // 属性 list 的值是一个数组，其中含有 1 到 10  (随机)个元素
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]
// });

// 清除数据
data.friendsList.user1.chatRecord = [];
fn_vue();
