<template>
	<div>
		<loading-item></loading-item>
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
	import BreadCrumb from "./BreadcrumbItem";
	import ArticleContent from "./ArcConItem";
	import ArticleComment from "./CommentItem";
	import LoadingItem from "@/components/loading/Loading_03";
	export default {
		data() {
			return {
				isShow: false,
				isRequest: false,
				isToComment: false,
				articleData: {},
				articleInfo: {}
			};
		},
		components: {
			BreadCrumb,
			ArticleContent,
			ArticleComment
		},
		methods: {
			getArticle() {
				that.isRequest = false;
				let that = this;
				this.$axios
					.get("/api/v1/article/get/" + this.arcid)
					.then(({ data }) => {
						that.isRequest = true;
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
						that.isRequest = true;
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

