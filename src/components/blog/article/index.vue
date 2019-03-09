<template>
  <div>
    <transition enter-active-class="animated fadeInUp">
      <section class="article-wrapper" v-if='isShow'>
        <bread-crumb :arcid='articleData.arcInfo.id' :arctitle="articleData.arcInfo.title" :typename="articleData.arcInfo.type.name"></bread-crumb>

        <article-content :artinfo='articleData'></article-content>
        <div class="line"></div>
        <article-comment :arcId="articleData.arcInfo.id" :toComment='isToComment' :artTotal="articleData.commsTotal" :artComms="articleData.arcComms"></article-comment>
      </section>
    </transition>
  </div>
</template>
<style lang="scss">
section.article-wrapper {
  position: relative;
  width: 90%;
  max-width: 1190px;
  margin-bottom: 200px;
  margin: 0 auto;
}
</style>

<script>
import Loading from "../../../views/Loading";
import BreadCrumb from "./BreadcrumbItem";
import ArticleContent from "./ArcConItem";
import ArticleComment from "./CommentItem";
export default {
  data() {
    return {
      isShow: false,
      isToComment: false,
      articleData: {},
      articleInfo:{}
    };
  },
  components: {
    Loading,
    BreadCrumb,
    ArticleContent,
    ArticleComment
  },
  methods: {
    getArticle() {
      let that = this;
      this.$axios
        .get("https://www.yansk.cn/api/v1/article/get/" + this.arcid)
        .then(({ data }) => {
          let datas=data.data;
          if (data.status && data.code === 404) {
            that.$router.replace({
              path: "/404"
            });
            return;
          }
          that.isShow = true;
          that.isComment();
          that.articleData = datas;
        });
    },
    isComment() {
      this.$route.hash === "#comment" ? (this.isToComment = true) : "";
    }
  },
  computed: {
    arcid() {
      return this.$route.params.arcid;
    }
  },
  created() {
    this.getArticle();
  }
};
</script>

