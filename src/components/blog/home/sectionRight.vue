<template>
	<section class="section-right">
		<item-tags></item-tags>
		<item-commtop></item-commtop>
		<item-log></item-log>
	</section>
</template>
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

<script>
	import itemTags from "./item_article_right_taglist";
	import itemCommtop from "./item_article_right_comment";
	import itemLog from "./item_article_right_update_log";
	export default {
		components: {
			itemTags,
			itemCommtop,
			itemLog
		}
	};
</script>

