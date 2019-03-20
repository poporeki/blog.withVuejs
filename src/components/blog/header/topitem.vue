<template>
<transition enter-active-class="animated fadeInRight">
  <div class="top-box-wrapper" v-if='isShow'>
    <transition enter-active-class="animate-shrinkIn" leave-active-class="animate-shrinkOut">
      <Login v-if="isShowLogin" v-on:isClose="isLoginClose"></Login>
    </transition>
    <transition enter-active-class="animated fadeInRight">
      <div class="box-inner" v-if="!this.$store.state.isLogin">

        <div class="link-box">
          <a href="javascript:void(0);" @click="isShowLogin=true;">登陆</a>
        </div>
        <div class="link-box">
          <router-link to="/reg">注册</router-link>
        </div>
      </div>
    </transition>
    <transition enter-active-class="animated fadeInRight">
      <div class="box-inner" v-if="this.$store.state.isLogin">
        <div class="link-box" v-if="1">
          <a href="javascript:void(0);" @click="logout">控制台</a>
        </div>
        <div class="link-box">
          <a href="javascript:void(0);" @click="logout">退出登录</a>
        </div>
      </div>
    </transition>

  </div>

</transition>
</template>

<style lang="scss">
.top-box-wrapper {
  position: relative;
  padding: 5px 0;

  .box-inner {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .link-box{
    padding: 3px 0;
    >a{
      padding: 0 10px;
      font-size: .26rem;
    }
    &:nth-child(even) {
      >a {
        border-left: 1px solid rgb(139, 139, 139);
      }
    }
  }
  .box {
    position: relative;
    width: 50px;
    height: 20px;
    box-sizing: border-box;

    &:nth-child(even) {
      >a {
        border-left: 1px solid rgb(139, 139, 139);
      }
    }

    >a {
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      line-height: 20px;
      font-size: 12px;
      text-align: center;

      >p {
        position: absolute;
        margin: 0;
        padding: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

.animate-shrinkIn {
  animation: shrink 0.5s;
}

.animate-shrinkOut {
  animation: shrink 0.5s reverse;
}

@keyframes shrink {
  0% {
    opacity: 0;
    transform: scale(5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

<script>
import Login from "../login";
export default {
  data() {
    return {
      isShowLogin: false,
      isLogout: false,
      isShow: false
    };
  },
  methods: {
    logout() {
      let _this = this;
      this.$axios
        .post("http://localhost:3000/logout")
        .then(({
          data
        }) => {
          data.status ? (_this.$store.state.isLogin = false) : "";
        });
    },
    isLoginClose(data) {
      if (data === true) {
        this.isShowLogin = false;
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  components: {
    Login
  },
  mounted() {
    this.isShow = true;
  }
};
</script>
