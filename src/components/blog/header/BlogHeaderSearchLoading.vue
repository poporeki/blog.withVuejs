<template>
  <div v-if="isLoading" class="loading-ani-searchlike">

  </div>
</template>
<style lang="scss">
.loading-ani-searchlike {
  position: absolute;
  height: 2px;
  width: 100%;
  left: 0;
  top: 0;
  padding-right: 50px;
  box-sizing: border-box;
  transform: scale(0);
  animation: inputLoadAni 1s infinite;
  background-color: #000;
}

@keyframes inputLoadAni {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
    background-color: rgb(131, 131, 131);
  }

  100% {
    transform: scale(0);
  }
}
</style>
<script>
export default {
  props: ["isLoading"]
};
</script>

