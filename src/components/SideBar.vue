<template>
  <div class="SideBar">
    <div class="author">
      <div class="head">作者</div>
      <div class="wrapper">
        <router-link v-if="userInfo.loginname"
          :to="{
                name: 'user-info',
                params: {
                  name: userInfo.loginname
                }
              }"
        >
          <img :src="userInfo.avatar_url" class="userImg">
        </router-link>
        <div class="infoWrapper">
          <router-link v-if="userInfo.loginname"
            class="userName"
            :to="{
                name: 'user-info',
                params: {
                  name: userInfo.loginname
                }
              }"
          >{{userInfo.loginname}}</router-link>
          <span class="score">积分：{{userInfo.score}}</span>
        </div>
      </div>
    </div>
    <div v-if="showTopic" class="topics">
      <div class="head">作者最近主题</div>
      <ul>
        <li v-for="(item,key) in topicItems" :key="key">
          <router-link
            :to="{
            name: 'post-content',
            params: {
              id: item.id,
              name: item.author.loginname
            }
            }"
            class="title"
          >{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <div v-if="showReply" class="replies">
      <div class="head">作者最近回复</div>
      <ul>
        <li v-for="(item,key) in replyItems" :key="key">
          <router-link
            :to="{
            name: 'post-content',
            params: {
              id: item.id,
              name: item.author.loginname
            }
            }"
            class="title"
          >{{item.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      userInfo: {}
    };
  },
  components: {},
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.userInfo = res.data.data
        });
    }
  },
  computed: {
    topicItems() {
      if (this.userInfo.recent_topics) {
        return this.userInfo.recent_topics.slice(0, 5);
      }
    },
    replyItems() {
      if (this.userInfo.recent_replies) {
        return this.userInfo.recent_replies.slice(0, 5);
      }
    },
    showTopic(){
      if (this.userInfo.recent_topics && this.userInfo.recent_topics.length>0) {
        return true
      }else{
        return false
      }
    },
    showReply(){
      if (this.userInfo.recent_replies && this.userInfo.recent_replies.length>0){
        return true
      }else{
        return false
      }
    }
  },
  beforeMount() {
    this.getData();
  },
  watch: {
    $route(to, from) {
      this.getData();
    }
  }
};
</script>

<style scoped>
.SideBar {
  width: 290px;
}
.SideBar .author,
.SideBar .replies,
.SideBar .topics {
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.06);
  background: #fff;
  margin-bottom: 20px;
}
.SideBar .head {
  font-size: 15px;
  color: #333;
  padding: 16px 20px;
  background: #fff;
  font-weight: 700;
  border-bottom: 1px solid #ddd;
}
.SideBar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.SideBar li {
  padding: 10px 20px 10px 20px;
  display: flex;
  align-items: center;
  color: #778087;
}
.SideBar .title {
  width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: unset;
}
.SideBar .wrapper {
  display: flex;
  padding: 20px;
}
.SideBar .infoWrapper{
  display: flex;
  flex-direction: column;
  margin-left: 16px;
}
.SideBar .userName{
  color: #778087;
  font-weight: 700;
  font-size: 14px;
}
.SideBar .score{
  font-size: 14px;
  color: #333;
  margin: 10px 0;
}
.SideBar a{
  text-decoration: none;
  color: #666;
}
.SideBar a:hover{
  color: #333;
}

/* ------------------------------------------- */

@media screen and (max-width:420px) {
  .SideBar {
    display: none;
    width: 290px;
  } 
}
</style>
