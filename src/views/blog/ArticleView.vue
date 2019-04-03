<template>
	<div>
		<loading-item :isLoading="isRequest"></loading-item>
		<transition enter-active-class="animated fadeInUp">
			<section class="article-wrapper" v-if="isShow">
				<bread-crumb
					:arcid="articleData.arcInfo.id"
					:arctitle="articleData.arcInfo.title"
					:arctype="articleData.arcInfo.type"
				></bread-crumb>

				<article-content :artinfo="articleData"></article-content>
				<div class="line"></div>
				<article-comment
					:arcId="articleData.arcInfo.id"
					:toComment="isToComment"
					:artTotal="articleData.commsTotal"
					:artComms="articleData.arcComms"
				></article-comment>
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
	import BreadCrumb from "@/components/blog/article/BreadcrumbItem";
	import ArticleContent from "@/components/blog/article/ArcConItem";
	import ArticleComment from "@/components/blog/article/CommentItem";

	import LoadingItem from "@/components/loading/Loading_global";
	export default {
		data() {
			return {
				isShow: false,
				isToComment: false,
				isRequest: false,
				articleData: {},
				articleInfo: {}
			};
		},
		components: {
			BreadCrumb,
			ArticleContent,
			ArticleComment,
			LoadingItem
		},
		methods: {
			getArticle() {
				let that = this;
				that.isRequest = true;
				this.$axios
					.get("/api/v1/article/get/" + this.arcid)
					.then(({ data }) => {
						that.isRequest = false;
						let datas = data.data;
						if (
							data.status === undefined ||
							data.code === 404 ||
							data.status === 0 ||
							data.status === false
						) {
							that.$router.replace({
								path: "/404"
							});
							return;
						}
						that.isShow = true;
						that.isComment();
						that.articleData = datas;
					})
					.catch(() => {
						this.isRequest = false;
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

