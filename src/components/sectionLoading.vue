<template>
	<div v-if="this.$store.loading.state.loadingIsShow" class="section-loading"></div>
</template>
<style lang="scss">
	.section-loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(24, 24, 24);
		&:after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 10%;
			height: 100%;
			background-color: rgb(59, 59, 59);
			animation: move 1s infinite;
		}
		@keyframes move {
			0% {
				transform: translateX(0);
			}
			100% {
				transform: translateX(100%);
			}
		}
	}
</style>

