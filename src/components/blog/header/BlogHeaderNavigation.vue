<template>
	<transition-group class="navbar" tag="ul" v-on:before-enter="beforeEnter" v-on:enter="enter">
		<template v-if="isShow">
			<li v-for="(item,idx) in navlist" :key="idx" :data-index="idx">
				<router-link :to="item.link" v-if="item.link">
					<span>{{item.name}}</span>
				</router-link>
				<a :href="item.href" v-if="item.href" target="_blank">
					<span>{{item.name}}</span>
				</a>
			</li>
		</template>
	</transition-group>
</template>


<script>
	export default {
		data() {
			return {
				isShow: false,
				navlist: [
					{ name: "首页", link: "/blog" },
					{ name: "工具集", link: "/blog/tools" },
					{ name: "图库", href: "https://tu.yansk.cn" },
					{ name: "关于我", href: "https://v.yansk.cn/iresume" }
				]
			};
		},
		methods: {
			getNavbar() {
				let that = this;
				this.$axios.get("/api/v1/gethomenavbar").then(({ data }) => {
					let list = data.data;
					that.isShow = true;
					let obj = list.map(val => {
						return {
							name: val.type_name,
							link: `/blog/articlelist?by[type_id]=${val._id}`
						};
					});
					that.navlist = this.navlist.concat(obj);
					console.log(obj);
				});
			},
			beforeEnter: function(el) {
				el.style.opacity = 0;
				el.style.height = 0;
			},
			enter: function(el, done) {
				var delay = el.dataset.index * 100;
				setTimeout(function() {
					Velocity(el, { opacity: 1, height: "1.6em" }, { complete: done });
				}, delay);
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
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;

		li {
			a {
				position: relative;
				display: flex;
				flex-grow: 1;
				align-self: center;
				font-size: 0.35rem;
				font-weight: bold;
				padding: 15px 20px;
				margin: 0 10px;
				box-sizing: border-box;
				transition: color 0.3s ease;
				overflow: hidden;
				color: #fff;

				&:after,
				&:before {
					content: "";
					position: absolute;
					width: 20%;
					padding-top: 20%;
					border: 2px solid #000;
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
			}

			&:hover {
				> a {
					color: $color-bg;

					&:after,
					&:before {
						transform: translate(0);
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
