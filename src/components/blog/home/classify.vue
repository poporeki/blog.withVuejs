<template>
<section class="classify">
    <div class="lt"><h2 class="title">分类</h2></div>
    <div class="rt">
      <transition-group tag="div" class="rt" name="classify" enter-active-class="animated fadeInDown">
      <div class="classify-item" v-for="item in typelist" :key="item.typeID">
        <a class="type-lk" :href="'/blog/articlelist?by[type_id]='+item.typeID">
          <i :class='"iconfont icon-"+item.typeIconName'></i>
          <i :class='"iconfont bottom icon-"+item.typeIconName'></i>
          <p>{{item.typeName}}</p>
        </a>
      </div>
      </transition-group>
    </div>
  </section>
</template>
<style lang="scss">
@import "../../../assets/scss/mixins/_set-color.scss";
section.classify {
  position: relative;
  width: 100%;
  min-width: 100px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  .lt {
    margin-right: 15px;
    align-self: center;

    .title {
      word-wrap: break-word;
      letter-spacing: 20px;
      width: 20px;
    }
  }

  .rt {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .classify-item {
    position: relative;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    flex-grow: 1;
    height: 200px;
    min-width: 90px;
    margin: 2.5px;
    margin-bottom: 20px;
    border-radius: $bor-radius;
    box-sizing: border-box;
    box-shadow: 2px 2px 10px #000;
    background-color: $color-block-wrap;
    transition: transform .3s ease, background-color .3s ease;
    overflow: hidden;

    &:hover {
      background-color: $color-lk-font;
      transform: translateY(-5px);
    }

    a.type-lk {
      position: relative;
      display: block;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;

      &:hover {
        .iconfont {
          color: $color-block-wrap;
          transform: translateY(-100%);
        }

        .iconfont.bottom {
          color: $color-block-wrap;
          transform: translateY(0);
        }

        >p {
          background-color: $color-block-hover;
        }
      }

      .iconfont {
        font-size: 50px;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 50%;
        margin-top: -40px;
        color: $color-lk-font;
        box-sizing: border-box;
        text-shadow: 2px 2px 5px rgba(51, 51, 51, 0.384);
        transition: transform .3s ease-in, color .3s ease;

        &.bottom {
          transform: translateY(100%);
          color: $color-lk-font;
        }
      }

      >p {
        position: absolute;
        width: 100%;
        padding: 10px;
        left: 0;
        margin: 0;
        bottom: 0;
        font-size: .3rem;
        color: $color-lk-bgcolor;
        background-color: $color-black;
        box-sizing: border-box;
        text-align: center;
        letter-spacing: 5px;
        transition: color .5s ease;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      typelist: {}
    };
  },
  methods: {
    getTypeList() {
      let _this = this;
      this.$axios
        .get("http://localhost:3000/api/v1/getarctypes")
        .then(({ data }) => {
          _this.typelist = data;
        });
    }
  },
  created() {
    this.getTypeList();
  }
};
</script>
