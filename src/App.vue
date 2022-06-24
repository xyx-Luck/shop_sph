<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 判断footer是否显示 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/header/header.vue'
import Footer from './components/footer/footer.vue'
import {category} from './api/index.js'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //性能优化：
          //三级分类在Home和search中都有，当每次切换页面的时候都要重新请求三级分类的数据
         //为了性能优化，加载页面的时候只执行一次就好，所以在app.vue中发请求(app的mounted只执行一次)
      //通知vuex执行
    this.$store.dispatch('reqcategory')
  }
}
</script>

<style>
</style>
