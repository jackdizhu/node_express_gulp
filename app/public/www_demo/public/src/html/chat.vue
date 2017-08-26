<template>
    <div class="chatPage">
      <div class="friendsList">
          <ul>
              <li v-for="li in friendsList" :class="li.user.username==touser.username ? 'on' : ''" @click="friendsList_click(li)">
                  <div class="imgBox">
                      <img :src="li.user.img" alt="">
                  </div>
                  <p><span>{{li.user.nickname}}</span></p>
              </li>
          </ul>
      </div>
      <div class="chatBox">
          <div class="tit">
              <p><span>{{meuser.nickname}} -- {{touser.nickname}}</span></p>
          </div>
          <div class="msgBox bootclearfix">
              <dl :class="li.from==meuser.username ? 'right' : 'left'" v-for="li in friendsList[touser.username].chatRecord">
                  <dt>
                      <div class="imgBox">
                          <img src="//www.baidu.com/img/bd_logo1.png" alt="">
                      </div>
                      <p><span>{{li.from!=meuser.username ? friendsList[li.from].user.nickname : meuser.nickname}}</span><span>{{li.time}}</span></p>
                  </dt>
                  <dd>
                      <i></i>
                      <div v-if="li.type=='text'">
                          <span>{{li.msg}}</span>
                      </div>
                      <div v-if="li.type=='img'">
                          <img :src="li.src" alt="">
                      </div>
                  </dd>
              </dl>
          </div>
          <div class="inputBox">
              <!-- <form name="img"> -->
                  <p class="btnBox">
                      <label class="imgBtn">
                          <span>图片</span>
                          <input type="file" accept="image/jpeg,image/png,image/gif" name="file" />
                      </label>
                  </p>
              <!-- </form> -->
              <textarea name="msg" id="" rows="3"></textarea>
              <a href="javascript:;" class="sendBtn">发送</a>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
        props: ['data'],
        data () {
            return {
                data: data
            }
        }
    }
</script>

<style>
    .chatPage{position:relative;width:100%;height:100%;padding-left:120px}.chatPage .imgBox{border-radius:50%;overflow:hidden;background:#eee}.chatPage .imgBox img{max-width:100%;max-height:100%;display:block}.chatPage .friendsList{position:absolute;left:0;top:0;width:120px;height:100%;background:#719744}.chatPage .friendsList li{position:relative;width:100%;height:50px;padding-left:60px;line-height:50px;font-size:14px;color:#333;overflow:hidden}.chatPage .friendsList li .imgBox{position:absolute;width:50px;height:50px;left:0;top:0}.chatPage .friendsList li.on{background:#94b173}.chatPage .chatBox{position:relative;width:100%;height:100%;padding-top:40px;padding-bottom:220px}.chatPage .chatBox .tit{position:absolute;left:0;top:0;width:100%;height:40px;line-height:40px;padding:0 20px;overflow:hidden;font-size:14px;color:#666;background:#d2e5cb;text-align:center}.chatPage .chatBox .inputBox{position:absolute;left:0;bottom:0;width:100%;height:220px;border-top:1px solid #ddd;padding-top:40px}.chatPage .chatBox .inputBox textarea{display:block;width:100%;height:100%;resize:none;border:0}.chatPage .chatBox .inputBox .sendBtn{position:absolute;right:5px;bottom:5px;width:80px;height:24px;border-radius:4px;background:#709744;color:#fff;line-height:24px;text-align:center}.chatPage .chatBox .inputBox .btnBox{position:absolute;left:0;top:0;width:100%;height:40px;padding:5px 10px;overflow:hidden;border-bottom:1px solid #ddd}.chatPage .chatBox .inputBox .btnBox .imgBtn{position:relative;float:left;width:30px;height:30px;border-radius:4px;overflow:hidden}.chatPage .chatBox .inputBox .btnBox .imgBtn span{position:absolute;left:0;top:0;width:100%;height:100%;display:block;background-color:#eee}.chatPage .chatBox .inputBox .btnBox .imgBtn input{visibility:hidden}.chatPage .chatBox .msgBox{width:100%;height:100%;overflow:auto;padding-top:20px;padding-bottom:20px}.chatPage .chatBox .msgBox dl{position:relative;float:left;width:100%;margin-bottom:20px;padding:40px 20px 10px 40px}.chatPage .chatBox .msgBox dl p{color:#999;height:30px;line-height:30px;overflow:hidden}.chatPage .chatBox .msgBox dl dt{position:absolute;height:30px;width:100%}.chatPage .chatBox .msgBox dl dt .imgBox{width:30px;height:30px}.chatPage .chatBox .msgBox dl dd{position:relative;background:#009be5;border-radius:5px;padding:5px;float:left}.chatPage .chatBox .msgBox dl dd i{position:absolute;top:0;left:-14px;display:block;width:14px;height:14px;background:url(../img/chat_icon01.png) center center no-repeat;-webkit-background-size:14px;background-size:14px}.chatPage .chatBox .msgBox dl.left{float:left;padding:40px 20px 10px 40px}.chatPage .chatBox .msgBox dl.left .imgBox,.chatPage .chatBox .msgBox dl.left p,.chatPage .chatBox .msgBox dl.left span{float:left}.chatPage .chatBox .msgBox dl.left p span{margin-right:10px}.chatPage .chatBox .msgBox dl.left dt{left:0;top:0}.chatPage .chatBox .msgBox dl.left dd{float:left}.chatPage .chatBox .msgBox dl.right .imgBox,.chatPage .chatBox .msgBox dl.right dd,.chatPage .chatBox .msgBox dl.right p,.chatPage .chatBox .msgBox dl.right span{float:right}.chatPage .chatBox .msgBox dl.left dd i{right:auto;left:-14px;background:url(../img/chat_icon02.png) center center no-repeat;-webkit-background-size:14px;background-size:14px}.chatPage .chatBox .msgBox dl.right{float:right;padding:40px 40px 10px 20px}.chatPage .chatBox .msgBox dl.right p span{margin-left:10px}.chatPage .chatBox .msgBox dl.right dt{right:0;top:0}.chatPage .chatBox .msgBox dl.right dd i{left:auto;right:-14px;background:url(../img/chat_icon01.png) center center no-repeat;-webkit-background-size:14px;background-size:14px}
/*# sourceMappingURL=index.css.map */

</style>
