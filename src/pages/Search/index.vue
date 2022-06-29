<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li
              class="with-x"
              v-if="searchParams.categoryName"
              @click="deletecategoryName"
            >
              {{ searchParams.categoryName }}
            </li>
            <li
              class="with-x"
              v-if="searchParams.keyword"
              @click="deletekeyword"
            >
              {{ searchParams.keyword }}
            </li>
            <li
              class="with-x"
              v-if="searchParams.trademark"
              @click="deletetrademark"
            >
              {{ searchParams.trademark.split(":")[1] }}
            </li>
            <li
              class="with-x"
              @click="deleteattr(index)"
              v-for="(val, index) in searchParams.props"
              :key="index"
            >
              {{ val.split(":")[1] }}
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @trademarkInfo="trademarkInfo"
          @sendattrval="sendattrval"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- oder中如果是1就是综合   是2就是价格 desc就是降序   asc就是升序 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>
                    综合
                    <i :class="{ up: isAsc, down: isDesc }"></i>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>
                    价格
                    <i :class="{ up: isAsc, down: isDesc }"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <goods :goodsList="goodsList"></goods>
          <!-- 分页器 -->
          <pagination 
            :pageNo='searchParams.pageNo' 
            :pageSize='searchParams.pageSize' 
            :total='91' 
            :continues='5'
            @currentPage="currentPage"
          >
          </pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import goods from '../../components/goods/goods.vue'
import { mapGetters ,mapState } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchSelector,
    goods
  },
  data () {
    return {
      //将来Search模块搜索的条件
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        trademark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】
        pageNo: 1, //当前分页器的页码  【默认初始值:1】
        pageSize: 3, //代表当前一页显示几条数据 【默认初始值:10】
      },
    }

  },
  beforeMount () {//修改参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params)//合并参数表
  },
  mounted () {
    this.loadSerach();
  },
  computed: {
    ...mapGetters(['goodsList', 'attrsList', 'trademarkList']),
    ...mapState({total:state=>state.search.searchList.total}),
    isOne () {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo () {
      return this.searchParams.order.indexOf('2') != -1
    },
    isAsc () {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc () {
      return this.searchParams.order.indexOf('desc') != -1
    }

  },
  watch: {
    $route () {//每次路由变化的时候都应该从新发起请求
      //清空三级分类
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
      //重新整理参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      console.log(this.searchParams)

      //重新发起请求
      this.loadSerach()
    }
  },
  methods: {
    loadSerach () {//加载搜索页面的数据
      this.$store.dispatch('reqsearch', this.searchParams)
    },
    deletecategoryName () {//删除品牌
      this.searchParams.categoryName = undefined //把值设置为空请求的时候就没有这个参数了，减少服务器的压力，设置为空字符串也可以
      //没有品牌，id也没有
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined

      //把路劲也修改了,判断是否有params参数
      this.$router.push({ name: 'search', params: this.$route.params })
      // if(this.$router.params.keyword){
      //     this.$router.push({name:'search',params:this.$route.params.keyword})
      // }else{
      //     this.$router.push('/search')
      // }

      //重新加载数据：
      this.loadSerach();
    },
    deletekeyword () {//删除关键字
      this.searchParams.keyword = undefined
      //从新请求数据
      this.loadSerach()
      //点击删除华为标签的时候，要把搜索框中的值也删除掉
      this.$bus.$emit('clear')
      //清除地址栏中的keyword
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    //接收传递过来的参数
    trademarkInfo (trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      //从新请求数据
      this.loadSerach()
    },
    deletetrademark () {//删除deletetrademark
      this.searchParams.trademark = undefined
      //从新请求数据
      this.loadSerach()
    },
    sendattrval (attr, attrVal) {
      // console.log(attr)
      // console.log(attrVal)
      const prop = `${attr.attrId}:${attrVal}:${attr.attrName}`;
      //数组去重
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop)
      }
      //重新加载数据
      this.loadSerach()
    },
    deleteattr (index) {
      this.searchParams.props.splice(index, 1)
      //重新加载数据
      this.loadSerach()
    },
    changeOrder (flag) {
      //获取初始数据中的是升序还是降序
      var originSort = this.searchParams.order.split(':')[1]
      if (flag == 1) {
        this.searchParams.order = `${flag}:${originSort === 'asc' ? 'desc' : 'asc'}`
        console.log(this.searchParams.order)
      } else if (flag == 2) {
        this.searchParams.order = `${flag}:${originSort === 'asc' ? 'desc' : 'asc'}`
        console.log(this.searchParams.order)
      }
      //重新加载数据
      this.loadSerach()

    },
     currentPage(pageNo) {
      //父组件整理参数
      this.searchParams.pageNo = pageNo;
       this.getData();
    },
  }

}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .up {
      display: inline-block;
      width: 17px;
      height: 17px;
      background: url(./images/UP.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
    }
    .down {
      display: inline-block;
      width: 17px;
      height: 17px;
      background: url(./images/DOWN.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      
    }
  }
}
</style>