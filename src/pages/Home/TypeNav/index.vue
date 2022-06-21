<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveshow" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" @click="goSearch" v-show="show">
            <div class="all-sort-list2">
              <!-- 一级分类 -->
              <div
                class="item bo"
                v-for="(c1, index) in category"
                :key="c1.categoryId"
                @mouseenter="changeBG(index)"
                :class="{ cur: currentIndex === index }"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <!-- 通过js控制二三级分类的显示与隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <!-- 二级分类 -->
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <!-- 三级分类 -->
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
//三级联动节流处理
//按需引入lodash
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  computed: {
    ...mapState({
      category: (state) => state.home.category,
    })
  },
  data () {
    return {
      categoryList: [],
      currentIndex: -1,
      show: true,//在home组件中默认显示，在search组件中默认隐藏

    }
  },
  methods: {
    // changeBG(index){//修改以及分类的背景颜色
    //     this.currentIndex=index
    //     console.log(index);
    // },
    changeBG: throttle(function (index) {
      this.currentIndex = index;
    }, 5000),
    entershow () {
      if (this.$route.path === '/search') {
        this.show = true
      }
    },
    leaveshow () {//鼠标移出以及分类背景颜色恢复为白色
      if (this.$route.path === '/search') {
        this.show = false
      }
      this.currentIndex = -1
    },
    goSearch (event) {//点击1  2  3 级分类跳转到搜索页
      //使用事件委托的方式，统一委托给父元素
      var target = event.target.dataset
      console.log(target)
      var categoryname = event.target.dataset.categoryname
      var category1id = event.target.dataset.category1id
      var category2id = event.target.dataset.category2id
      var category3id = event.target.dataset.category3id

      //组织参数
      var location = {
        name: 'search',
        query: { categoryname: categoryname }
      }
      //有属性data-categoryName 的就是目标对象
      if (categoryname) {
        //判断 1  2 还是3
        if (category1id) {
          location.query.category1Id = category1id
        } else if (category2id) {
          location.query.category2Id = category2id
        } else if (category3id) {
          location.query.category3Id = category3id
        }
        //点击商品分类按钮的时候，如果路径中有params参数，需要合并并携带给search组件
        if(this.$route.params.keyword){
            location.params=this.$route.params
        }
        this.$router.push(location)
      }
      //判断

    }
  },
  mounted () {
    if (this.$route.path !== '/home') {
      this.show = false
    }


    
  },
}
</script>
<style lang="less" rel="stylesheet/stylus">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    .sort-enter,.sort-leave-to{
        height:0px;
    }
    .sort-enter-to,.sort-leave{
        height:461px;
    }
    .sort-enter-active,.sort-leave-active{
        transition:all linear .3s;
    }
  }
}
</style>
