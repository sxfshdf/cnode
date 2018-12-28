<template>
  <div class="postList">
    <!-- 数据未返回的时候显示 loading 动画 -->
    <div class="loading" v-if="isLoading">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
    <!-- 列表数据 -->
    <div class="postWrapper" v-else>
      <ul class="posts">
        <li class="tab">
          <span v-for="(tab,key) in tabs" :key="key"
                :class="[{currentTab:currentTab === tab.tabName}]"
                @click="changeTab(tab.tabName)"
                >
                <router-link :to="{
                  name: 'post-list',
                  params: {
                    tab: tab.tab
                  }
                }">
                   {{tab.tabName}}
                </router-link></span>
        </li>
        <li class="liLoading" v-if="isChange">
          <div class="lds-ripple"><div></div><div></div></div>
        </li>
        <li v-for="(post, key) in posts" :key="key">
          <router-link v-if="post.author.loginname" :to="{
            name: 'user-info',
            params: {
              name: post.author.loginname
            }
          }">
            <img :src="post.author.avatar_url">
          </router-link>
          
          <span class="countWrapper">
            <span class="reply">{{post.reply_count}}</span>
            <span class="countSeperator">/</span>
            <span class="visit">{{post.visit_count}}</span>
          </span>
          <span
            :class="[
          {good: (post.good === true)}, 
          {top: (post.top === true)}, 
          {topicTab: (post.good !== true && post.top !== true)}]"
          >
            <span>{{post | formatTab}}</span>
          </span>
          <router-link
            :to="{
            name: 'post-content',
            params: {
              id: post.id,
              name: post.author.loginname
            }
          }"
          >
            <span class="title">{{post.title}}</span>
          </router-link>
          <span class="time">{{post.last_reply_at | formatDate}}</span>
        </li>
        <li>
          <pagination ref="page" @change="renderList"></pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pagination from './Pagination'
import posttab from './PostTab'
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: [],
      postPage: 1,
      currentTab: '全部',
      isChange: false,
      tab: 'all',
      tabs: [{tabName:'全部',tab:'all'},
             {tabName:'精华',tab:'good'},
             {tabName:'分享',tab:'share'},
             {tabName:'问答',tab:'ask'},
             {tabName:'招聘',tab:'job'},]
    };
  },
  components: {
    pagination,
  },
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topics?tab=${this.tab}`, {
          params: {
            page: this.postPage,
            limit: 20
          }
        })
        .then(response => {
          // debugger
          this.isLoading = false; // 加载成功之后去除loading
          this.isChange = false
          this.posts = response.data.data;
        });
    },
    renderList(page){
      
      this.isChange = true
      this.postPage = page
      this.getData()
    },
    changeTab(tab){
      this.currentTab = tab
    }
  },
  beforeMount() {
    this.isLoading = true // 加载成功之前加载loading
    console.log(this.isLoading)
    
    this.getData()  // 获取数据
  },
  watch:{
    '$route'(to,from){
      if (to.params && to.params.tab) {
        this.tab = to.params.tab;
        this.posts = [];
      }
      this.getData()
      this.isChange = true
      this.$refs.page.firstPage()
    }
  }
};
</script>

<style scoped>
li.liLoading{
  height: 600px;
  display: flex;
  justify-content: center;
  background: #fff;
}

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

.postList {
  flex: 1;
  width: 100%;
}
ul.posts,
li {
  list-style: none;
}
ul.posts .tab span {
  padding: 4px 8px;
  border-radius: 2px;
  margin-right: 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
}
ul.posts .tab span:hover{
  color: #80bd01;
}
ul.posts .tab span.currentTab {
  /* background: #80bd01; */
  color: #fff;
}

ul.posts .tab span.currentTab{
  color: #80bd01;
  position: relative;
  font-weight: 700;
}
ul.posts .tab span.currentTab::after{
  content: '';
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background:  #80bd01;
  top: 39px;
  left: 0;
}
ul.posts .tab a:hover{
  text-decoration: none;
}
ul.posts .tab a:visited{
  text-decoration: none;
  color: unset;
}
ul.posts .tab a{
  text-decoration: none;
}
ul.posts {
  background: #fff;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.06);
}
ul.posts li:not(:first-child) {
  padding: 16px 20px 16px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
}
ul.posts li:not(:first-child):hover {
  background: #fbfbfb;
}
ul.posts li:last-child:hover{
  background: #fff;
}
ul.posts li:first-child {
  padding: 16px 20px 12px 20px;
  background: #fff;
  color: #333;
}
img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.countWrapper {
  margin: 0 16px;
  width: 70px;
  text-align: center;
  font-size: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.reply {
  font-size: 14px;
  color: #9e78c0;
  line-height: 14px;
}
.countSeperator {
  font-size: 10px;
  color: #333;
  margin: 0 2px;
  line-height: 12px;
}
.visit {
  font-size: 10px;
  color: #b4b4b4;
  line-height: 10px;
}
.top,
.good {
  font-size: 12px;
  color: #fff;
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 2px;
  margin-right: 10px;
}
.topicTab {
  font-size: 12px;
  color: #999;
  background: #e5e5e5;
  padding: 2px 4px;
  border-radius: 2px;
  margin-right: 10px;
}
.posts .title {
  max-width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
  font-weight: unset;
}
.time {
  flex: 1;
  text-align: right;
  display: inline-block;
  color: #778087;
  font-size: 11px;
}
a {
  text-decoration: none;
  color: #666;
}
a:hover {
  color: #333;
}
</style>
