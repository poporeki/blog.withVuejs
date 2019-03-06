<template>
  <parallax class="backgs">
    <img src="/images/bg-1.jpg" alt="very cool bg">
  </parallax>
</template>
<style lang="scss">
.backgs{
  transform: translateZ(-2px);
}
</style>

<script>
  import Parallax from 'vue-parallaxy'
  export default {
    components: {
      Parallax
    }
  }
</script>