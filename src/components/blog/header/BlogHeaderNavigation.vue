<template>
	<PoseTransition>
		<nav-container-item class="navbar" v-if="isShow">
			<navlist-item v-for="(item,idx) in navlist" :key="idx" :data-index="idx">
				<router-link :to="item.link" v-if="item.link">
					<i :class="'iconfont '+ 'icon-'+item.icon "></i>
					<span>{{item.name}}</span>
				</router-link>
				<a :href="item.href" v-if="item.href" target="_blank">
					<i :class="'iconfont '+ item.icon "></i>
					<span>{{item.name}}</span>
				</a>
			</navlist-item>
		</nav-container-item>
	</PoseTransition>
</template>


<script>
	import posed, { PoseTransition } from "vue-pose";
	export default {
		components: {
			PoseTransition,
			navContainerItem: posed.ul({
				enter: {
					opacity: 1,
					beforeChildren: true,
					staggerChildren: 30
				},
				exit: {
					opacity: 0
				}
			}),
			navlistItem: posed.li({
				enter: {
					opacity: 1,
					y: 0,
					delay: ({ i }) => i * 50
				},
				exit: {
					opacity: 0,
					y: -20
				}
			})
		},
		data() {
			return {
				isShow: false,
				navlist: [
					{ name: "首页", link: "/blog", icon: "home" },
					{ name: "工具集", link: "/blog/tools", icon: "toolbox" },
					{ name: "图库", href: "https://tu.yansk.cn", icon: "image" },
					{
						name: "关于我",
						href: "https://v.yansk.cn/iresume",
						icon: "icon-avatar"
					}
				]
			};
		},
		methods: {
			getNavbar() {
				let that = this;
				this.$axios.get("/api/v1/gethomenavbar").then(({ data }) => {
					let list = data.data;

					let obj = list.map(val => {
						return {
							name: val.type_name,
							link: `/blog/articlelist?by[type_id]=${val._id}`,
							icon: val.iconfont_name
						};
					});
					this.navlist = this.navlist.concat(obj);
					this.$store.commit("updateNavlist", this.navlist);
					this.$nextTick(function() {
						this.isShow = true;
					});
					console.log(obj);
				});
			}
		},
		created() {
			this.getNavbar();
		},
		mounted() {}
	};
</script>

<style lang="scss" scoped>
	ul.navbar {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;

		li {
			flex-grow: 1;
			> a {
				position: relative;
				display: flex;
				flex-grow: 1;
				align-items: center;
				align-self: center;
				font-size: 1rem;
				font-weight: bold;
				padding: 15px 20px;
				margin: 0 10px;
				box-sizing: border-box;
				transition: color 0.3s ease;
				overflow: hidden;
				color: inherit;
				.iconfont {
					transition: transform 0.3s ease;
					font-weight: normal;
				}
				&:after,
				&:before {
					content: "";
					position: absolute;
					width: 20%;
					padding-top: 20%;
					border: 2px solid rgb(43, 43, 43);
					opacity: 0;
					transition: transform 0.3s ease, opacity 0.3s ease;
				}

				&:after {
					bottom: 0;
					right: 0;
					transform: translate(-50%, -50%);
					border-left-color: transparent;
					border-top-color: transparent;
				}

				&:before {
					top: 0;
					left: 0;
					transform: translate(50%, 50%);
					border-right-color: transparent;
					border-bottom-color: transparent;
				}
				> .iconfont {
					margin-right: 5px;
				}
			}

			&:hover {
				> a {
					color: rgb(226, 226, 226);
					.iconfont {
						transform: rotate(16deg) scale(1.5);
					}
					&:after,
					&:before {
						transform: translate(0);
						border-radius: 4px;
						opacity: 1;
					}
				}
			}
		}
	}

	@media (width: 360px) {
		.navbar {
			display: none !important;

			a {
				padding: 5px 15px !important;
			}
		}
	}

	@media (max-width: 768px) {
		.navbar {
			display: none !important;

			a {
				padding: 5px 15px !important;
			}
		}
	}
</style>
