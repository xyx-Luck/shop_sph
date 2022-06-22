<template>
  <div>
    <!-- 使用三级联动组件 -->
    <TypeNav></TypeNav>
    <!-- 轮播+右侧列表 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐 -->
    <TodayRecommend></TodayRecommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!-- 楼层 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    
    <!-- 品牌 -->
    <Brand></Brand>
  </div>
</template>
<script>
import ListContainer from './ListContainer/index.vue'
import TodayRecommend from './TodayRecommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
import {reqbanner} from '@/api/index'
import { mapState } from 'vuex'
export default {
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
 
  data(){
      return{
          
      }
  },
  computed:{
      ...mapState({
         floorList:(state)=>state.home.floorList 
      })
       
  },
  mounted(){
       this.$store.dispatch('reqfloor');
  },
  methods:{},
}
</script>
<style lang="less" rel="stylesheet/stylus">
</style>