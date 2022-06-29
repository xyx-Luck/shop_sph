<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li
          class="prev disabled"
          @click="$emit('currentPage', pageNo - 1)"
          :disabled="pageNo - 1"
        >
          <a href="#">«上一页</a>
        </li>
        <li
          :class="{ active: pageNo == 1 }"
          v-if="startAndEnd.start > 1"
          @click="$emit('currentPage', 1)"
        >
          <a>1</a>
        </li>
        <li class="dotted" v-if="startAndEnd.start > 2"><span>...</span></li>
        <!-- 中间部分 -->
        <!-- 中间连续页码的地方 -->
        <li
          v-for="page in startAndEnd.end"
          :key="page"
          v-if="page >= startAndEnd.start"
          :class="{ active: pageNo === page }"
        >
          <a>{{ page }}</a>
        </li>

        <li class="dotted" v-if="startAndEnd.end < totalPage - 1">
          <span>...</span>
        </li>
        <li
          v-if="startAndEnd.end < totalPage"
          @click="$emit('currentPage', totalPage)"
          :class="{ active: pageNo === totalPage }"
        >
          <a>{{ totalPage }}</a>
        </li>
        <li class="next" @click="$emit('currentPage', pageNo + 1)">
          <a>下一页»</a>
        </li>
      </ul>
      <div>
        <span>共{{ getTotal }}页&nbsp;</span>
      </div>

      <!-- <p>{{ startAndEnd }}</p> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    getTotal () {
      return this.total
    },
    //一共展示多少页
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    },
    startAndEnd () {
      let start = 0, end = 0;
      let { pageNo, pageSize, total, continues, totalPage } = this;
      //如果总页数小于连续页码数
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        //正常情况，分页器总页数大于连续页码数
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //约束starts  end 在合理范围内
        if (start < 1) {
          start = 1;
          end = continues
        }

        //约束尾部
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }

      return { start, end }
    }
  }
}
</script>
<style lang="less">
.page {
  width: 733px;
  height: 66px;
  overflow: hidden;
  float: right;

  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      width: 520px;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        // &.active {
        //   a {
        //     background-color: #fff;
        //     color: #e1251b;
        //     border-color: #fff;
        //     cursor: default;
        //   }
        // }

        .active {
          background: skyblue;
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      float: right;
      width: 200px;
    }
  }
}
</style>