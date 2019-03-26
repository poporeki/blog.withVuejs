<template>
	<div class="wrapper">
		<item-hottop></item-hottop>
		<item-classify></item-classify>
		<item-weather></item-weather>
		<item-article></item-article>
		<item-tools></item-tools>
	</div>
</template>
<style lang="scss">
	h2 {
		font-size: 0.35rem;
	}
</style>

<script>
	import TopItem from "@/components/blog/home/topitem";
	import Classify from "@/components/blog/home/classify";
	import Weather from "@/components/blog/home/weather";
	import secArticle from "@/components/blog/home/sectionArticle";
	import Tools from "@/components/blog/home/Tools";
	export default {
		components: {
			"item-hottop": TopItem,
			"item-classify": Classify,
			"item-weather": Weather,
			"item-article": secArticle,
			"item-tools": Tools
		}
	};
</script>

