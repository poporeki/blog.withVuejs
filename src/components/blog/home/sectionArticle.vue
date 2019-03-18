<template>
	<section class="article">
		<item-newtop></item-newtop>
		<item-right></item-right>
	</section>
</template>
<style lang="scss">
	@keyframes flipXIn {
		0% {
			opacity: 0;
			transform: scale(1) rotateX(-70deg);
		}
		100% {
			opacity: 1;
			transform: scale(1) rotateX(0);
		}
	}
	@media (max-width: 768px) {
		.article {
			flex-direction: column-reverse !important;
			min-height: 200px;
			.article-list {
				width: 100% !important;

				ul {
					column-count: 1;
				}
			}

			.right-item {
				width: 100% !important;
			}
		}
	}
	@media (min-width: 768.1px) {
		.artcomm-list {
			.comm-lk {
				width: 100%;
			}
		}
	}

	.article {
		position: relative;
		margin: 0 0 100px 0;
		display: flex;
		flex-direction: row;

		.right-item {
			width: 20%;
		}
	}
</style>

<script>
	import newtop from "./newtop";
	import itemRight from "./itemRight";
	export default {
		components: {
			"item-newtop": newtop,
			itemRight
		}
	};
</script>

