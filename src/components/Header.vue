<template>
  <div class="header">
    <div class="wrapper">
      <router-link :to="{
        name: 'root'
      }">
        <img src="../assets/cnodejs_light.svg" alt="">
      </router-link>
      
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">新手入门</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">登录</a></li>
        <li><a href="#">注册</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
  .header{
    background: #333;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .wrapper{
    width: 90%;
    margin: 0 auto;
  }
  img{
    max-width: 120px;
    margin-top: -6px;
  }
  ul li{
    list-style: none;
  }
  ul{
    float: right;
  }
  li{
    margin-left: 20px;
    display: inline-block;
    color: #fff;
  }
  a{
    text-decoration: none;
    color: #ccc;
    font-size: 13px;
  }
</style>
