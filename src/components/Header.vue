<template >
  <div class="header">
    <div class="wrapper">
      <router-link :to="{
        name: 'root'
      }" class="logo">
        <img src="../assets/cnodejs_light.svg" alt>
      </router-link>
      <ul>
        <li>
          <router-link :to="{
            name: 'root'
          }"><i class="fas fa-home home"></i></router-link>
        </li>
        <li v-show="showSignin">
          <router-link :to="{
          name: 'signin'
        }"><i class="fas fa-sign-in-alt in"></i></router-link>
        </li>
        <li class="user" v-if="showSignout">
          <router-link v-if="userInfo.loginname"
            :to="{
            name: 'user-info',
            params: {
              name: userInfo.loginname
            }
          }"
          >
            <img :src="userInfo.avatar_url" class="userImg">
          </router-link>
          <router-link v-if="userInfo.loginname"
            :to="{
            name: 'user-info',
            params: {
              name: userInfo.loginname
            }
          }"
          >
            <span class="name">{{userInfo.loginname}}</span>
          </router-link>
        </li>
        <li v-if="showSignout" @click="signout">
          <i class="fas fa-sign-out-alt out"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      userInfo: {},
      showSignout: false,
      showSignin: true
    };
  },
  methods: {
    getUserInfo() {
      if (localStorage.userInfo) {
        let loginname = JSON.parse(localStorage.userInfo).loginname;
        this.$http
          .get(`https://cnodejs.org/api/v1/user/${loginname}`)
          .then(response => {
            this.userInfo = response.data.data
            this.showSignout = this.toBool(localStorage.showSignout)
            this.showSignin = this.toBool(localStorage.showSignin)
          })
      }
    },
    // show(){
    //   if(localStorage.accesstoken){
    //     this.showSignout = !this.showSignout
    //     this.showSignin = !this.showSignin
    //   }else{
    //     this.showSignout = !this.showSignout
    //     this.showSignin = !this.showSignin
    //   }
    // },
    signout(){
      localStorage.showSignout = false
      localStorage.showSignin = true
      localStorage.removeItem('userInfo')
      localStorage.removeItem('accesstoken')
      this.showSignout = this.toBool(localStorage.showSignout)
      this.showSignin = this.toBool(localStorage.showSignin)
      location.reload()
    },
    toBool(string){
      if(string === 'true'){
        return true
      }else{
        return false
      }
    }
  },
  beforeMount() {
    this.getUserInfo();
  },
  watch: {
    $route(to, from) {
      this.getUserInfo()
    }
  }
};
</script>

<style scoped>
.header {
  background: #333;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrapper {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}
a.logo {
  font-size: 16px;
  margin-top: -4px;
}
img {
  max-width: 120px;
  height: 100%;
  /* margin-top: -6px; */
}
ul li {
  list-style: none;
}
ul {
  float: right;
  display: flex;
  align-items: center;
}
li {
  margin-left: 20px;
  display: inline-block;
  color: #fff;
}

li a:hover {
  color: #fff;
}
li a .in{
  font-size: 18px;
  margin-top: 4px;

}
li a .home{
  font-size: 16px;
  color: #ccc;
}
li .out{
  font-size: 17px;
    margin-top: 4px;
    color: #ccc;
}
li a .in:hover,
li a .home:hover,
li .out:hover{
  color: #fff;
}
a {
  text-decoration: none;
  color: #ccc;
  font-size: 13px;
}
.header .userImg {
  height: 28px;
  width: 28px;
  border-radius: 50%;
  margin-top: 2px;
}
.header li.user .name {
  font-size: 13px;
  margin-left: 10px;
  color: #fff;
}
.header li.user {
  display: flex;
  align-items: center;
  margin-top: 2px;
}

@media screen and (max-width:420px){
  li a .in:hover,
  li a .home:hover,
  li .out:hover{
    color: #ccc;
  }
  li a:hover {
    color: #fff;
    text-decoration: none;
  }
}
</style>
