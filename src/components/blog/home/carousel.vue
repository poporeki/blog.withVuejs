<template>
<div>
  <Loading :isLoading='isRequest'></Loading>
  <transition-group enter-active-class="animated fadeInLeft">
    <swiper v-if="isShow" :options="swiperOption" ref="swiper_homeCarousel" class="banner" :key="Math.random()">
      <swiper-slide v-for="item in carouData" :key="item.id">
        <a :href="'/blog/article/'+item.id">
            <h3>{{item.title}}</h3>
            <img :src='item.imgSrc!==""?item.imgSrc:""' onerror="this.src='/images/exp.png'" alt="空白">
          </a>
      </swiper-slide>
      
      <div class="swiper-pagination s-p-custom" slot="pagination"></div>
      <div class="swiper-button-prev btn-page" slot="button-prev"></div>
      <!--左箭头-->
      <div class="swiper-button-next btn-page" slot="button-next"></div>
      <!--右箭头-->
    </swiper>
  </transition-group>
</div>
</template>

<style lang="scss">
@import "../../../assets/scss/mixins/_set-color.scss";
.swiper-button-next,.swiper-button-prev{
  background-image: none;
}
.swiper-button-prev, .swiper-button-next{
  height: 70px;
}
.btn-page{
  &:after,&:before{
    content:'';
    position:absolute;
    height:50%;
    width:3px;
    transition:transform .3s ease;
    background-color:#007aff;
  }
  &:before{
    top:0;
    transform-origin: center bottom;
  }
  &:after{
    bottom: 0;
    transform-origin: center top;
  }
}
.swiper-button-prev.btn-page{
  &:after,&:before{
    right: left;
  }
  &:hover{
    &:after{
      transform: rotate(-45deg);
    }
    &:before{
      transform: rotate(45deg);
    }
  }
}
.swiper-button-next.btn-page{
  &:after,&:before{
    right: 0;
  }
  &:hover{
    &:after{
      transform: rotate(45deg);
    }
    &:before{
      transform: rotate(-45deg);
    }
  }
}
.banner {
  height: 100%;
  
  .swiper-slide {
    background-color: $color-bg;
    height: 100%;
    >a {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  min-height:300px;
}
  }
}

.swiper-slide>a>img {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.swiper-slide>a>h3 {
  position: absolute;
  display: inline-block;
  width: 100%;
  left: 0;
  bottom: 0;
  margin: 0 0 15px;
  padding: 5px;
  color: #fff;
  font-size: 0.35rem;
  background-color: #000;
  text-shadow: 0 0 5px #000;
  z-index: 1;
}

.s-p-custom {
  text-align: right;
  bottom: 0 !important;
}

.swiper-pagination-bullet {
  padding: 2px;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  transition: background .5s ease;
}
</style>

<script>
import Loading from "../../loadingAnimate_cro";
import "swiper/dist/css/swiper.css";
import {
  swiper,
  swiperSlide
} from "vue-awesome-swiper";
export default {
  data() {
    return {
      isRequest: true,
      swiperOption: {
        autoplay: 3000,
        speed: 1000,

        notNextTick: true,
        mousewheel: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            let text = '';
            switch (index) {
              case 0:
                text = '壹';
                break;
              case 1:
                text = '贰';
                break;
              case 2:
                text = '叁';
                break;
              case 3:
                text = '肆';
                break;
              case 4:
                text = '伍';
                break;
              case 5:
                text = '陆';
                break;
              case 6:
                text = '柒';
                break;
              case 7:
                text = '捌';
                break;
              case 8:
                text = '玖';
                break;
              case 9:
                text = '拾';
                break;
            }
            return '<span class="' + className + '">' + text + '</span>';
          }
        }
      },
      isShow: false,
      carouData: {}
    };
  },
  methods: {
    getData() {
      let _this = this;
      this.$axios
        .get("https://www.yansk.cn/api/v1/getCarousel", {
          by: {
            type: 1213123131312312
          }
        })
        .then(({
          data
        }) => {
          _this.isRequest = false;
          _this.carouData = data.data;
          console.log(data);
          _this.isShow = true;
        });
    }
  },
  computed: {
    swiper() {
      return this.$refs.swiper_homeCarousel.swiper;
    }
  },
  components: {
    Loading,
    swiper,
    swiperSlide
  },
  created() {
    this.getData();
  }
};
</script>
