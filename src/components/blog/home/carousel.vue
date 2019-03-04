<template>
  <div>
    <Loading :isLoading='isRequest'></Loading>
    <transition enter-active-class="animated fadeInLeft">

      <swiper v-if="isShow" :options="swiperOption" ref="swiper_homeCarousel" class="banner">
        <swiper-slide v-for="item in carouData" :key="item.id">
          <a :href="'/blog/article/'+item.id">
            <h3>{{item.title}}</h3>
            <img :src='item.imgSrc!==""?item.imgSrc:""' alt="空白">
          </a>
        </swiper-slide>
        <div class="swiper-pagination s-p-custom" slot="pagination"></div>
      </swiper>
    </transition>
  </div>

</template>
<style lang="scss" >
@import "../../../assets/scss/mixins/_set-color.scss";

.banner {
  max-height: 400px;
  min-height: 200px;
  height: 40vw;
}

.swiper-slide {
  background-color: $color-bg;
}
.swiper-slide > a {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}
.swiper-slide > a > img {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.swiper-slide > a > h3 {
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
  background-color: #d36d28;
  border-radius: 0;
}
</style>

<script>
import Loading from "../../loadingAnimate_cro";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      isRequest: true,
      swiperOption: {
        autoplay: 3000,
        speed: 1000,

        notNextTick: true,
        mousewheel: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      isShow: false,
      carouData: {}
    };
  },
  methods: {
    getData() {
      console.log("getCarousel");
      let _this = this;
      this.$axios
        .get("https://www.yansk.cn/api/v1/getCarousel", {
          by: {
            type: 1213123131312312
          }
        })
        .then(({ data }) => {
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

