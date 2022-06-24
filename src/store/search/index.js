import {search} from '../../api/index'
export default{
    state:{
        searchList:{}
    },
    mutations:{
        GETSEARCH(state,searchList){
            state.searchList=searchList
        }
    },
    actions:{
        async reqsearch(context,params={}){
           const res= await search(params)
           console.log(res)
           if(res.status===200){
               context.commit('GETSEARCH',res.data.data)
           }
        }
    },
    getters:{
        goodsList(state){
          return state.searchList.goodsList
        },
        attrsList(state){
          return state.searchList.attrsList
        },
        trademarkList(state){
          return state.searchList.trademarkList
        }
    }
}