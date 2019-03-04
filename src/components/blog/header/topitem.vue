<template>
  <transition enter-active-class="animated fadeInRight">
    <div class="top-box" v-if='isShow'>
      <transition enter-active-class="animate-shrinkIn" leave-active-class="animate-shrinkOut">
        <Login v-if="isShowLogin" v-on:isClose="isLoginClose"></Login>
      </transition>
      <transition enter-active-class="animated fadeInRight">
        <div class="login-before" v-if="!this.$store.state.isLogin">

          <div class="link-box">
            <a href="javascript:void(0);" @click="isShowLogin=true;">登陆</a>
          </div>
          <div class="link-box">
            <router-link to="/reg">注册</router-link>
          </div>
        </div>
      </transition>
      <transition enter-active-class="animated fadeInRight">
        <div class="login-after" v-if="this.$store.state.isLogin">
          <div class="link-box">
            <a href="javascript:void(0);" @click="logout">退出登录</a>
          </div>
        </div>
      </transition>

    </div>

  </transition>
</template>
<style lang="scss">
.top-box {
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  flex-direction: row;
  .login-before,
  .login-after {
    display: flex;
    flex-direction: row;
  }
  .link-box {
    position: relative;

    &:nth-child(even) {
      > a {
        border-left: 1px solid rgb(139, 139, 139);
      }
    }
    > a {
      display: block;
      padding: 2px 5px;
      left: 0;
      top: 0;
      font-size: 0.12rem;
      text-align: center;
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

      console.log("logout");
      this.$axios
        .post("https://www.yansk.cn/logout")
        .then(({ data }) => {
          console.log("logout success");
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
