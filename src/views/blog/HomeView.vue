<template>
	<div class="wrapper">
		<item-hottop></item-hottop>
		<item-classify></item-classify>
		<item-weather></item-weather>
		<div class="sections-wrapper">
			<item-newarts></item-newarts>
			<item-right></item-right>
			<item-tools></item-tools>
		</div>
	</div>
</template>
<style lang="scss">
	h2 {
		font-size: 0.35rem;
	}
	.sections-wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		@media (max-width: 768px) {
			& {
				flex-direction: column;
			}
		}
	}
</style>

<script>
	import TopItem from "@/components/blog/home/topitem";
	import Classify from "@/components/blog/home/classify";
	import Weather from "@/components/blog/home/weather";
	import secArticle from "@/components/blog/home/newtop";
	import secRight from "@/components/blog/home/sectionRight";
	import Tools from "@/components/blog/home/Tools";
	export default {
		components: {
			"item-hottop": TopItem,
			"item-classify": Classify,
			"item-weather": Weather,
			"item-newarts": secArticle,
			"item-tools": Tools,
			"item-right": secRight
		}
	};
</script>

