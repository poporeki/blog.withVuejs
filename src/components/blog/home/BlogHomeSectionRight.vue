<template>
	<section class="section-right-container">
		<item-tags></item-tags>
		<item-commtop class="section-right-item"></item-commtop>
		<item-log class="section-right-item"></item-log>
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
	.section-right-container {
		padding-left: 10px;
		flex-basis: 20%;
		box-sizing: border-box;
		@media (max-width: 768px) {
			& {
				order: -1;
			}
		}
		.section-right-item {
			margin-top: 1rem;
		}
	}
</style>
