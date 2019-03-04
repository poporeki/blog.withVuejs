<template >
  <div>
    <div class="tit">
      <h2>热门</h2>
    </div>
    <Loading :isLoading="isRequest"></Loading>
    <transition enter-active-class="animated fadeInRight">
      <swiper v-if="isShow" class="hot-list" :options="swiperOption" ref="swiper_hotTop">
        <swiper-slide class="hot-list-item" v-for="item in topData" :key="item.id">
          <a :href="'/blog/article/' + item.artid" class="hot-lk">
            <span class="lt">
              <img :src="item.previewImage ? item.previewImage : '/images/exp.png'" alt="images">
            </span>
            <span class="rt p10">
              <div class="art-tit">{{item.title}}</div>
              <div class="art-info">
                <div class="read"><i class="iconfont bottom icon-read"></i>{{item.read}}</div>
                <div class="time">{{item.timeCreate}}</div>
              </div>
            </span>
          </a>
        </swiper-slide>
        <div class="swiper-scrollbar"></div> <!-- 滚动条 -->
      </swiper>
    </transition>

  </div>
</template>
<style lang="scss" scoped>
@import "../../../assets/scss/mixins/_set-color.scss";

.hot-list {
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;

  .swiper-slide {
    background-color: transparent;
  }

  .hot-list-item {
    animation: scaleIn_2x 0.3s ease;

    &:hover {
      .hot-lk {
        background-color: $highlight-color-block-wrap;
      }
    }

    .hot-lk {
      position: relative;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      border-radius: 4px;
      background-color: $color-block-wrap;
      transition: background-color 0.3s ease;
      overflow: hidden;

      > span {
        display: block;
      }

      .lt {
        position: relative;
        display: block;
        height: 100%;
        width: 30%;
        background-color: rgb(68, 68, 68);
        box-sizing: border-box;
        overflow: hidden;

        img {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
        }
      }

      .rt {
        display: flex;
        width: 70%;
        word-wrap: break-word;
        flex-direction: column;
        justify-content: flex-start;
        align-content: space-around;
        font-size: 12px;

        .art-tit {
          box-sizing: border-box;

          word-wrap: break-word;
          overflow: hidden;
        }

        .art-info {
          flex-grow: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;

          .read {
            display: flex;
            flex-direction: row;
            color: $color-gray;
          }

          .time {
            color: $color-gray;
          }
        }
      }
    }
  }
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
        autoplay: 5000,
        notNextTick: true,
        mousewheel: true,
        direction: "vertical",
        slidesPerView: 3,
        spaceBetween: 10,
        scrollbar: {
          el: ".swiper-scrollbar",
          draggable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          }
        }
      },
      isShow: false,
      topData: {}
    };
  },
  methods: {
    getData() {
      let _this = this;
      this.$axios
        .get("https://www.yansk.cn/api/v1/article/gettop")
        .then(({ data }) => {
          _this.isRequest = false;
          _this.topData = data.data;
          _this.isShow = true;
          console.log(`热点：${data.data}`);
        });
    }
  },
  components: {
    swiper,
    swiperSlide,
    Loading
  },
  computed: {
    swiper() {
      return this.$refs.swiper_hotTop.swiper;
    }
  },
  created() {
    this.getData();
  }
};
</script>

