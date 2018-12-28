<template>
  <div class="Signin">
    <div class="wrapper">
      <div class="inputWrapper">
          <label class="title" for="">验证登陆</label>
          <input type="text" placeholder="请输入accessToken" v-model="inputValue">
          <button type="button" @click="signIn(inputValue)">验&nbsp;&nbsp;&nbsp;&nbsp;证</button>
      </div>
      <!-- <p v-if="false" class="wrongError">AccessToken错误，请重新输入</p> -->
      <router-link :to="{
        name: 'root'
      }">
        <p class="toHome"></p>
      </router-link>
      <div class="description">
        <p class="head">如何获取 accessToken？</p>  
        <p class="content">用户登录cnode后，在设置页面可以看到自己的 accessToken。</p> 
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import $ from 'jquery'

export default {
  name: 'Signin',
  data() {
    return {
      inputValue: '',
      showWrongError: false,
    }
  },
  components: {

  },
  methods: {
    signIn(inputValue){
      if(inputValue.trim()){
        this.$http.post('https://cnodejs.org/api/v1/accesstoken',qs.stringify({
          accesstoken: this.inputValue.trim()
        }))
        .then((res)=>{
          let userInfo = res.data
          localStorage.userInfo = JSON.stringify(userInfo)
          localStorage.accesstoken = inputValue
          localStorage.showSignout = 'true'
          localStorage.showSignin = 'false'
          this.$store.commit('updateUserInfo', localStorage.userInfo)
          this.$store.commit('updateAccessToken', localStorage.accesstoken)
          this.$store.commit('Signin',false)
          this.$store.commit('Signout',true)
          $('p.toHome').click()
        }).catch(err=>{
          alert('AccessToken错误，请重新输入')
          $('input').focus()
        })
      }else{
        alert('请输入正确的 accesstoken')
      }
      
    }
  }
}
</script>

<style scoped>
.Signin{
  width: 100%;
}
.Signin .wrapper{
  width: 50%;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.06);
  border-radius: 2px;
}
.Signin .title{
  font-size: 16px;
  font-weight: 700;
  margin: 40px auto 28px ;
}
.Signin input{
  font-size: 14px;
  height: 40px;
  width: 400px;
  border-radius: 2px;
  border: 1px solid #ddd;
  outline: none;
  padding-left: 8px;
}
.Signin input:focus{
  border: 1px solid #80bd01;
}
.Signin .inputWrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
}
.Signin button{
  height: 40px;
  width: 400px;
  border: none;
  background: #333;
  color: #fff;
  border-radius: 2px;
  margin: 10px;
  outline: none;
  cursor: pointer;
}
.Signin button:hover{
  background: #222;
}
.Signin .description{
  text-align: center;
  padding-top: 32px;
  padding-bottom: 20px;
}
.Signin .head{
  font-size: 13px;
  color: #666;
}
.Signin .content{
  font-size: 12px;
  color: #888;
  margin: 6px;
}
.Signin .wrongError{
  font-size: 13px;
  color: red;
  text-align: center;
}
</style>
