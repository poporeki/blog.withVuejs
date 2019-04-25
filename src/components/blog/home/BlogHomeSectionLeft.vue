<template>
	<div class="section-list">
		<new-articlelist></new-articlelist>
		<slot></slot>
	</div>
</template> 	

<script>
	import NewArticlelist from "@/components/blog/home/BlogHomeSectionLeftNewArticleList";
	export default {
		components: {
			NewArticlelist
		}
	};
</script>

<style lang="scss" scoped>
	.section-list {
		position: relative;
		flex-basis: 80%;
		min-height: 200px;
		animation: translateXToRight 1s forwards;
		font-size: 0.28rem;
		> .title {
			> a {
				color: #000;
				background-color: #fff;
				font-size: 0.6em;
			}
		}
	}
</style>
