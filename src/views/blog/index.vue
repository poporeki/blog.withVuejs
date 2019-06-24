<template>
	<div class="blog-page" @scroll="imgload">
		<blog-header></blog-header>
		<div class="body" ref="page">
			<router-view/>
		</div>
		<div class="bg-block">
			<div class="progressive parallax-window" ref="bg" v-if="isInit">
				<img class="preview" v-progressive="bg.lowRes" :data-srcset="bg.original" :src="bg.original">
			</div>
			<div class="gradient"></div>
		</div>
		<!-- <blog-background></blog-background> -->
		<blog-footer></blog-footer>
		<!-- <blog-aside></blog-aside> -->
		<menu-item></menu-item>
		<back-totop-item></back-totop-item>
	</div>
</template>


<script>
	import Header from "@/components/blog/header";
	import TheFooter from "@/components/blog/TheFooter";
	import Aside from "@/components/blog/sidebar";
	import MenuItem from "@/components/blog/MenuItem";
	import Background from "@/components/blog/background";
	import BackTotopItem from "@/components/BackToTopItem";
	import "../../assets/css/progressive-image.css";
	export default {
		name: "Blog",
		components: {
			blogHeader: Header,
			blogFooter: TheFooter,
			blogAside: Aside,
			blogBackground: Background,
			BackTotopItem,
			MenuItem
		},
		data() {
			return {
				isInit: false,
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
				this.$axios
					.get("/api/v1/bing")
					.then(({ data }) => {
						if (data.status !== true || data.data.url === "") return;
						that.bg.original = data.data.url;
						that.bg.lowRes = data.data.url;
						this.isInit = true;
					})
					.catch(err => {
						this.isInit = true;
					});
			}
		},
		watch: {
			isInit(val) {
				if (!val) return;
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
			}
		},
		mounted() {},
		created() {
			this.getWallpaper();
		}
	};
</script>

<style lang="scss">
	body {
		overflow-x: hidden;
	}

	a {
		color: $link-text-color-base;
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
		width: 100%;
		margin: 0 auto;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.wrapper {
		min-height: 500px;
	}
	.blog-page {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.body {
		flex-grow: 1;
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
				$body-bg-color-base
			);
		}
	}
	.parallax-window {
		transition: transform 0.001s ease;

		> img {
			position: relative;
			height: 100%;
			filter: blur(5px);
		}
	}
</style>

