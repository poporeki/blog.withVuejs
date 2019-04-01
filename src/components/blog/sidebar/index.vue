<template>
	<aside :class="{'l-aside':true,unfold:!isFold}">
		<a
			href="javascript:void(0);"
			:class="{'sidebar-btn':true,go:isClicked}"
			@mousemove="isFold=false"
			@mouseleave="isFold=true"
			@click="$route.path!=='/blog/user'?isClicked=true:''"
			@touchstart="isFold=false"
		>
			<p>{{($store.state.userInfo.username).toUpperCase()||'YANSK'}}</p>
		</a>
		<img src="/images/logo.png" class="img-logo" alt="logo">
		<ul class="navbar">
			<li class="aaa ani1">
				<a href="/blog">
					<span>首页</span>
				</a>
			</li>
			<li v-for="(item,idx) in navlist" :key="idx">
				<a :href="'/blog/articlelist?by[type_id]='+item._id">
					<span>{{item.type_name}}</span>
				</a>
			</li>
			<li>
				<a href="/iresume">
					<span>个人简历</span>
				</a>
			</li>
		</ul>
	</aside>
</template>
<style lang="scss">
	aside.l-aside {
		position: fixed;
		height: 100%;
		width: 80px;
		top: 0;
		left: 0;
		background-color: #fff;
		box-shadow: 0 0 20px #000;
		transition: transform 0.5s ease;
		transform: translateX(-100%);
		z-index: 1000;
		&.unfold {
			transform: translateX(0);
		}
		&:after {
			content: "";
			width: 100vw;
			height: 100vh;
			background-color: #000;
			z-index: -1;
		}
		.sidebar-btn {
			position: absolute;
			top: 10%;
			right: -50%;
			width: 100%;
			height: 0px;
			max-width: 100px;
			padding-top: 100%; //padding-bottom都可以
			border-radius: 50%;

			box-shadow: 0 0 20px #000;
			z-index: 11;
			transform: rotate(90deg);
			transition: background-color 0.3s ease, transform 1s ease 0.5s;
			&::after {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.932);
				z-index: 1;
			}
			&.go::after {
				background-color: rgba(0, 0, 0, 1);
				animation: goUser 2s forwards;
			}
			@keyframes goUser {
				0% {
					transform: rotate(0) scale(1);
					z-index: 1000;
				}
				50% {
					background-color: rgba(0, 0, 0, 1);
					transform: rotate(0) scale(50);
				}
				100% {
					transform: rotate(0) scale(1);
					z-index: 1;
				}
			}
			p {
				position: relative;
				padding: 0;
				margin: 0;
				margin-top: -55%;
				font-size: 0.22rem;
				text-align: center;
				color: #fff;
				text-shadow: 0 0 10px #fff;
				letter-spacing: 5px;
				transform: translateY(-100%);
				transition: transform 0.5s ease;
				z-index: 2;
			}
		}
		&:hover {
			transform: translateX(0);
			.sidebar-btn {
				transform: rotate(0);
				p {
					transform: translateY(0);
				}
			}
		}
		.img-logo {
			width: 100%;
			max-width: 100px;
		}
		.navbar {
			position: relative;
			margin-top: 20vh;
			max-height: 60vh;
			overflow-y: auto;
			overflow-x: hidden;
			&::-webkit-scrollbar {
				width: 4px;
			}
			&::-webkit-scrollbar-thumb {
				border-radius: 7px;
				box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
				background-color: rgb(46, 46, 46);
			}
			li {
				position: relative;
				width: 100%;
				a {
					position: relative;
					display: block;
					width: 100%;
					height: 0px;
					padding-top: 100%;
					box-sizing: border-box;
					color: #000;
					transform: rotate(90deg);
					text-shadow: 0 0 2px rgb(129, 129, 129);
					> span {
						display: block;
						margin-top: -50%;
						text-align: center;
						font-size: 0.25rem;
						transform: translateY(-50%);
					}
					&:after {
						content: "";
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 0;
						background-color: forestgreen;
						transition: height 0.2s ease-out;
					}
					&:hover {
						&:after {
							height: 4px;
						}
					}
				}
			}
		}
	}
	@media (max-width: 768px) {
		aside.l-aside {
			.navbar {
				margin-top: 0;
			}
			.sidebar-btn {
				top: auto;
				bottom: 10%;
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				navlist: [],
				isFold: true,
				isClicked: false
			};
		},
		methods: {
			getNavbar() {
				let that = this;
				this.$axios.get("/api/v1/gethomenavbar").then(({ data }) => {
					that.navlist = data.data;
				});
			}
		},
		watch: {
			isClicked(val) {
				if (!val) return;
				let that = this;
				setTimeout(() => {
					that.$router.push({
						path: "/blog/user"
					});
				}, 500);
			}
		},
		created() {
			this.getNavbar();
		}
	};
</script>

