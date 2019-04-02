<template>
	<div class="hot-box">
		<top-carousel class="lt-item"></top-carousel>

		<hot-top class="rt-item"></hot-top>
	</div>
</template>
<style lang="scss">
	.hot-box {
		display: flex;
		position: relative;
		flex-direction: row;

		@media (min-width: 768.1px) {
			max-height: 400px;
			height: 40vw;
			min-height: 400px;
			> .lt-item {
				width: 60%;
			}

			> .rt-item {
				width: 40%;
				padding-left: 10px;
			}
		}

		@media (max-width: 768px) {
			flex-direction: column;

			> .lt-item,
			> .rt-item {
				width: 100%;
				min-height: 300px;
				height: 100%;
			}

			> .rt-item {
				padding-top: 20px;
			}

			.hot-list {
				height: 40vw;
				min-height: 300px;
			}
		}

		> .lt-item {
			position: relative;
			// background: url(/images/dark_geometric2.png);
		}

		> .rt-item {
			position: relative;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.tit {
				h2 {
					margin: 0 0 10px 0;
				}
			}
		}
	}
</style>

<script>
	import Carousel from "./carousel";
	import Hot from "./hot";
	export default {
		components: {
			"top-carousel": Carousel,
			"hot-top": Hot
		}
	};
</script>

