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
	@import url("//at.alicdn.com/t/font_1251795_2br1dvx1j.css");
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
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html {
		height: 100%;
		width: 100%;
		font-family: sans-serif;
		line-height: 1.15;
		-webkit-text-size-adjust: 100%;
		-ms-text-size-adjust: 100%;
		-ms-overflow-style: scrollbar;
		-webkit-tap-highlight-color: transparent;
	}

	@-ms-viewport {
		width: device-width;
	}

	article,
	aside,
	dialog,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	main,
	nav,
	section {
		display: block;
	}

	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			"Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
			"Segoe UI Symbol";
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		// color: #212529;
		color: $text-color-base;
		text-align: left;
		background-color: $body-bg-color-base;
	}
	[tabindex="-1"]:focus {
		outline: 0 !important;
	}

	hr {
		box-sizing: content-box;
		height: 0;
		overflow: visible;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	p {
		margin-top: 0;
		margin-bottom: 1rem;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	.h1,
	.h2,
	.h3,
	.h4,
	.h5,
	.h6 {
		margin-bottom: 0.5rem;
		font-family: inherit;
		font-weight: 500;
		line-height: 1.2;
		color: inherit;
	}

	h1,
	.h1 {
		font-size: 2.5rem;
	}

	h2,
	.h2 {
		font-size: 2rem;
	}

	h3,
	.h3 {
		font-size: 1.75rem;
	}

	h4,
	.h4 {
		font-size: 1.5rem;
	}

	h5,
	.h5 {
		font-size: 1.25rem;
	}

	h6,
	.h6 {
		font-size: 1rem;
	}
</style>

