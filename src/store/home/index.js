import { category } from '../../api/index'
export default{
    state:{
        category:[] 
    },
    mutations:{
        getcategory(state,category){
            state.category=category
        }
    },
    //actions中处理异步操作，ajax请求等
    actions:{
        async reqcategory(context){
            const res=await category()
            console.log(res);
            if(res.status===200){
                context.commit('getcategory',res.data.data)
            }
            
        }
    },
    getters:{}
}