<template >
  <div class="artical">
    <div class="loading" v-if="isLoading">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
    <div class="articalWrapper" v-else>
      <div class="toTop" v-if="showUp" @click="toTop">
        <i class="fas fa-arrow-up"></i>
      </div>
      <div class="header">
        <div class="title">{{post.title}}</div>
        <ul class="articalInfo">
          <li>
            发布于:
            <span>{{post.create_at | formatDate}}</span>
          </li>
          <li v-if="post.author.loginname">
            作者:
            <router-link :to="{
              name: 'user-info',
              params: {
                name: post.author.loginname
              }
            }">
              <span>{{post.author.loginname}}</span>
            </router-link>
            
          </li>
          <li>
            <span>{{post.visit_count}}</span>&nbsp;次浏览
          </li>
          <li>
            来自:
            <span>{{post | formatTab}}</span>
          </li>
        </ul>
      </div>
      <div class="content" v-html="post.content"></div>
    </div>

    <div class="replyWrapper" >
      <div class="replyTop"><span class="replyCount" v-if="post.replies">{{post.replies.length}}</span> 条回复</div>
      <div>
        <div v-for="(reply, index) in post.replies" :key="index" class="replyContent">
          <div class="replyItem" v-if="reply.author.loginname">
            <router-link :to="{
              name: 'user-info',
              params: {
                name: reply.author.loginname
              }
            }">
              <img :src="reply.author.avatar_url" alt class="replyAvatar">
            </router-link>
            <div class="replyer" v-if="reply.author.loginname">
              <router-link :to="{
                name: 'user-info',
                params: {
                  name: reply.author.loginname
                }
              }">
                <span class="replyAuthor">{{reply.author.loginname}}</span>
              </router-link>
              <p v-html="reply.content" class="comment"></p>
              <div class="ups">
                <span
                  class="replyTime"
                >{{index + 1}}楼&nbsp;&nbsp;|&nbsp;&nbsp;{{reply.create_at | formatDate}}</span>
                <span>
                  <i class='far fa-thumbs-up up-btn' @click="up(reply.id,$event)"></i>
                  {{reply.ups.length}}
                  <i class="fas fa-reply reply" v-if="showReplyBtn" @click="showTextarea(index,reply.author.loginname)"></i>
                </span>
                
                <!-- <span v-else></span> -->
              </div>
              <div class="inputWrapper" v-if="xxindex === index?!showReplyInput:showReplyInput">
                <textarea name="" :id=reply.id class="replyInput" cols="30" rows="6" v-model="comment"></textarea>
                <button @click="sendComment(post.id,reply.id)">回 复</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="commentWrapper" v-if="showComment">
      <div class="commentTop">评论</div>
      <div class="inputWrapper">
        <textarea cols="30" rows="8" v-model="commentAll" placeholder="请输入评论内容"></textarea>
        <button @click="sendCommentAll(post.id)">回 复</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import $ from 'jquery'

export default {
  name: "Artical",
  data() {
    return {
      isLoading: false,
      post: {} ,//当前文章页的所有内容
      showUp: false,
      showReplyInput: false,
      xxindex:-1,
      comment:'我是评论',
      commentAll: '',
    };
  },
  components: {},
  methods: {
    getArtical() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(response => {
          if (response.data.success === true) {
            // debugger
            this.isLoading = false;
            this.post = response.data.data
          }
        });
    },
    up(id,event){
      if(localStorage.accesstoken){
        let ak = localStorage.accesstoken
        this.$http.post(`https://cnodejs.org/api/v1/reply/${id}/ups`,qs.stringify({
          accesstoken: ak
        }))
        .then(res=>{
          if(res.data.action==='down'){
            this.getArtical()
            $(event.target).removeClass('active')
            
          }else{
            this.getArtical()
            $(event.target).addClass('active')
          }
        })
      }else{
        alert('登录之后才能点赞')
      }
    },
    handleScroll(){
      if(window.scrollY > 400){
        this.showUp = true
      }else{
        this.showUp = false
      }
    },
    toTop(){
      $('html, body').animate({scrollTop: 0},300)
    },
    showTextarea(index,name){
      this.xxindex = index
      this.comment = `@${name}:`
    },
    sendComment(topicId,replyId){
      this.$http.post(`https://cnodejs.org/api/v1/topic/${topicId}/replies`,qs.stringify({
        accesstoken: localStorage.accesstoken,
        content: this.comment,
        reply_id: replyId
      }))
      .then(res=>{
        this.xxindex = -1
        this.getArtical()
      }).catch(err=>{
        alert('请正确输入评论内容')
      })
    },
    sendCommentAll(topicId){
      this.$http.post(`https://cnodejs.org/api/v1/topic/${topicId}/replies`,qs.stringify({
        accesstoken: localStorage.accesstoken,
        content: this.commentAll,
      }))
      .then(res=>{
        this.commentAll = ''
        this.getArtical()
      }).catch(err=>{
        alert('请正确输入评论内容')
      })
    },
  },
  computed: {
    showReplyBtn(){
      if(localStorage.accesstoken){
        return true
      }else{
        return false
      }
    },
    showComment(){
      if(localStorage.accesstoken){
        return true
      }else{
        return false
      }
    }
  },
  beforeMount() {
    this.isLoading = true
    window.addEventListener('scroll', this.handleScroll)
    this.getArtical()
  },
  watch:{
    '$route'(to,from){
      this.isLoading = true
      $('html, body').animate({scrollTop: 0},300)
      this.getArtical()
    }
  }
};
</script>

