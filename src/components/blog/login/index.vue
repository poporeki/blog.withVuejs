<template>
  <div :class="{'login-wrapper':true,request:isProcess}">
    <div class="inner">
      <div class="login-box" @keyup.enter='submitForm()'>
        <div class="login-title">
          <h1>登陆</h1>
        </div>
        <div :class="{'form-control':true,error:isuError}">
          <input type="text" v-model="username" @focus="tipsUp" @blur="tipsUp" class="username">
          <div class="placeholder">
            <i class="iconfont icon-head"></i>
            <span>输入用户名</span>
          </div>
          <div class="tips"></div>
        </div>
        <div :class="{'form-control':true,error:ispError}">
          <input type="password" v-model="password" @focus="tipsUp" @blur="tipsUp" class="password">
          <div class="placeholder">
            <i class="iconfont icon-password"></i>
            <span>输入密码</span>
          </div>
          <div class="tips"></div>
        </div>
        <div class="form-control btn-login-box">
          <input @click='submitForm()' type="button" id="login_btn" class="btn-login" value="登录">
          <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
            <span v-if="msg!==''" :class="{' status-block':true,show:show,logining:logining,success:success,error:err,hide:hide}">
              {{msg}}
              <div v-if='logining' v-show="logining" class="loading-ani"></div>
            </span>
          </transition>
        </div>
      </div>
      <div :class="{'back-box':true,success:isSuccess,error:isError,loading:isRequest }">
        <div class="status-box loading" v-if="isRequest">
          登录中
          <div class="inner">
            <div class="k-line2 k-line12-1"></div>
            <div class="k-line2 k-line12-2"></div>
            <div class="k-line2 k-line12-3"></div>
            <div class="k-line2 k-line12-4"></div>
            <div class="k-line2 k-line12-5"></div>
            <div class="k-line2 k-line12-6"></div>
            <div class="k-line2 k-line12-7"></div>
            <div class="k-line2 k-line12-8"></div>
          </div>
        </div>
        <div class="status-box success" v-if='isSuccess'>
          <p>登陆成功</p>
        </div>
        <div class="status-box error" v-if='isError'>
          {{errorMsg}}
        </div>
      </div>
      <transition enter-active-class="fade" leave-active-class="fadeO">
        <div v-if="!isProcess" class="close-box" @click="theClose">
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  perspective: 1200px;
  left: 0;
  top: 0;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 100000;
  &.request {
    .login-box {
      transform: rotateY(180deg);
    }
    .back-box {
      transform: rotateY(0);
    }
  }
  .inner {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .login-box {
    min-height: 240px;
    min-width: 300px;
    padding: 15%;
    background-color: rgb(22, 95, 44);
    border-radius: 2px;
    box-shadow: 0 0 5px rgba(5, 5, 5, 0.329);
    backface-visibility: hidden;
    transition: transform 2s ease;
  }
  .back-box {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    backface-visibility: hidden;
    transform: rotateY(-180deg);
    transition: transform 2s ease, background-color 1.5s ease;
  }
  /* 关闭按钮 */
  .close-box {
    position: absolute;
    width: 10%;
    top: 0;
    right: 0;
    transform: rotate(45deg);
    cursor: pointer;
    &::after,
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      padding-top: 20%;
      background-color: #fff;
      transition: transform 0.5s ease;
    }
    &::before {
      transform: rotate(90deg);
    }
    &:hover {
      &::before {
        transform: rotate(105deg);
      }
      &::after {
        transform: rotate(-15deg);
      }
    }
  }
  .form-control {
    position: relative;
    margin: 10% 0 0;
    font-size: 0.26rem;
    &.active {
      .placeholder {
        span {
          color: rgb(209, 209, 209);
          transform: translate(-30%, -150%);
        }
      }
      input {
        border-bottom-color: #000;
      }
    }
    &.error {
      animation: emptyAnimate 1s;
      @keyframes emptyAnimate {
        0% {
          transform: translateX(0);
        }
        20% {
          color: red;
          transform: translateX(-10px);
        }
        40% {
          transform: translateX(10px);
        }
        60% {
          transform: translateX(-10px);
        }
        80% {
          transform: translateX(10px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }
  }
  .placeholder {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    i {
      margin-right: 5px;
    }
    span {
      transition: color 0.5s ease, transform 0.5s ease;
    }
  }
  input:not([type="button"]) {
    min-height: 40px;
    height: 100%;
    width: 100%;
    border: 0;
    padding-left: 20px;
    border-bottom: 1px solid rgba(212, 212, 212, 0.902);
    background-color: transparent;
    outline: none;
    box-sizing: border-box;
    transition: border 0.5s ease;
    &.active {
      border-bottom: 1px solid rgba(146, 146, 146, 0.902);
    }
  }
  .btn-login-box {
    position: relative;
    padding: 10% 0 0;
    .status-block {
      position: absolute;
      top: 0;
      left: 0;
      color: rgb(95, 152, 226);
    }
  }
  input.btn-login {
    width: 100%;
    padding: 5%;
    border: none;
    color: #fff;
    border-radius: 2px;
    box-shadow: 0 0 5px #000;
    background-color: rgb(15, 15, 15);
    cursor: pointer;
    &:hover {
      background-color: rgb(37, 37, 37);
    }
  }
}
.back-box {
  .status-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: inherit;
    transition: background-color 0.5s ease;
  }
  &.success {
    background-color: #4b9cdb;
  }
  &.error {
    color: #000;
    background-color: #db8c4b;
  }
  &.loading {
    background-color: rgba(0, 0, 0, 0.75);
  }
}
.status-box.loading {
  .inner {
    display: flex;
    flex-direction: row;
  }
  .k-line2 {
    display: inline-block;
    background: #666;
    height: 10px;
    width: 10px;
    opacity: 0;
    border-radius: 50%;
    transform: translateX(-300px);
    background-color: #4b9cdb;
  }
  .k-line12-1 {
    animation: k-loadingS 4s infinite;
    animation-delay: 0.8s;
  }
  .k-line12-2 {
    animation: k-loadingS 4s infinite;
    animation-delay: 0.7s;
  }
  .k-line12-3 {
    animation: k-loadingS 4s infinite;
    animation-delay: 0.6s;
  }
  .k-line12-4 {
    animation: k-loadingS 4s infinite;
    animation-delay: 0.5s;
  }
  .k-line12-5 {
    animation: k-loadingS 4s infinite;
    animation-delay: 0.4s;
  }
  .k-line12-6 {
    animation: k-loadingS 4s infinite;
    animation-delay: 0.3s;
  }
  .k-line12-7 {
    animation: k-loadingS 4s infinite;
    animation-delay: 0.2s;
  }
  .k-line12-8 {
    animation: k-loadingS 4s infinite;
    animation-delay: 0.1s;
  }
  @keyframes k-loadingS {
    40% {
      transform: translateX(0);
      opacity: 0.8;
    }
    100% {
      transform: translateX(300px);
      opacity: 0;
    }
  }
}
/* iconfont */
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
/* animate */
.fade {
  animation: fade 0.3s;
}
.fadeO {
  animation: fade 0.3s reverse;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      isuError: false,

      ispError: false,
      isProcess: false,
      isRequest: false,
      isSuccess: false,
      isError: false,
      errMsg: "",
      msg: "",
      err: false,
      logining: false,
      hide: false,
      show: false
    };
  },
  inject: ["reload"],
  methods: {
    tipsUp(event) {
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
    },
    theClose() {
      this.$emit("isClose", true);
    },
    isEmpty(centext, key) {
      let sas = key;
      if (this.msg !== "") return true;
      this[sas] = "内容不能为空";
      if (this.username !== "" && this.password !== "") return false;
      if (this.username === "") {
        this.isuError = true;
      }
      if (this.password === "") {
        this.ispError = true;
      }

      this.msg = "账号或密码不能为空";

      setTimeout(() => {
        this.msg = "";
      }, 3000);
      return true;
    },
    initForm() {
      const that = this;
      setTimeout(() => {
        if (that.isSuccess) {
          that.$router.go(0);

          // that.reload();
        }
        that.username = "";
        that.password = "";
        that.errorMsg = "";
        that.isProcess = false;
        that.isSuccess = false;
        that.isError = false;
      }, 3000);
    },
    submitForm() {
      if (this.isEmpty()) return;
      if (this.isProcess) return;
      this.isProcess = true;
      this.isRequest = true;
      const that = this;
      this.$axios
        .post("https://www.yansk.cn/login", {
          uname: this.username,
          upwd: this.password,
          isGlobalLoading: false
        })
        .then(({ data }) => {
          that.isRequest = false;
          if (data.status === true) {
            that.isSuccess = true;
          } else if (data.status === false) {
            that.isError = true;
            that.errorMsg = data.msg;
          }
          that.initForm();
        })
        .catch(() => {
          that.isError = true;
          that.errorMsg = "登录失败，请重试";
          that.isRequest = false;
          that.initForm();
        });
    }
  },
  watch: {
    isuError(value) {
      const that = this;
      if (value === true) {
        setTimeout(() => {
          that.isuError = false;
        }, 2000);
      }
    },
    ispError(value) {
      const that = this;
      if (value === true) {
        setTimeout(() => {
          that.ispError = false;
        }, 2000);
      }
    }
  }
};
</script>
