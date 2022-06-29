import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'swiper/css/swiper.css'


//把三级联动组件注册为全局组件
import TypeNav from './pages/Home/TypeNav'
import banner from './components/banner/'
//分页组件
import pagination from './components/pagination/pagination.vue'
import '@/mock/mockServer.js'
Vue.config.productionTip = false
//注册组件
//组件名    组件
Vue.component('TypeNav', TypeNav)
//注册轮播图组件
Vue.component('banner', banner)
// 注册分页器组件
Vue.component('pagination',pagination)
new Vue({
    //配置全局事件总线
    beforeCreate(){
        Vue.prototype.$bus=this;
    },
    render: h => h(App),
    router,
    store
}).$mount('#app')
