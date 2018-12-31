<template>
  <div class="UserInfo">
    <div class="loading" v-if="isLoading">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
    <div v-else>
      <div class="userInformation">
        <section class="user">
          <!-- <div class="head">主页</div> -->
          <div class="wrapper">
            <img :src="userInfo.avatar_url" alt class="userImg">
            <div class="infoWrapper">
              <span class="userName">{{userInfo.loginname}}</span>
              <p class="score">积分：{{userInfo.score}}</p>
              <p class="registerTime">注册时间：{{userInfo.create_at | formatDate}}</p>
            </div>
          </div>
        </section>
        <div class="topics">
          <div class="head">最近创建的话题</div>
          <ul>
            <li v-for="(item,key) in this.recentTopics" :key="key">
              <router-link :to="{
                name: 'user-info',
                params: {
                  name: item.author.loginname
                }
              }">
                <img :src="item.author.avatar_url" alt>
              </router-link>

              <router-link class="title"
                :to="{
                name: 'post-content',
                  params: {
                    id: item.id,
                    name: item.author.loginname
                  }
                }"
              >{{item.title}}</router-link>
              <span class="time">{{item.last_reply_at | formatDate}}</span>
            </li>
          </ul>
        </div>
        <div class="replies">
          <div class="head">最近参与的话题</div>
          <ul>
            <li v-for="(item,key) in this.recentReplies" :key="key">
              <router-link :to="{
                name: 'user-info',
                params: {
                  name: item.author.loginname
                }
              }">
                <img :src="item.author.avatar_url" alt>
              </router-link>
              
              <router-link class="title"
                :to="{
                name: 'post-content',
                  params: {
                    id: item.id,
                    name: item.author.loginname
                  }
                }"
              >{{item.title}}</router-link>
              <span class="time">{{item.last_reply_at | formatDate}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: false,
      userInfo: {}
    };
  },
  components: {},
  methods: {
    getUserInfo() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(response => {
          this.isLoading = false;
          this.userInfo = response.data.data;
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getUserInfo()
  },
  computed: {
    recentReplies(){
      if(this.userInfo.recent_replies){
        return this.userInfo.recent_replies.splice(0,5)
      }else{
        return this.userInfo.recent_replies
      }
    },
    recentTopics(){
      if(this.userInfo.recent_topics){
        return this.userInfo.recent_topics.splice(0,5)
      }else{
        return this.userInfo.recent_topics
      }
    },
  },
  watch:{
    '$route'(to,from){
      this.getUserInfo()
    }
  }
};
</script>

<style scoped>
.UserInfo{
  flex: 1;
  margin-right: 20px;
}
.UserInfo .user,
.UserInfo .topics,
.UserInfo .replies {
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.06);
  background: #fff;
  margin-bottom: 20px;
}
.UserInfo .head {
  font-size: 15px;
  color: #333;
  padding: 16px 20px;
  background: #fff;
  /* border-bottom: 1px solid #ddd; */
  font-weight: 700;
}
.UserInfo .wrapper {
  padding: 20px;
  display: flex;
}
.UserInfo .infoWrapper {
  margin-left: 16px;
}
.UserInfo .userName {
  color: #778087;
  font-weight: 700;
  font-size: 14px;
}
.UserInfo .score {
  font-size: 14px;
  color: #333;
  margin: 10px 0;
}
.UserInfo .registerTime {
  font-size: 13px;
  color: #ababab;
}
.UserInfo .userImg {
  height: 72px;
  width: 72px;
  border-radius: 50%;
}
.UserInfo .title {
  margin-left: 16px;
}
.UserInfo img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.UserInfo li {
  padding: 10px 20px 10px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
}
.UserInfo li:hover{
  background: #fbfbfb;
}
.UserInfo .time {
  flex: 1;
  text-align: right;
  display: inline-block;
  color: #778087;
  font-size: 11px;
}
.UserInfo .title {
  max-width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
  font-weight: unset;
}
a {
  text-decoration: none;
  color: #666;
}
a:hover {
  color: #333;
}

/* ---------------------------------------------------- */
@media screen and (max-width:420px) {
.UserInfo{
  margin-right: 0;
}
.UserInfo li:hover{
  background: #fff;
}
a:hover {
  color: #666;
  text-decoration: none;
}
}
</style>
