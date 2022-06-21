import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/index'
import search from './search/index'
Vue.use(Vuex)

const store=new Vuex.Store({
    modules:{
        home,
        search
    }
})

export default store;