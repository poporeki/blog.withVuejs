<template>
	<div class="wrapper">
		<div class="title">
			<h2 class="list-tit">
				<small>文章列表</small>
			</h2>
		</div>
		<common-item :requestUrl="requestUrl"></common-item>
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
				originalRequestUrl: "/blog/articlelist"
			};
		},
		methods: {},
		components: {
			CommonItem
		},
		created() {
			this.requestUrl = encodeURIComponent(this.originalRequestUrl);
		}
	};
</script>

