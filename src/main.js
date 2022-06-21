import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//把三级联动组件注册为全局组件
import TypeNav from './pages/Home/TypeNav'

Vue.config.productionTip = false
//注册组件
//组件名    组件
Vue.component('TypeNav', TypeNav)
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
