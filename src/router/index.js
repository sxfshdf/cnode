import Vue from 'vue'
import Router from 'vue-router'
import Artical from '../components/Artical'
import PostList from '../components/PostList'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'root',
    path: '/',
    components: {
      main: PostList
    }
  },{
    name: 'post-content',
    path: '/topic/:id',
    components: {
      main: Artical
    }
  }]
})
