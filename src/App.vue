<template>
  <div id="app">
    <Header></Header>
    <div class="contentWrapper">
      <router-view name="main"></router-view>
      <router-view name="sidebar"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import PostList from "./components/PostList";

export default {
  name: "App",
  components: {
    Header,
    PostList
  }
};
</script>
  
<style>
#app .contentWrapper{
  display: flex;
  width: 90%;
  margin: 20px auto;
}
@media screen and (max-width:420px) {
  #app .contentWrapper{
  width: 100%;
  /* margin: 20px auto; */
  /* border: 2px solid green; */
  margin: 0;
  display: block;
}
}
</style>
