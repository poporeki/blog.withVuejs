<template>
  <div class="wrapper">
    <div :class="{'login-box':true,success:success}">
      <div class="dog">
        <img src="/images/login_pic.png" alt="">
      </div>
      <div class="inner">
        <form action="/login" method="post" class="login-form">
          <h2>登录</h2>
          <div class="control">
            <input type="text" v-model="username" @focus="tipsUp" class="form-control" @blur="tipsUp" autocomplete="off" maxlength="14" name="uname" id="username">
            <div class='input-tips'>
              <i class="iconfont icon-head"></i>
              <span>输入用户名</span>
            </div>
          </div>
          <div class="control">
            <input type="password" v-model="password" @blur="tipsUp" @focus="tipsUp" class="form-control" maxlength="16" name="upwd" id="upassword">
            <div class="input-tips">
              <i class="iconfont icon-password"></i>
              <span>输入密码</span>
            </div>
          </div>
          <div class="login-btn-box">
            <input @click.enter='login' type="button" id="login_btn" class="login-btn" value="登录">
            <span :class="{'status-block':true,show:show,logining:logining,success:success,error:err,hide:hide}">
              {{msg}}
              <div v-if='logining' v-show="logining" class="loading-ani"></div>
            </span>
          </div>
        </form>
        <div class="copyright">By Yansk</div>
        <a href="/" class="back-btn">返回主页</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@font-face {
  font-family: "iconfont";

  src: url("data:application/x-font-woff;charset=utf-8;base64,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")
    format("woff");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-toys:before {
  content: "\e6e1";
}

.icon-head:before {
  content: "\e70b";
}

.icon-password:before {
  content: "\e82b";
}
body {
  background: linear-gradient(rgb(36, 36, 36), rgb(0, 0, 0));
  position: relative;
  color: #fff;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1500px;
  -webkit-perspective: 1500px;
  transform-style: preserve-3d;
}

.loading-ani {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(48, 48, 48, 0.582);
  &:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 0 5px #fff;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    animation: subLoadAni 2s 200ms infinite;
  }
  @keyframes subLoadAni {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
}

/* --------------login-box-------------- */

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: loginbox_in 1s forwards;
  backface-visibility: hidden;
  box-sizing: border-box;
  .dog {
    position: absolute;
    transform: scale(0);
    top: -19%;
    right: 0;
    height: 30%;
    animation: dog_in 1s 1s forwards;
    z-index: 10;
    > img {
      height: 100%;
    }
  }
  .copyright {
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 10;
    color: #444444;
    text-shadow: 0 0 5px rgb(66, 66, 66);
  }
  @keyframes dog_in {
    0% {
      transform: scale(0);
    }
    20% {
      transform: scale(1.1);
    }
    70% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes loginbox_in {
    0% {
      transform: translate(-50%, -50%) rotateY(180deg);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) rotateY(0);
    }
  }
  .inner {
    position: relative;
    transition: all 1s ease-out;
    border-radius: 2px;
    border-top: 4px solid rgba(243, 130, 0, 0.993);
    background-size: contain;
    background-position: right top;
    box-shadow: 0 0 10px rgb(77, 77, 77);
    box-sizing: border-box;
    z-index: 1;
    border-radius: 20px;
    overflow: hidden;
    .back-btn {
      position: absolute;
      width: 100%;
      height: 5vh;
      line-height: 5vh;
      top: 0;
      left: 0;
      color: #b8b8b8;
      letter-spacing: 4px;
      z-index: -1;
      text-align: center;
      text-decoration: none;
      white-space: 24px;
    }
  }
  &.success {
    .inner {
      animation-fill-mode: forwards;
      animation-delay: 0.5s;
      animation-duration: 1s;
      animation-name: loginBox_out;
    }
    .dog {
      animation: dog_out 0.5s forwards;
    }
  }
  @keyframes dog_out {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
  @keyframes loginBox_out {
    0% {
      transform: scale(1) rotateY(0);
      opacity: 1;
    }
    100% {
      transform: scale(2) rotateY(-180deg);
      opacity: 0;
    }
  }
  &:hover .clock-block {
    top: -10%;
  }
}

form.login-form {
  background-color: rgb(65, 65, 66);
  padding: 20px 100px;
  box-sizing: border-box;
  transition: transform 1s ease;
  h2 {
    font-size: 26px;
    color: rgb(190, 190, 190);
  }
  .control {
    position: relative;
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(73, 73, 73, 0.902);
    width: 200px;
    transition: border 0.3s ease;
    &.active {
      border-bottom: 1px solid rgba(146, 146, 146, 0.902);
      .input-tips {
        transform: translateY(-20px);
        font-size: 12px;
        .iconfont {
          transform: rotate(-45deg);
          font-size: 12px;
        }
      }
    }
    &,
    .input-tips {
      padding: 20px 10px 10px;
    }
    .input-tips {
      position: absolute;
      left: 0;
      top: 0;
      padding-left: 0;
      color: rgb(189, 189, 189);
      pointer-events: none;
      transition: transform 0.3s ease, font-size 0.3s ease;
      > .iconfont {
        display: inline-block;
        transition: transform 0.5s ease, font-size 0.3s ease;
      }
    }
    .form-control {
      display: block;
      position: relative;
      width: 100%;
      height: 20px;
      border: none;
      box-shadow: none;
      background-color: transparent;
      font-size: 14px;
      color: rgb(121, 121, 121);
      transition: border 0.3s ease;
      box-sizing: border-box;
      &:focus,
      &:hover,
      &:active {
        outline: none;
      }
    }
  }
  .login-btn-box {
    position: relative;
    width: 100%;
    margin: 40px 0 40px 2px;
    overflow: hidden;
    &:hover {
      &:after,
      &:before {
        transform: translateX(0%);
      }
    }
    &:before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      background-color: rgba(55, 77, 151, 0.712);
      transition: transform 0.2s ease;
      z-index: 0;
    }
    &:after {
      position: absolute;
      content: "";
      height: 100%;
      width: 5px;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      background-color: rgba(221, 168, 52, 0.712);
      transition: transform 0.2s ease 0.2s;
      z-index: 1;
    }
    input.login-btn {
      position: relative;
      border-radius: 2px;
      background-color: transparent;
      transition: all 0.3s ease;
      padding: 5px;
      height: 30px;
      width: 100%;
      border: 1px solid rgba(22, 124, 219, 0.363);
      color: rgba(22, 124, 219, 0.712);
      outline: none;
      cursor: pointer;
    }
    input.login-btn.error {
      background-color: rgb(187, 77, 3);
      color: rgb(247, 226, 170);
      border-color: rgb(179, 96, 41);
    }
    input.login-btn.success {
      background-color: #1abc9c;
      color: rgb(247, 226, 170);
    }
    .login-btn:hover {
      background-color: transparent;
      border-color: transparent;
      color: rgba(255, 255, 255, 0.712);
    }
    .status-block {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 30px;
      transition: background-color 0.5s ease;
      transform: translateY(-100%);
      &.show {
        animation: statusBlock_in 0.5s forwards;
      }
      &.logining {
        background-color: orange;
      }
      &.success {
        background-color: #1abc9c; // animation: statusBlock_out .5s 1s forwards;
      }
      &.error {
        background-color: rgb(189, 69, 60);
      }
      &.hide {
        animation: statusBlock_out 1s forwards;
      }
    }
    @keyframes statusBlock_in {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }
    @keyframes statusBlock_out {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-100%);
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      success: false,
      msg: "登陆中",
      err: false,
      logining: false,
      hide: false,
      show: false
    };
  },
  methods: {
    login() {
      let _this = this;
      if (this.show || this.hide) return;
      this.show = true;
      this.logining = true;
      this.$axios
        .post("https://www.yansk.cn/login", {
          uname: this.username,
          upwd: this.password,
          isGlobalLoading: false
        })
        .then(({ data }) => {
          console.log(11);
          _this.logining = false;
          let status = data.status;
          let msg = data.msg;
          if (status) {
            _this.success = true;
            this.goBack();
          } else {
            _this.err = true;
          }
          _this.msg = msg;
          setTimeout(() => {
            _this.msg = "";

            _this.success = false;
            _this.err = false;
            _this.hide = true;
            setTimeout(() => {
              _this.hide = false;
              _this.show = false;
            }, 1500);
          }, 2000);
        });
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    tipsUp(event) {
      console.log("focus");
      let type = event.type;
      let target = event.currentTarget;
      let parent = target.parentElement;
      if (type === "focus") {
        this.commonFn.addClass(parent, "active");
      } else if (type === "blur") {
        if (target.value === "") {
          this.commonFn.removeClass(parent, "active");
        }
      }
    }
  },
  computed: {}
};
</script>
