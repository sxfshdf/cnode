import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userInfo: localStorage.userInfo && JSON.parse(localStorage.userInfo) || {},
    accessToken: localStorage.accessToken || '',
    showSignin: true,
    showSignout: false,
  },
  mutations: {
    updateUserInfo(state,userInfo){
      state.userInfo = userInfo
    },
    updateAccessToken(state,accessToken){
      state.accessToken = accessToken
    },
    Signin(state,boolean){
      state.showSignin = boolean
    },
    Signout(state,boolean){
      state.showSignout = boolean
    },
  }
})