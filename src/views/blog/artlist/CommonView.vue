<template>
	<div class="wrapper">
		<div class="title">
			<h3 class="list-tit" v-if="title!==''&&title!==undefined">
				<small>有关</small>
				{{title}}
				<small>的</small>
				<small>文章</small>
			</h3>
			<h3 class="list-tit" v-if="title===''||title===undefined">所有文章</h3>
		</div>
		<common-item :requestUrl="originalRequestUrl" :title.sync="title"></common-item>
	</div>
</template>

<script>
	import CommonItem from "@/components/blog/articlelist/ArticleListCommon";
	export default {
		data() {
			return {
				dataComplete: false,
				title: "",
				artclist: {},
				requestUrl: false,
				originalRequestUrl: "/api/v1/articlelist/getlist"
			};
		},
		components: {
			CommonItem
		}
	};
</script>

<style lang="scss">
	.list-tit {
		display: inline-block;

		small {
			font-weight: normal;
			color: rgb(255, 255, 255);
			border-bottom: 3px solid rgb(206, 120, 23);
		}
	}
</style>
