<template>
  <div class="PostTab">
    <span 
    v-for="(tabName,index) in tabNames" :key="index"
    :class="[{'active':currentTab === tabName}]"
    @click="selectTab(tabName)"
    >{{tabName}}</span>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  data() {
    return {
      tabNames: ['全部','精华','分享','问答','招聘'],
      currentTab: '全部',
    };
  },
  components: {},
  methods: {
    selectTab(tabName){
      this.currentTab = tabName
    }
  }
}
</script>

<style scoped>
.PostTab span {
  padding: 4px 8px;
  border-radius: 2px;
  margin-right: 10px;
  font-size: 15px;
  cursor: pointer;
}
.PostTab span.active {
  background: #80bd01;
  color: #fff;
}
</style>
