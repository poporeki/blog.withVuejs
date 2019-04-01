<template>
	<div class="page-wrapper">
		<div class="page-title">
			<h2>
				干货
				<small>本页面接口来自于https://gank.io/api</small>
			</h2>
		</div>
		<ul class="categorys-list" v-if="isCreated">
			<li
				v-for="(content,category) in categoryList"
				:key="category"
				:id="category"
				class="categorys-list-item"
			>
				<h2>{{category}}</h2>
				<ul>
					<li v-for="cay in content" :key="cay._id">
						<a :href="cay.url" class="item-lk" target="_blank">
							<div class="item-info" :id="cay._id">
								<h4 class="title">{{cay.desc}}</h4>

								<div class="author">作者：{{cay.who}}</div>
							</div>
							<div class="images-box" v-if="cay.images!==undefined">
								<swiper v-if="cay.images.length>1">
									<swiper-slide v-for="item in cay.images" :key="item">
										<img :src="item" alt="tup">
									</swiper-slide>
								</swiper>
								<template v-if="cay.images.length<2&&cay.images.length>=1">
									<img :src="item" alt="tup" v-for="item in cay.images" :key="item">
								</template>
							</div>
							<div class="item-info-footer">
								<div class="time-create">创建时间：{{cay.createdAt}}</div>
								<div>公开时间：{{cay.publishedAt}}</div>
							</div>
						</a>
					</li>
				</ul>
			</li>
		</ul>
		<aside>
			<ul>
				<li v-for="(content,category) in categoryList" :key="category">
					<a :href="'#'+category">{{category}}</a>
				</li>
			</ul>
		</aside>
	</div>
</template>
<style lang="scss" scoped>
	.page-wrapper {
		background-color: #fff;
		color: rgb(38, 47, 53);
	}
	ul,
	li {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	a {
		display: block;
		padding: 10px;
		color: #000;
		text-decoration: none;
	}
	.categorys-list {
		margin-top: 50px;
		margin-right: 100px;
		.categorys-list-item {
			h2 {
				text-align: center;
				padding-top: 50px;
			}
			ul {
				position: relative;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
				align-content: center;
				.swiper-container {
					width: 200px;
					height: 400px;
				}
				.item-info {
					margin-bottom: 20px;
				}
				.item-info,
				.item-info-footer {
					color: rgb(117, 117, 117);
					.title {
						color: rgb(34, 34, 34);
					}
					.author {
						text-align: right;
					}
					.time-create {
					}
				}
				.item-info-footer {
					margin-top: 20px;
					font-size: 0.5em;
				}
				li {
					position: relative;
					flex-basis: 20%;
					margin-top: 10px;
					&:after {
						/*对最后一个伪元素进行最大限度伸缩*/
						content: " ";
						flex-grow: 999999999999999999999999999999999999;
					}
					> a {
						width: 100%;
						height: 100%;
						padding: 20px;
						box-sizing: border-box;
						border: 1px solid rgb(240, 240, 240);
						transition: box-shadow 0.5s ease;
						border-radius: 4px;
						z-index: 2;

						&::after {
							content: "";
							position: absolute;
							left: 0;
							top: 0;
							height: 1%;
							width: 100%;
							z-index: 3;
							background-color: rgba(226, 124, 29, 0.644);
							transform: scale(0);
							border-radius: 50%;
							transition: transform 0.3s ease, border-radius 0.3s ease;
						}
						&:hover {
							box-shadow: 0 2px 6px rgb(167, 167, 167);
							&::after {
								transform: scale(1);
							}
						}
					}
					img {
						max-width: 200px;
						max-height: 400px;
						flex-grow: 1; /*进行按比例伸缩*/
						object-fit: cover; /*进行裁切，并且图片按比例缩放*/
					}
					.item-lk {
						display: flex;
						flex-direction: column;
					}
				}
			}
		}
	}
	aside {
		position: fixed;
		right: 30px;
		top: 30px;
		padding: 0 20px;
		background-color: #fff;
	}
</style>

<script>
	import "swiper/dist/css/swiper.css";
	import { swiper, swiperSlide } from "vue-awesome-swiper";
	export default {
		components: { swiper, swiperSlide },
		data() {
			return {
				categoryList: [],
				categorys: [],
				isCreated: false
			};
		},
		methods: {
			getVideoTypeList() {
				let that = this;
				let url = "http://gank.io/api/today";
				that.$axios
					.get(
						url,
						{ params: {} },
						{
							withCredentials: false
						}
					)
					.then(({ data }) => {
						that.isCreated = true;
						that.category = data.category;
						that.categoryList = data.results;
					});
			}
		},
		created() {
			this.getVideoTypeList();
		}
	};
</script>
