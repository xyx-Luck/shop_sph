import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
console.log(VueRouter)
import Home from '../pages/Home'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Regist from '../pages/Regist'

export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/search/:keyword?',
            component: Search,
            name: 'search',
            meta: {
                showFooter: true
            }
        },
        {
            path: '/regist',
            component: Regist,
            name: 'regist',
            meta: {
                showFooter: false
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/',
            redirect:'/home'
        }
    ]
})