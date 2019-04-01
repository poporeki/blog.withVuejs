<template>
	<div class="blog-page" @scroll="imgload">
		<blog-header></blog-header>
		<div class="body" ref="page">
			<transition
				enter-active-class="animated  lightSpeedIn"
				leave-active-class="animated bounceOutDown"
			>
				<router-view/>
			</transition>
		</div>
		<img src alt>
		<div class="bg-block">
			<div class="progressive parallax-window" ref="bg">
				<img class="preview" v-progressive="bg.lowRes" :data-srcset="bg.original" :src="bg.original">
			</div>
			<div class="gradient"></div>
		</div>
		<!-- <blog-background></blog-background> -->
		<blog-footer></blog-footer>
		<blog-aside></blog-aside>
	</div>
</template>

<style lang="scss">
	@import "../../assets/scss/mixins/_set-color.scss";
	html {
		height: 100%;
		width: 100%;
	}

	html,
	body {
		font-family: "Lato", "Microsoft YaHei", sans-serif;
		font-size: 0.16rem;
	}

	body {
		margin: 0;
		padding: 0;
		height: 100%;
		color: $color-font;
		width: 100%; // background-image: url(/images/dark_geometric2.png);
		background-color: $color-bg;

		overflow-x: hidden;
	}

	a {
		color: #fff;
		text-decoration: none;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
	}
	.wrapper,
	header {
		position: relative;
		max-width: 1190px;

		margin: 0 auto;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.wrapper {
		min-height: 500px;
	}
	.blog-page {
		position: relative;
	}
	.body {
		min-height: 40vh;
	}
	.p10 {
		padding: 10px;
	}

	.p10-lr {
		padding-left: 10px;
		padding-right: 10px;
	}
	.bg-block {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		z-index: -1;
		.gradient {
			position: absolute;
			width: 100%;
			height: 50%;
			bottom: 0;
			background-image: linear-gradient(
				to bottom,
				rgba(231, 51, 104, 0),
				$color-bg
			);
		}
	}
	.parallax-window {
		transition: transform 0.001s ease;

		> img {
			position: relative;
			height: 100%;
		}
	}
</style>

<script>
	import Header from "@/components/blog/header";
	import Footer from "@/components/blog/footer";
	import Aside from "@/components/blog/sidebar";
	import Background from "@/components/blog/background";
	import "../../assets/iconfont_blog/iconfont.css";
	import "../../assets/css/progressive-image.css";
	export default {
		name: "Blog",
		data() {
			return {
				bg: {
					original: "/images/blog_bg.jpg",
					lowRes: "/images/placeholder/blog_bg.jpg"
				}
			};
		},
		methods: {
			imgload() {
				let bodyHeight = this.$refs.bg.clientHeight;
				this.$refs.page.style.minHeight = bodyHeight + "px";
			},
			getWallpaper() {
				let that = this;
				this.$axios.get("/api/v1/bing").then(({ data }) => {
					if (data.status !== true || data.data.url === "") return;
					that.bg.original = data.data.url;
					that.bg.lowRes = data.data.url;
				});
			}
		},
		components: {
			"blog-header": Header,
			"blog-footer": Footer,
			"blog-aside": Aside,
			"blog-background": Background
		},
		mounted() {
			const that = this;
			let img = new Image();
			if (!this.bg) return;
			img.src = this.bg.original;
			img.onload = () => {
				this.imgload();
			};

			window.onresize = function temp() {
				that.imgload();
			};
		},
		created() {}
	};
</script>


