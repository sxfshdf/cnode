<template>
  <div id="app">
    <Header></Header>
    <router-view name="main"></router-view>
  </div>
</template>

<script>
  import Header from './components/Header'
  import PostList from './components/PostList'

  export default {
    name: 'App',
    components: {
      Header, PostList
    }
  }
</script>

<style>

</style>
