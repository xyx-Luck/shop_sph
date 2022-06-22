<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(banner, index) in list"
        :key="banner.id"
      >
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  props: ['list'],
  watch: {
    list: {
      handler (newval, oldval) {
        this.$nextTick(() => {
          var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: 500,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        })
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus"></style>