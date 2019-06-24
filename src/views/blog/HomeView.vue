<template>
	<div class="wrapper">
		<item-hottop></item-hottop>
		<item-classify></item-classify>
		<item-weather></item-weather>
		<div class="sections-wrapper">
			<item-left>
				<item-tools></item-tools>
			</item-left>
			<item-right></item-right>
		</div>
	</div>
</template>
<style lang="scss">
	.sections-wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		@media (max-width: 768px) {
			& {
				flex-direction: column;
			}
		}
	}
</style>

<script>
	import TopItem from "@/components/blog/home/BlogHomeTop";
	import Classify from "@/components/blog/home/BlogHomeClassify";
	import Weather from "@/components/blog/home/BlogHomeWeather";
	import SectionLeft from "@/components/blog/home/BlogHomeSectionLeft";
	import SectionRight from "@/components/blog/home/BlogHomeSectionRight";
	import Tools from "@/components/blog/home/BlogHomeSectionLeftTools";
	export default {
		components: {
			"item-hottop": TopItem,
			"item-classify": Classify,
			"item-weather": Weather,
			"item-left": SectionLeft,
			"item-tools": Tools,
			"item-right": SectionRight
		}
	};
</script>

