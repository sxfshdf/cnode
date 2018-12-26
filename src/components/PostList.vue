<template>
  <div class="postList">
    <!-- 数据未返回的时候显示 loading 动画 -->
    <div class="loading" v-if="isLoading">
      <img src="#" alt>
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
        <li v-for="(post, key) in posts" :key="key">
          <img :src="post.author.avatar_url">
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
          this.isLoading = false; // 加载成功之后去除loading
          this.posts = response.data.data;
        });
    },
    renderList(page){
      this.postPage = page
      this.getData()
    },
    changeTab(tab){
      this.currentTab = tab
    }
  },
  beforeMount() {
    this.isLoading = true; // 加载成功之前加载loading
    this.getData(); // 获取数据
  },
  watch:{
    '$route'(to,from){
      if (to.params && to.params.tab) {
        this.tab = to.params.tab;
        this.posts = [];
      }
      this.getData()
      console.log(1)
      this.$refs.page.firstPage()
      console.log(2)
    }
  }
};
</script>

<style scoped>
.postList {
  flex: 1;
}
ul.posts,
li {
  list-style: none;
}
ul.posts .tab span {
  padding: 4px 8px;
  border-radius: 2px;
  margin-right: 10px;
  font-size: 15px;
  cursor: pointer;
  display: inline-block;
}
ul.posts .tab span.currentTab {
  background: #80bd01;
  color: #fff;
}
ul.posts .tab span.currentTab a{
  color: #fff;
}
ul.posts .tab a:hover{
  text-decoration: none;
}
ul.posts .tab a:visited{
  text-decoration: none;
}
ul.posts .tab a{
  text-decoration: none;
  color: #80bd01;
}
ul.posts {
  background: #fff;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.06);
}
ul.posts li:not(:first-child) {
  padding: 10px 20px 10px 20px;
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
  padding: 16px 20px 16px 20px;
  background: #fbfbfb;
  color: #80bd01;
}
img {
  width: 32px;
  height: 32px;
  border-radius: 2px;
}
.countWrapper {
  margin: 0 10px;
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
  color: #08c;
}
a:hover {
  text-decoration: underline;
}
a:visited {
  color: #888;
}
</style>
