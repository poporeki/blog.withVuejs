<template>
	<div class="menu-container">
		<pose-transition>
			<btn-control-item class="btn-control" @click.native="changeMenuDisplay" v-show="!isShowMenu">
				<i class="iconfont icon-menu"></i>
			</btn-control-item>
		</pose-transition>
		<PoseTransition>
			<menu-inner-item class="menu-inner" v-if="isShowMenu">
				<menu-mask-item class="menu-mask" @click.native="changeMenuDisplay(false)"></menu-mask-item>
				<menu-content class="menu-content">
					<!-- <div class="not-login-box">
						<div class="not-login-inner">
							<router-link to="/login">登录</router-link>
							<router-link to="/login">注册</router-link>
						</div>
					</div>-->
					<div class="btn-close-sidebar" @click="changeMenuDisplay(false)">
						<div class="btn-inner"></div>
					</div>
					<div class="menu-data-list">
						<menulist-item
							class="menu-data-list-item"
							v-for="(item,iidx) in navList"
							:key="iidx"
							:i="iidx"
							:pose="isShowMenuListPose"
						>
							<router-link :to="item.link" v-if="item.link">
								<span>{{item.name}}</span>
								<i :class="item.name?`iconfont icon-${item.icon}`:''"></i>
							</router-link>
							<a :href="item.href" v-if="item.href" target="_blank">
								<span>{{item.name}}</span>
								<i :class="item.name?`iconfont icon-${item.icon}`:''"></i>
							</a>
						</menulist-item>
					</div>
					<div class="aside-bottom-container">
						<div class="logo-pic">
							<img :src="logoPic" alt>
						</div>
						<div class="not-login-inner" v-if="!isLogin">
							<router-link to="/login">登录</router-link>
							<router-link to="/signup">注册</router-link>
						</div>
						<div class="user-box" v-if="isLogin" @click="maskShow=!maskShow">
							<transition name="mask-show" @after-enter="userAfterEnter" @after-leave="userAfterLeave">
								<div :class="{mask:true}" v-if="maskShow"></div>
							</transition>
							<div class="user-head-wrap">
								<div class="user-head-pic">
									<img :src="avatarUrl" alt>
								</div>
								<div class="user-name">{{userInfo.username}}</div>
							</div>
						</div>
					</div>
				</menu-content>
			</menu-inner-item>
		</PoseTransition>
	</div>
</template>


<script>
	import posed, { PoseTransition } from "vue-pose";
	import { mapState } from "vuex";
	import utils from "@/util/utils";
	export default {
		data() {
			return {
				logoPic: "https://v.yansk.cn/images/logo.png",
				isShow: false,
				maskShow: false
			};
		},
		components: {
			PoseTransition,
			MenuInnerItem: posed.div({
				enter: {
					opacity: 1,
					beforeChildren: true,
					transition: { duration: 200, ease: "linear" }
				},
				exit: {
					opacity: 0,
					afterChildren: true,
					transition: { duration: 200, ease: "linear" }
				}
			}),
			MenuMaskItem: posed.div({
				enter: {
					opacity: 1,
					beforeChildren: true,
					transition: { duration: 200, ease: "linear" }
				},
				exit: {
					opacity: 0,
					afterChildren: true,
					transition: { duration: 200, ease: "linear" }
				}
			}),
			MenuContent: posed.div({
				enter: {
					delay: 100,
					beforeChildren: true,
					staggerChildren: 30,
					rotateY: 0
				},
				exit: {
					delay: 300,
					rotateY: "120deg"
				}
			}),
			MenulistItem: posed.div({
				enter: {
					opacity: 1,

					y: 0,
					delay: ({ i }) => i * 50
				},
				exit: {
					opacity: 0,

					y: "-50%"
				}
			}),
			/**开关 */
			btnControlItem: posed.div({
				draggable: true,
				hoverable: true,
				init: {
					scale: 1,
					backgroundColor: "#000",
					boxShadow: "0px 0px 5px rgba(139, 139, 139, 0.801)"
				},
				hover: {
					scale: 1.2,
					boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
					backgroundColor: "#5C676B"
				},
				drag: { scale: 1.1, boxShadow: "0px 2px 3px rgba(0,0,0,0.1)" },
				dragEnd: {
					x: 0,
					y: 0,
					transition: { type: "spring" }
				},
				enter: {
					delay: 500,
					opacity: 1,
					x: 0
				},
				exit: {
					opacity: 0,
					x: "-30%"
				}
			})
		},
		methods: {
			getIconfont(iconName) {
				return;
			},
			userAfterEnter(el) {
				this.$router.push({
					path: "/blog/user"
				});
				console.log("完成");
				this.maskShow = false;
				this.changeMenuDisplay(false);
			},
			userAfterLeave() {
				this.changeMenuDisplay(false);
			},
			linkItemHasCurrent(link) {
				let spt = link.split("/");
				let rou = this.$route.params;
				console.log(spt);
			},
			changeMenuDisplay(val) {
				return this.$store.commit("changeMenuDisplayStatus", val);
			}
		},
		computed: {
			...mapState(["navList", "isLogin", "userInfo", "isShowMenu"]),
			isShowMenuListPose() {
				return this.isShowMenu ? "visible" : "hidden";
			},
			avatarUrl() {
				return utils.REG_URL.test(this.userInfo.avatarPath)
					? this.userInfo.avatarPath
					: `https://v.yansk.cn${this.userInfo.avatarPath}`;
			}
		}
	};
