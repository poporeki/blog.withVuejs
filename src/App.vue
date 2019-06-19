<template>
	<div id="app">
		<Loading></Loading>
		<router-view v-if="isRouterAlive"/>
	</div>
</template>

<script>
	import Loading from "@/components/loading/Loading_global";
	export default {
		components: {
			Loading
		},
		provide() {
			return {
				reload: this.reload
			};
		},
		data() {
			return {
				isInit: true,
				isRouterAlive: true
			};
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(() => {
					this.isRouterAlive = true;
				});
			}
		},
		mounted() {
			let animateEl = document.querySelector(".app-init-loading-wrapper");
			this.commonFn.addClass(animateEl, "hide");
		}
	};
</script>

<style lang="scss">
	// html {
	// 	width: 100%;
	// 	height: 100%;
	// }
	body {
		position: relative;
	}
	#app {
		position: relative;
		// width: 100%;
		// height: 100%;
	}
	img[lazy="loaded"] {
		animation: fadeInTop 0.5s;
	}
</style>

