<template>
	<section class="section-right">
		<item-tags></item-tags>
		<item-commtop></item-commtop>
		<item-log></item-log>
	</section>
</template>

<script>
	import itemTags from "./BlogHomeSectionRightTagsList";
	import itemCommtop from "./BlogHomeSectionRightTopComment";
	import itemLog from "./BlogHomeSectionRightUpdateLog";
	export default {
		components: {
			itemTags,
			itemCommtop,
			itemLog
		}
	};
</script>

<style lang="scss" scoped>
	.section-right {
		padding-left: 10px;
		flex-basis: 20%;
		box-sizing: border-box;
		@media (max-width: 768px) {
			& {
				order: -1;
			}
		}
	}
</style>
