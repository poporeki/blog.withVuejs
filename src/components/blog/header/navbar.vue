<template>
<transition enter-active-class="animated flipInX">
  <ul class="navbar" v-if='isShow'>
    <li><a href="/blog">首页</a></li>
    <li v-for="(item,idx) in navlist" :key='idx'>
      <a :href='"/blog/articlelist?by[type_id]="+item._id'>{{item.type_name}}</a>
    </li>
    <li><a href="/iresume">个人简历</a></li>
  </ul>
</transition>
</template>

<style lang="scss" scoped>
@import "../../../assets/scss/mixins/_set-color.scss";

ul.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;

  li {
    a {
      position: relative;
      display: flex;
      flex-grow: 1;
      align-self: center;
      font-size: 0.35rem;
      font-weight: bold;
      padding: 15px 20px;
      margin: 0 10px;
      box-sizing: border-box;
      transition: color 0.3s ease;
      overflow: hidden;
      color: #fff;

      &:after,
      &:before {
        content: "";
        position: absolute;
        width: 20%;
        padding-top: 20%;
        border: 2px solid #000;
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }

      &:after {
        bottom: 0;
        right: 0;
        transform: translate(-50%, -50%);
        border-left-color: transparent;
        border-top-color: transparent;
      }

      &:before {
        top: 0;
        left: 0;
        transform: translate(50%, 50%);
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
    }

    &:hover {
      >a {
        color: $color-bg;

        &:after,
        &:before {
          transform: translate(0);
          opacity: 1;
        }
      }
    }
  }
}

@media (width: 360px) {
  .navbar {
    display: none !important;

    a {
      padding: 5px 15px !important;
    }
  }
}

@media (max-width: 768px) {

  .navbar {
    display: none !important;

    a {
      padding: 5px 15px !important;
    }
  }

}
</style>

<script>
export default {
  data() {
    return {
      isShow: false,
      navlist: []
    };
  },
  methods: {
    getNavbar() {
      let that = this;
      this.$axios
        .get('http://localhost:3000/api/v1/gethomenavbar')
        .then(({
          data
        }) => {
          that.navlist = data.data;
        })
    }
  },
  created() {
    this.getNavbar();
  },
  mounted() {
    this.isShow = true;
  }
};
</script>
