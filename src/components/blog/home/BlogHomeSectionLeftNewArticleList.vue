<template>
	<div class="new-arc-list-wapper">
		<h4 class="title">
			最新文章
			<small>
				<router-link to="/blog/articlelist">More</router-link>
			</small>
		</h4>
		<div style="min-height:400px;position:relative;" v-if="isRequest">
			<Loading :isLoading="isRequest"></Loading>
		</div>
		<transition-group tag="ul" enter-active-class="filpXIns" class="article-list" v-show="!isRequest">
			<li v-if="isEmptyData" :key="0">没有数据</li>
			<li v-for="arc in arclist" :key="arc.id" class="article-list-item">
				<router-link :to="'blog/article/'+arc.id">
					<div class="card">
						<div class="card-header">
							<div class="title">
								<h6>
									<span class="art-type-tips">{{arc.type.name}}</span>
									{{arc.title}}
								</h6>
							</div>
							<div class="info-box">
								<div class="item read-num">
									<i class="iconfont bottom icon-view-line"></i>
									{{arc.read}}
								</div>
								<div class="item author">
									<i class="iconfont bottom icon-writer"></i>
									{{arc.author.name}}
								</div>
								<div class="item author">
									<i class="iconfont bottom icon-time"></i>
									{{arc.time_create}}
								</div>
							</div>
						</div>
						<div class="card-body">
							<div class="pic-box" v-if="filterSrc(arc.source)!==''">
								<img v-lazy="filterSrc(arc.source)===''?'/images/exp.png':filterSrc(arc.source)" alt="img">
							</div>
							<p>{{arc.content}}</p>
						</div>
					</div>
				</router-link>
			</li>
			<li v-if="isRequestError">
				<a href="javascript:void(0);" @click="getNewArticleTopData">请求数据失败，请重试</a>
			</li>
		</transition-group>
	</div>
</template>

<script>
	import Loading from "@/components/loading/Loading_02";
	export default {
		components: { Loading },
		data() {
			return {
				isRequest: true,
				isRequestError: false,
				isEmptyData: false,
				arclist: []
			};
		},

		methods: {
			getNewArticleTopData() {
				const that = this;
				this.$axios.get("/blog/getartlist").then(({ data }) => {
					that.isRequest = false;
					if (data.data === null || data.data.length === 0) {
						that.isEmptyData = true;
						return;
					}
					let arclist = data.data.arcList;
					that.arclist = arclist;
				});
			},
			filterSrc(str) {
				var imgReg = /<img.*?(?:>|\/>)/gi;
				var srcReg = /src=['|"]?([^'|"]*)['|"]?/i;
				var arr = str.match(imgReg);
				if (arr != null) {
					var src = arr[0].match(srcReg);
					return src === null ? "" : src[1];
				} else {
					return "";
				}
			}
		},
		created() {
			this.getNewArticleTopData();
		}
	};
</script>



<style lang="scss">
	.new-arc-list-wapper {
		.article-list {
			position: relative;
			column-count: 2;
			column-gap: 1px;
			column-rule: 1px solid rgb(53, 53, 53);
			width: 100%;
			@media (max-width: 768px) {
				& {
					column-count: 1;
				}
			}
		}
		.filpXIns {
			animation: flipXIn 0.3s forwards;
		}
		.article-list-item {
			-webkit-column-break-inside: avoid;
			-moz-column-break-inside: avoid;
			-o-column-break-inside: avoid;
			-ms-column-break-inside: avoid;
			// column-break-inside: avoid;
			backface-visibility: hidden;
			background-color: #000;
			> a {
				display: block;
			}
			&:hover {
				.card {
					background-color: $highlight-color-black;
					box-shadow: 0 2px 5px rgb(56, 56, 56);

					&:before {
						transform: translateY(0);
					}

					.pic-box {
						> img {
							transform: scale(1);
						}
					}
				}
			}

			&:active {
				.card {
					transform: scale(0.95);
				}
			}
		}

		.card {
			position: relative;
			padding: 20px;
			border-bottom: 1px solid rgb(53, 53, 53);
			transition: background-color 0.2s ease, transform 0.2s ease,
				box-shadow 0.5s ease;
			overflow: hidden;
			z-index: 1;

			&:after {
				position: absolute;
				content: "";
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background-color: rgb(46, 46, 46);
				transform: translateY(100%) scale(0);
				opacity: 0;
				transition: transform 0.5s ease-out, opacity 0.5s ease;
				z-index: -1;
			}

			&:before {
				content: "";
				position: absolute;
				width: 100%;
				height: 5px;
				bottom: 0;
				left: 0;
				background-color: $color-pink;
				z-index: -1;
				transform: translateY(5px);
				transition: transform 0.3s ease;
			}

			.card-header {
				margin-bottom: 20px;

				.title {
					border-left: 5px solid $color-green;
					margin: 0 0 10px;
					padding: 10px 5px;
					font-size: 1.1rem;
					background-color: #000;
					box-shadow: 0 0 1px rgb(119, 119, 119);
					border-top-right-radius: 2px;
					border-bottom-right-radius: 2px;
				}

				.art-type-tips {
					position: relative;
					padding: 5px 3px;
					margin-right: 5px;
					color: #fff;
					z-index: 1;

					&:after {
						content: "";
						position: absolute;
						height: 50%;
						width: 100%;
						top: 8%;
						left: 0;
						z-index: -1;
						background-color: $color-pink;
					}
				}

				h4 {
					display: inline-block;
					padding: 0;
					margin: 0;
					color: $color-font;
				}

				.info-box {
					display: flex;
					flex-direction: row;
					font-size: 0.8rem;

					> .item {
						margin-right: 20px;
					}

					&,
					a {
						color: rgb(117, 117, 117);
					}

					.iconfont {
						margin-right: 5px;
					}
				}
			}

			.card-body {
				p {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					word-break: break-word;
					overflow: hidden;
					margin: 10px 0 0 0;
					font-size: 0.8rem;
					max-height: 100px;
					color: rgb(226, 226, 226);
				}

				.pic-box {
					min-height: 60px;
					max-height: 200px;
					overflow: hidden;

					> img {
						display: block;
						-webkit-column-break-inside: avoid;
						-moz-column-break-inside: avoid;
						-o-column-break-inside: avoid;
						-ms-column-break-inside: avoid;
						// column-break-inside: avoid;
						// backface-visibility: hidden;
						height: 100%;
						width: 100%;
						transform: scale(0.99);
						transition: transform 0.5s ease;
					}
				}
			}
		}
	}
</style>