</script>

<style lang="scss" scoped>
	$menu-fontsize: 1rem;

	.mask-show-enter-active {
		transition: all 0.3s ease;
	}
	.mask-show-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}
	.mask-show-enter {
		transform: scale(0);
		opacity: 1;
	}
	.mask-show-enter-to,
	.mask-show-leave {
		transform: scale(400);
		opacity: 1;
	}
	.mask-show-leave-to {
		opacity: 0;
	}
	.menu-container {
		position: fixed;
		color: #000;
		left: 0;
		top: 0;
		z-index: 10000;
		a {
			color: inherit;
		}
		.btn-control {
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			bottom: 100px;
			right: 20px;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background-color: #000;
			color: #fff;
			cursor: pointer;
		}
		.menu-inner {
			position: relative;
			left: 0;
			top: 0;
			perspective: 1200px;
		}
		.menu-mask {
			position: absolute;
			height: 100vh;
			width: 100vw;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.54);
		}
		.menu-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;

			min-width: 150px;
			max-width: 400px;
			height: 100vh;
			left: 0;
			top: 0;
			background-color: #1e2223;
			transform-origin: left center;
		}
		.btn-close-sidebar {
			position: absolute;
			left: calc(2rem + 25px);
			top: calc(2rem + 25px);
			width: 50px;
			height: 50px;
			z-index: 2;
			transition: transform 0.3s ease, background-color 0.3s ease;
			cursor: pointer;
			&:hover {
				background-color: #8a8a8a;
				transform: rotate(5deg);
			}
			.btn-inner {
				position: relative;
				height: 100%;
				width: 100%;
				transform: rotate(45deg);
				&::after,
				&::before {
					content: "";
					position: absolute;
					top: 50%;
					left: 50%;
					width: 1px;
					height: 100%;
					transform: translate(-50%, -50%);
					background-color: #525252;
					transform-origin: center center;
				}
				&::before {
					transform: translate(-50%, -50%) rotate(90deg);
				}
			}
		}
		.aside-bottom-container {
			position: relative;
			display: flex;
			flex-direction: row;
			flex-shrink: 0;
			padding: 1rem 0;
			.not-login-inner {
				padding-right: 1rem;
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: center;
				> a {
					color: rgba(255, 255, 255, 0.562);
					padding: 1rem 2rem;
					border-bottom: 1px solid rgba(0, 0, 0, 0.562);
				}
			}
		}
		.logo-pic {
			flex-shrink: 0;
			flex-basis: 50%;
			> img {
				max-width: 100%;
			}
		}
		.user-box {
			display: flex;
			position: relative;
			justify-content: flex-end;
			flex-grow: 1;
			flex-basis: 50%;
			width: 50%;
			flex-shrink: 0;
			.mask {
				position: absolute;
				top: 50%;
				right: 50%;
				width: 10px;
				height: 10px;
				background-color: #000;
				border-radius: 50%;
				transition: transform 1s ease;
				z-index: 1000;
				&.show {
					transform: scale(400);
					opacity: 1;
				}
			}
			.user-head-wrap {
				margin-right: 1rem;
				align-self: center;
				position: relative;
				width: 50%;
			}
			.user-head-pic {
				position: relative;
				padding-bottom: 100%;
				height: 0;
				overflow: hidden;
				border: 1px solid rgba(0, 0, 0, 0.438);
				border-radius: 50%;
			}
			img {
				width: 100%;
				transform: scale(1.1);
			}
		}

		.menu-data-list {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			align-content: stretch;
			padding: 2rem 0;
			color: rgba(245, 245, 245, 0.63);
			overflow-y: auto;
			overflow-x: hidden;

			&::-webkit-scrollbar {
				width: 3px;
			}
			&::-webkit-scrollbar-thumb {
				background-color: #525252;
				opacity: 0.5;
				border-radius: 5px;
			}
			.menu-data-list-item {
				position: relative;
				// background-color: rgb(240, 144, 20);
				font-size: $menu-fontsize;
				margin: 0.5rem 0;
				padding: 1rem 2rem;
				text-align: center;
				border-radius: 4px;
				cursor: pointer;
				// &::after {
				// 	content: "";
				// 	position: absolute;
				// 	right: 0;
				// 	top: 50%;
				// 	height: 1px;
				// 	width: 100%;
				// 	background-color: #fff;
				// 	transform: translateY(-50%);
				// }
				::after {
					content: "";
					position: absolute;
					height: 100%;
					width: 10px;
					right: 0;
					top: 0;
					background-color: #af7e23;
					transform: translateX(100%);
					transition: transform 0.3s ease;
					z-index: -1;
				}
				&.current {
					::after {
						transform: translateX(0);
					}
				}
				> a {
					transition: color 0.3s ease;
				}
				.iconfont {
					font-size: inherit;
					margin: 0 10px;
				}
				&:hover {
					> a {
						color: #8a8a8a;
					}
					::after {
						transform: translateX(0);
					}
				}
			}
		}
	}
</style>

