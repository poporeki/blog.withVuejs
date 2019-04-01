<template>
	<div class="wrapper">
		<div class="title">
			<h2 class="list-tit" v-if="title!==''&&title!==undefined">
				<small>有关</small>
				{{title}}
				<small>的</small>
				<small>文章</small>
			</h2>
			<h2 class="list-tit" v-if="title===''||title===undefined">所有文章</h2>
		</div>
		<common-item :requestUrl="requestUrl" :title.sync="title"></common-item>
	</div>
</template>
<style lang="scss">
	.list-tit {
		display: inline-block;
		border-bottom: 3px solid rgb(206, 120, 23);
		small {
			font-weight: normal;
			color: rgb(255, 255, 255);
		}
	}
</style>

<script>
	import CommonItem from "./CommonItem";
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
		methods: {},
		components: {
			CommonItem
		},
		created() {
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

