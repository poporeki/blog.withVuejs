<template>
	<section class="classify">
		<div class="lt">
			<h4 class="title">分类</h4>
		</div>
		<div class="rt">
			<transition-group tag="div" class="category-list" enter-active-class="animated fadeInUp">
				<div class="category-list-item" v-for="item in typelist" :key="item.typeID">
					<router-link class="type-lk" :to="'/blog/articlelist?by[type_id]='+item.typeID">
						<p>{{item.typeName}}</p>
						<i :class="'iconfont icon-'+item.typeIconName"></i>
					</router-link>
				</div>
			</transition-group>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				typelist: {}
			};
		},
		methods: {
			getTypeList() {
				let _this = this;
				this.$axios.get("/api/v1/getarctypes").then(({ data }) => {
					_this.typelist = data;
				});
			}
		},
		created() {
			this.getTypeList();
		}
	};
</script>

<style lang="scss">
	section.classify {
		position: relative;
		width: 100%;
		min-width: 100px;
		margin: 50px 0;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;

		.lt {
			margin-right: 15px;
			align-self: center;

			.title {
				word-wrap: break-word;
				letter-spacing: 20px;
				width: 20px;
			}
		}

		.rt {
			position: relative;
			flex-grow: 1;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}
		.category-list {
			position: relative;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			flex-grow: 1;

			.category-list-item {
				flex-grow: 1;
				position: relative;
				padding: 2rem;
				overflow: hidden;
				background-color: rgb(19, 19, 19);
				transition: transform 0.3s ease;
				box-shadow: 2px 2px 2px rgba(58, 61, 66, 0.479);
				border-radius: 4px;
				&::before,
				&::after {
					content: "";
					position: absolute;
					width: 10px;
					height: 10px;
					right: 5%;
					top: 5%;
					padding: 20px;
					border-radius: 50%;
				}
				&::before {
					z-index: 1;
					transition: transform 0.3s ease;
				}
				&::after {
					opacity: 0.8;
					z-index: 2;
					transition: transform 0.3s ease;
				}
				&:nth-child(1) {
					&::before {
						background-color: rgb(21, 129, 70);
					}
					&::after {
						background-color: rgba(26, 175, 93, 0.479);
					}
				}
				&:nth-child(2) {
					&::before {
						background-color: rgb(21, 80, 129);
					}
					&::after {
						background-color: rgba(29, 95, 216, 0.479);
					}
				}
				&:nth-child(3) {
					&::before {
						background-color: rgb(129, 21, 106);
					}
					&::after {
						background-color: rgba(163, 26, 175, 0.479);
					}
				}
				&:nth-child(4) {
					&::before {
						background-color: rgb(199, 100, 34);
					}
					&::after {
						background-color: rgba(233, 115, 37, 0.479);
					}
				}
				.type-lk {
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-content: stretch;
					width: 100%;
					height: 150px;
					z-index: 3;

					.iconfont {
						transition: color 0.3s ease;
						font-size: 4rem;
					}
				}
				&:hover {
					transform: translateY(-10px);
					.type-lk {
						.iconfont {
							color: #000;
						}
					}
					&::before {
						// width: 100%;
						// height: 100%;
						// border-radius: 0;
						transform: scale(17);
					}
					&::after {
						transform: scale(5);
					}
				}
			}
		}
	}
</style>
