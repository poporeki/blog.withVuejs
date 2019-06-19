<template>
	<aside :class="{'l-aside':true,unfold:!isFold}" ref="aside" @touchstart.stop>
		<a
			href="javascript:void(0);"
			:class="{'sidebar-btn':true,go:isWaitAniStatus}"
			@mousemove="isFold=false"
			@mouseleave="isFold=true"
			@click="$route.path!=='/blog/user'?$store.commit('changeWaitAniStatus',true):''"
			@touchstart.stop="touchStart"
			@touchmove.stop="touchMove"
			@touchend.stop="touchEnd"
		>
			<p>{{title}}</p>
		</a>
		<img src="/images/logo.png" class="img-logo" alt="logo">
		<ul class="navbar">
			<li v-for="(item,idx) in navList" :key="idx">
				<router-link :to="'/blog/articlelist?by[type_id]='+item.link">
					<span>{{item.name}}</span>
				</router-link>
			</li>
		</ul>
	</aside>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				navlist: [],
				isFold: true,
				isClicked: false,
				userName: "",
				touch: {
					startX: 0,

					nowX: 0,
					endX: 0,
					moveX: 0,
					lastX: 0,
					lastY: 0,

					translateX: "translateX(-100%)"
				}
			};
		},
		methods: {
			getNavbar() {
				let that = this;
				this.$axios.get("/api/v1/gethomenavbar").then(({ data }) => {
					that.navlist = data.data;
				});
			},
			touchStart(ev) {
				if (ev.touches.length !== 1) return;
				let touches = ev.touches[0];
				let x = touches.clientX;
				let y = touches.clientY;
				this.touch.startX = x;
			},
			touchMove(ev) {
				if (ev.touches.length !== 1) return;
				let touches = ev.touches[0];
				let x = touches.clientX;
				let y = touches.clientY;
				let aside = this.$refs.aside;
				this.touch.moveX = x;
				let rs = x - this.touch.startX;

				rs > 0 ? (rs = 0) : "";
				rs < -aside.clientWidth ? (rs = -aside.clientWidth) : "";
				aside.style.transform = `translateX(${rs}px)`;
			},
			touchEnd(ev) {
				if (ev.changedTouches.length !== 1) return;
				let touches = ev.changedTouches[0];
				let x = touches.clientX;
				let aside = this.$refs.aside;
				let rs = x - this.touch.startX;

				rs > 0 || rs >= -aside.clientWidth / 2 ? (rs = 0) : "";
				rs < -80 || rs < -aside.clientWidth / 2 ? (rs = -80) : "";
				aside.style.transform = `translateX(${rs}px)`;
			}
		},
		watch: {
			isWaitAniStatus(val) {
				if (!val) return;
				let that = this;
				setTimeout(() => {
					that.$router.push({
						path: "/blog/user"
					});
				}, 2000);
			}
		},
		computed: {
			title() {
				return (
					this.user &&
					(JSON.stringify(this.user) !== "{}"
						? this.user.username.toUpperCase()
						: "YANSK")
				);
			},
			user() {
				return this.$store.state.userInfo;
			},
			isWaitAniStatus() {
				return this.$store.state.isWaitAni;
			},
			...mapState(["navList"])
		},
		created() {
			this.getNavbar();
		}
	};
</script>


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
				transition: transform 1s ease;
				z-index: 1;
			}
			&.go::after {
				z-index: 1000;
				background-color: rgba(0, 0, 0, 1);
				// animation: goUser 2s forwards;
				transform: rotate(0) scale(50);
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
				bottom: 100px;
			}
		}
	}
</style>
