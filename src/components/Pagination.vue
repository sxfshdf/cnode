<template>
  <div class="Pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="show" class="pageBtn">...</button>
    <button 
      v-for="(btn,index) in pageBtns" :key="index" 
      @click="changeBtn(btn)"
      :class="[{currentPage:currentPage === btn},'pageBtn']"
      >{{btn}}</button>
      <button class="pageBtn">...</button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data() {
    return {
      pageBtns: [1,2,3,4,5],
      currentPage: 1,
      show: false
    }
  },
  components: {

  },
  methods: {
    changeBtn(page){
      if(typeof page !== 'number'){
        switch(page.target.innerText){
          case '上一页':
            $('button.currentPage').prev().click()
          break
          case '下一页':
            $('button.currentPage').next().click()
          break
          case '首页':
            this.pageBtns = [1,2,3,4,5,'...']
            this.changeBtn(1)
          break
          default:
          break
        }
        return 
      }
      this.currentPage = page
      if(page>4){
        this.show = true
      }else{
        this.show = false
      }
      if(page === this.pageBtns[4]){
        this.pageBtns.shift()
        this.pageBtns.splice(4,0,this.pageBtns[3]+1)
      }else if(page === this.pageBtns[0] && page !== 1){
        this.pageBtns.unshift(this.pageBtns[0]-1)
        this.pageBtns.splice(5,1)
      }
      this.$emit('change',this.currentPage)
    }
    
  }
}
</script>

<style scoped>
.Pagination {
    margin: 16px 0;
    /* padding: 6px 0; */
    /* border-radius: 5px; */
    /*box-shadow: 0px 2px 9px #888888;*/
    /* border: 1px solid #888888; */
    display: flex;
  }
.Pagination button{
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  height: 21px;
  cursor: pointer;
  padding: 0 2px;
  width: 56px;
  height: 32px;
  margin: 0 2px;
}
.Pagination .pageBtn{
  width: 32px;
  height: 32px;
}
.Pagination .currentPage {
    color: white;
    background-color: #80bd01;

  }
</style>
