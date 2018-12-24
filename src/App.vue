<template>
  <div id="app">
    <Header></Header>
    <post-list></post-list>
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
