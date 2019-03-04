<template >
  <div v-if="isLoading" class="loading-center-absolute">
    <div class="object"></div>
    <div class="object"></div>
    <div class="object"></div>
    <div class="object"></div>
    <div class="object"></div>
    <div class="object"></div>
    <div class="object"></div>
    <div class="object"></div>
    <div class="object"></div>
    <div class="object"></div>
  </div>
</template>
<style lang="scss">
.loading-center-absolute {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 5%;
  min-height: 10px;
  max-height: 200px;
  width: 20%;
  min-width: 30px;
  transform: translate(-50%, -50%);
}
.object {
  width: 1.9%;
  height: 100%;
  margin-right: 0.1%;
  background-color: #fff;
  -webkit-animation: animate 1s infinite;
  animation: animate 1s infinite;
  float: left;
}

.object:last-child {
  margin-right: 0px;
}

.object:nth-child(10) {
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
.object:nth-child(9) {
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.object:nth-child(8) {
  -webkit-animation-delay: 0.7s;
  animation-delay: 0.7s;
}
.object:nth-child(7) {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.object:nth-child(6) {
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}
.object:nth-child(5) {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.object:nth-child(4) {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.object:nth-child(3) {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.object:nth-child(2) {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

@-webkit-keyframes animate {
  50% {
    -ms-transform: translateX(-25px) scaleY(2);
    -webkit-transform: translateX(-25px) scaleY(2);
    transform: translateX(-25px) scaleY(2);
  }
}

@keyframes animate {
  50% {
    -ms-transform: translateX(-25px) scaleY(2);
    -webkit-transform: translateX(-25px) scaleY(2);
    transform: translateX(-25px) scaleY(2);
  }
}
</style>

<script>
export default {
  props: ["isLoading"]
};
</script>