<style>
@import url("../assets/markdown-github.css");

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #80bd01;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}

div.toTop{
  position: fixed;
  right: 20px;
  height: 40px;
  width: 40px;
  background: #000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.3;
  bottom: 40px;
  cursor: pointer;
}
div.toTop:hover{
  opacity: 1;
  transition: all 0.3s;
}

.loading{
  flex: 1;
  background: #fff;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.06);
  height: 600px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
ul.articalInfo {
  list-style: none;
  color: #333;
}
.artical {
  margin-right: 20px;
  flex: 1;
}

.articalWrapper {
  background: #fff;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.06);
}
.articalWrapper .header {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}
.artical .title {
  font-size: 22px;
  font-weight: 700;
  width: 75%;
}
ul.articalInfo {
  display: flex;
  font-size: 12px;
  margin-top: 12px;
  color: #999;
}
ul.articalInfo li {
  margin-right: 20px;
}
ul.articalInfo li span {
  color: #80bd01;
}
.markdown-text img {
  max-width: 100% !important;
  height: auto;
}
.articalWrapper .content {
  padding: 0 20px 20px 20px;
}
.markdown-text p {
  font-size: 15px;
  line-height: 1.6em;
  margin: 1em 0;
}
.markdown-text h1,
.markdown-text h2,
.markdown-text h3,
.markdown-text h4,
.markdown-text h5,
.markdown-text h6 {
  padding: 20px 0 10px;
  border-bottom: 1px solid #e5e5e5;
}
.markdown-text ul{
  padding: 0;
  margin: 0 0 10px 25px;
  list-style-type: disc;
}
.markdown-text ol{
  padding: 0;
  margin: 0 0 10px 25px;
}
.markdown-text li {
  font-size: 14px;
  margin: 10px 0;
}
a {
  text-decoration: none;
  color: #08c;
}
a:hover {
  text-decoration: underline;
}
.commentWrapper,
.replyWrapper {
  margin-top: 20px;
  background: #fff;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.06);
}
.commentWrapper .commentTop,
.artical .replyTop {
  font-size: 15px;
  color: #333;
  padding: 16px 20px;
  background: #fff;
  font-weight: 700;
  border-bottom: 1px solid #ddd;
}
.artical .replyCount{
  color: #80bd01;
}

.replyContent {
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid #f0f0f0;
}
.replyContent img.replyAvatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;

}
.replyContent .replyItem {
  display: flex;
}
.replyContent .replyer {
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  width: 100%;
}
.replyContent .replyAuthor {
  font-size: 13px;
  font-weight: 700;
  color: #666;
}
.replyContent .ups {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: #888;
}
.replyContent .inputWrapper{
  display: flex;
  flex-direction: column;
}
.commentWrapper button,
.replyContent .inputWrapper button{
  outline: none;
  height: 32px;
  width: 72px;
  background: #80bd01;
  border: none;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
}
.replyContent .inputWrapper button:hover{
  background: #80b90c;
}
.replyContent textarea.replyInput{
  margin: 10px 0;
  resize: none;
  outline: none;
  font-size: 13px;
  font: inherit;
  padding: 8px;
  -webkit-appearance: none;
}
.replyContent textarea.replyInput:focus{
  border: 1px solid #80bd01;
}
.replyContent .reply{
  margin-left: 16px;
}
.replyContent .reply,
.replyContent .up-btn {
  font-size: 14px;
  color: #000;
  opacity: 0.4;
  margin-right: 4px;
}
.replyContent .reply:hover,
.replyContent .up-btn:hover{
  opacity: 0.6;
}
.replyContent .up-btn.active{
  opacity: 1;
}
.replyContent .replyTime {
  font-size: 11px;
  color: #999;
}
.replyContent .markdown-text p {
  margin: 10px 0;
}

.commentWrapper textarea{
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  padding: 20px;
  font-size: 13px;
  font: inherit;
}
.commentWrapper textarea:focus{
  border: none;
}
.commentWrapper button{
  margin-left: 20px;
  margin-bottom: 20px;
}
/* ---------------------------------------------------------------------------------------- */

@media screen and (max-width:420px){

div.toTop{
  opacity: 0.3;
  bottom: 20px;
}
div.toTop:hover{
  opacity: 0.3;
  transition: all 0.3s;
}
ul.articalInfo {
  list-style: none;
  color: #333;
  white-space: nowrap;
}
.artical {
  margin-right: 0;
  flex: 1;
}
.artical .title {
  font-size: 20px;
  font-weight: 700;
  width: 100%;
}
ul.articalInfo {
  display: flex;
  font-size: 11px;
  margin-top: 12px;
  color: #999;
}
ul.articalInfo li {
  margin-right: 12px;
}
.artical .replyCount{
  color: #80bd01;
}
.replyContent textarea.replyInput{
  margin: 10px 0;
  resize: none;
  outline: none;
  font-size: 13px;
  font: inherit;
  padding: 8px;
  border: 1px solid #ddd;
}
.replyContent textarea.replyInput:focus{
  border: 1px solid #80bd01;
}
.replyContent .reply{
  margin-left: 16px;
}
.replyContent .reply,
.replyContent .up-btn {
  font-size: 14px;
  color: #000;
  opacity: 0.4;
  margin-right: 4px;
}
.replyContent .reply:hover,
.replyContent .up-btn:hover{
  opacity: 0.4;
}
.replyContent .up-btn.active{
  opacity: 1;
}
.replyContent .replyTime {
  font-size: 11px;
  color: #999;
}

}
</style>
