<template>
  <div class="wrapper">
    <div class="title">
      <h2 class="list-tit">
        <small>文章列表</small>
      </h2>
    </div>
    <common-item :requestUrl='requestUrl'></common-item>
  </div>
</template>
<style lang="scss">
.list-tit {
  small {
    color: rgb(255, 255, 255);
    background-color: #000;
  }
}
</style>

<script>
import CommonItem from "./CommonItem";
export default {
  data() {
    return {
      dataComplete: false,
      artclist: {},
      requestUrl: false,
      originalRequestUrl: "https://www.yansk.cn/blog/articlelist"
    };
  },
  methods: {},
  components: {
    CommonItem
  },
  created() {
    console.log("列表");
    let query = "";
    let path = this.$route.fullPath;
    if (path.split("?")[1]) {
      query = path.split("?")[1];
    }

    this.requestUrl = this.originalRequestUrl + "?" + query;
    let a = true;
  }
};
</script>

