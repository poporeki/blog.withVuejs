<template>
  <transition enter-active-class="animated flipInX">
    <div class="rt" v-if="isShow">
      <div class="s-wrap" @mouseout="hideFn">
        <div :class="{'search-box':true,'show':searchBoxIsShow}" @mouseover="searchBoxIsShow=true" id="search_box">
          <div class="s-btn"></div>
          <div class="input-box">
            <Loading :isLoading="isRequest"></Loading>
            <input type="text" class="search" v-model="keywords" @focus="inputFocus" @blur="inputBlur();hideFn()" placeholder="search" @keyup="getSearchData">
            <div class="msg-box"></div>
          </div>
        </div>
        <div :class="{dropdown:true, 'search-dropdown':true, hide:dropDownIsShow===false,show:dropDownIsShow}">

          <div v-if='dropDownIsShow'>
            <ul>
              <li v-for="item in searchData" :key='item.id'>
                <a class="arc-lk" :href="'/blog/article/' + item._id "> {{item.title}} </a>
              </li>
              <li v-if="searchData===undefined||Object.keys(searchData).length===0">
                <p>没有查询到与<span class="highlight">{{keywords}}</span>相关的信息</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.highlight {
  color: rgb(255, 166, 0);
  &:after,
  &::before {
    content: " ";
  }
}
p {
  padding: 0 5px;
  text-align: center;
  word-break: break-all;
  color: #000;
}
</style>

<script>
import Loading from "./search_loading";

export default {
  data() {
    return {
      isShow: false /* 页面显示状态 */,
      isFocus: false /* input是否得到焦点 */,
      keywords: "" /* 搜索字符 */,
      searchBoxIsShow: false /* 搜索栏状态 */,
      dropDownIsShow: false /* 搜索栏下拉菜单状态 */,
      searchData: {} /* 搜索数据 */,
      isRequest: false /* 请求状态 */,
      isRequestError: false
    };
  },
  components: {
    Loading /* ajax请求等待动画 */
  },
  methods: {
    /* 判断隐藏搜索框 */
    hideFn() {
      console.log("搜索栏 鼠标移出");
      let kws = this.keywords;
      if (!this.isFocus && kws === "") {
        this.searchBoxIsShow = false;
        this.dropDownIsShow = false;
        this.searchData = {};
      }
    },
    /* 得到焦点 */
    inputFocus() {
      this.isFocus = true;
    },
    /* 失去焦点 */
    inputBlur() {
      this.isFocus = false;
    },
    /* 根据输入信息获取搜索数据 */
    getSearchData() {
      /* 是否处于请求中 如果true则返回*/
      if (this.isRequest) return;
      /* 当输入内容为空时隐藏下拉框 */
      if (this.keywords === "") {
        this.dropDownIsShow = false;
        return;
      }
      const that = this;
      this.isRequest = true;
      this.$axios
        .post("https://www.yansk.cn/blog/search/like", {
          wd: this.keywords /* 键入文本 */,
          isGlobalLoading: false /* axios拦截>全局Loading关闭 */
        })
        .then(({ data }) => {
          let ds = data.data;
          that.dropDownIsShow = true;
          that.searchData = ds;
          that.isRequest = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    /* 渲染完毕后显示 */
    this.isShow = true;
  }
};
</script>

