<template>
	<div id="app">
		<Loading></Loading>
		<router-view v-if="isRouterAlive"/>
	</div>
</template>
<style lang="scss">
	html {
		width: 100%;
		height: 100%;
	}
	body {
		position: relative;
	}
	#app {
		position: relative;
		width: 100%;
		height: 100%;
	}
	img[lazy="loaded"] {
		animation: fadeIn 0.5s;
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(-10%);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
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


