import { category,banner,floor } from '../../api/index'
export default{
    state:{
        category:[],
        bannerList:[],
        floorList:[]
    },
    mutations:{
        getcategory(state,category){
            state.category=category
        },
        getBannerList(state,bannerList){
            state.bannerList=bannerList
        },
        GETFLOOR(state,floorList){
            state.floorList=floorList
        }
    },
    //actions中处理异步操作，ajax请求等
    actions:{
        //请求三级目录
        async reqcategory(context){
            const res=await category()
            console.log(res);
            if(res.status===200){
                context.commit('getcategory',res.data.data)
            } 
        },
        //请求轮播图
        async reqBanner(context){
            const res=await banner()
            console.log(res.data.data)
            if(res.status===200){
                context.commit('getBannerList',res.data.data)
            }
        },
        //请求楼层数据
       async reqfloor(context){
           const res=await floor();
           console.log(res);
           if(res.status===200){
            context.commit('GETFLOOR',res.data.data)
           }
           
       }
    },
    getters:{}
}