import Vue from 'vue'
import Router from 'vue-router'
import Artical from '../components/Artical'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SideBar from '../components/SideBar'
import Signin from '../components/Signin'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'root',
    path: '/',
    components: {
      main: PostList
    }
  },{
    name: 'post-list',
    path: '/?tab=:tab',
    components: {
      main: PostList
    }
  },{
    name: 'post-content',
    path: '/topic/:id&author=:name',
    components: {
      main: Artical,
      sidebar: SideBar
    }
  },{
    name: 'user-info',
    path: '/userinfo/:name',
    components: {
      main: UserInfo,
      sidebar: SideBar
    }
  },{
    name: 'signin',
    path: '/signin',
    components: {
      main: Signin,
    }
  }]
})
