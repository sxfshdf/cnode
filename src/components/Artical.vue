<template>
  <div class="artical">
    <div class="loading" v-if="isLoading">
      <img src="#" alt>
    </div>
    <div class="articalWrapper" v-else>
      <div class="header">
        <div class="title">{{post.title}}</div>
        <ul class="articalInfo">
          <li>
            发布于：
            <span>{{post.create_at | formatDate}}</span>
          </li>
          <li>
            作者：
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
            来自：
            <span>{{post | formatTab}}</span>
          </li>
        </ul>
      </div>
      <div class="content" v-html="post.content"></div>
    </div>

    <div class="replyWrapper">
      <div class="replyTop"><span class="replyCount">{{post.replies.length}}</span> 条回复</div>
      <div>
        <div v-for="(reply, index) in post.replies" :key="index" class="replyContent">
          <div class="replyItem">
            <router-link :to="{
              name: 'user-info',
              params: {
                name: reply.author.loginname
              }
            }">
              <img :src="reply.author.avatar_url" alt class="replyAvatar">
            </router-link>
            <div class="replyer">
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
                <span v-if="reply.ups.length > 0">
                  <i class="far fa-thumbs-up up-btn"></i>
                  {{reply.ups.length}}
                </span>
                <span v-else></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Artical",
  data() {
    return {
      isLoading: false,
      post: {} //当前文章页的所有内容
    };
  },
  components: {},
  methods: {
    getArtical() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(response => {
          if (response.data.success === true) {
            this.isLoading = false;
            this.post = response.data.data;
          }
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getArtical();
  },
  watch:{
    '$route'(to,from){
      this.getArtical()
    }
  }
};
</script>

<style>
@import url("../assets/markdown-github.css");
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
.title {
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
a:visited {
  color: #888;
}

.replyWrapper {
  margin-top: 20px;
  background: #fff;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.06);
}
.artical .replyTop {
  font-size: 16px;
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
  color: #666;
}
.replyContent .up-btn {
  font-size: 14px;
  color: #000;
  opacity: 0.4;
}
.replyContent .replyTime {
  font-size: 11px;
  color: #999;
}
.replyContent .markdown-text p {
  margin: 10px 0;
}
</style>
