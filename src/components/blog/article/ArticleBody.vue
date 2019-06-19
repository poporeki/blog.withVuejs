<template>
	<article class="article-box" data-art-i-d="art.id">
		<div class="article-header wobble">
			<div class="art-title">
				<h2>{{art.title}}</h2>
			</div>
			<div class="pt-info">
				<span class="pubtime">
					发布时间：
					{{art.createTime}}
				</span>
				<span class="source">
					分类：
					<a class="type-lk" :href="'/blog/articlelist?by[type_id]='+art.type.id">{{art.type.name}}</a>
				</span>
				<span class="author">
					<!-- A:
					{{art.author}}-->
				</span>
				<span class="count">
					阅读数:
					{{art.readNum}}
				</span>
			</div>
		</div>
		<div class="article-body" v-html="art.source" v-highlight ref="articleBody"></div>
		<div class="article-source" v-if="from.link||from.name">
			<br>原帖地址：
			<a v-if="from.link&&from.name" :href="from.link">{{from.name}}</a>
			<a v-else-if="from.link" :href="from.link">{{from.link}}</a>
			<span v-else-if="from.name">{{from.name}}</span>
		</div>
		<br>
		<p class="end" v-if="art!==null">--THE END--</p>
		<br>
		<div v-if="art.tags!==null" class="article-tags-list">
			<h4 class="tit">标签</h4>
			<a
				v-for="tag in art.tags"
				:key="tag.id"
				:href="'/blog/articlelist?by[tags_id]='+tag._id"
				class="tag-lk"
			>{{tag.tag_name}}</a>
		</div>
		<share-item></share-item>
		<ad-item></ad-item>
		<pnlink-item :arcprev="arcPrev" :arcnext="arcNext"></pnlink-item>
		<likes-item :arcid="arcid" :userIsLiked="artinfo.userIsLiked" :likesTotal="artinfo.arcInfo.likes"></likes-item>
		<transition enter-active-class="scaleIn_2X" leave-active-class="MoveXOutToRight">
			<div class="image-preview-box" v-show="showImagePreview">
				<div class="img-box">
					<img :src="imagePreviewSrc" alt="图片预览" @mousewheel.prevent="zoomImage">
				</div>
				<div class="btn-close-preview" @click="showImagePreview=!showImagePreview"></div>
			</div>
		</transition>
	</article>
</template>

<script>
	import ShareItem from "@/components/blog/article/ArticleBodyShare";
	import AdItem from "@/components/blog/article/ArticleBodyAd";
	import PnlinkItem from "@/components/blog/article/ArticleBodyPNLink";
	import LikesItem from "@/components/blog/article/ArticleBodyLikes";
	export default {
		data() {
			return {
				showImagePreview: false,
				imagePreviewSrc: ""
			};
		},
		props: ["artinfo"],
		computed: {
			//文章
			art() {
				return this.artinfo.arcInfo;
			},
			//源
			from() {
				return this.artinfo.arcInfo.from;
			},
			//文章id
			arcid() {
				return this.artinfo.arcInfo.id;
			},
			//上一页
			arcPrev() {
				return this.artinfo.arcPrev;
			},
			//下一页
			arcNext() {
				return this.artinfo.arcNext;
			}
		},
		components: {
			ShareItem,
			AdItem,
			PnlinkItem,
			LikesItem
		},
		mounted() {
			this.watchTagImg();
		},
		methods: {
			/**
			 * 监听img标签的单击事件
			 */
			watchTagImg() {
				let body = this.$refs.articleBody;
				let tagImgs = body.querySelectorAll("img");
				body.addEventListener("click", ev => {
					let target = ev.target;
					if (target.nodeName !== "IMG") return;
					let imgSrc = target.src;
					this.showImagePreview = true;
					this.imagePreviewSrc = imgSrc;
				});
			},
			/**
			 * 预览图滚轮缩放图片
			 */
			zoomImage(e) {
				let target = e.target;
				var zoom = parseInt(target.style.zoom, 10) || 100;
				zoom += e.wheelDelta / 12;
				if (zoom > 0) target.style.zoom = zoom + "%";
				return false;
			}
		}
	};
</script>

<style lang="scss">
	.wobble {
		animation: wobble 5s 1s forwards;
	}
	.image-preview-box {
		display: flex;
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		padding: 20px;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.753);
		z-index: 1000;
		.img-box {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			z-index: 1;
		}
		img {
			width: auto;
			height: auto;
			max-height: 100%;
			max-width: 100%;
			overflow: auto;
		}
		.btn-close-preview {
			position: absolute;
			width: 50px;
			height: 50px;
			right: 30px;
			top: 30px;
			cursor: pointer;
			z-index: 2;
			&::after,
			&::before {
				content: "";
				position: absolute;
				transform: rotate(45deg);
				background-color: #fff;
				box-shadow: 0 0 5px #000;
			}
			&::after {
				width: 100%;
				height: 6%;
				margin-top: -3%;
				top: 50%;
			}
			&::before {
				width: 6%;
				left: 50%;
				margin-left: -3%;
				height: 100%;
			}
			&:hover {
				animation: rotateScale08 3s infinite cubic-bezier(0, 0, 1, 1);
			}
		}
	}
	.article-header {
		opacity: 0;
		.art-title {
			> h2 {
				text-align: center;
			}
		}

		.pt-info {
			font-size: 0.28rem;
			text-align: center;
			margin-bottom: 50px;

			span {
				margin-right: 20px;
				color: #cacaca;
				text-shadow: 0 0 1px #dddddd;
			}

			.type-lk {
				display: inline-block;
				color: rgb(116, 116, 116);
				background-color: #cac8c8;
				border-bottom-left-radius: 4px;
				padding: 0 10px;
				text-align: center;
				transition: transform 0.3s ease, background-color 0.3s ease;

				&:hover {
					background-color: #222222;
				}
			}
		}
	}
	.article-box {
		p.end {
			font-size: 0.3rem;
		}
	}
	.article-source {
		a {
			color: #7f7f7f;
		}
	}
	.article-body {
		font-size: 0.28rem;
		color: rgba(236, 236, 236, 1);

		ul {
			margin: 10px 0 10px 20px;
			> li {
				list-style: inherit;
			}
		}
		ol {
			& > li {
				list-style: decimal;
			}
		}
		a {
			padding: 0 2px;
			color: #a9b9e6;
			word-wrap: break-word;
			text-decoration: underline;
			transition: color 0.3s ease;
			&:hover {
				color: #fff;
			}
		}

		img {
			width: auto;
			height: auto;
			max-width: 400px;
			max-height: 100%;
			width: 100%;
			@media (max-width: 320px) {
			}
		}
		blockquote {
			padding: 0;
			margin: 0;
		}
		p,
		li,
		span {
			font-size: 1em;

			> code {
				margin: 0 3px;
				padding: 1px 5px;
				border: 1px solid #000;
				box-sizing: border-box;
				background-color: #2f3a53;
			}
			code {
				word-break: break-all;
			}
		}
		figure {
			margin: 0;

			> table {
				display: block;
				overflow: auto;
				// background-color: #000;
			}
		}
		.iframe-container {
			position: relative;
			min-height: 300px;
			max-height: 600px;
			max-width: 800px;
			min-width: 300px;
			iframe {
				height: 500px;
				width: 100%;
			}
		}
		.ql-video {
			position: relative;
			min-height: 300px;
			max-height: 600px;
			max-width: 800px;
			height: 500px;
			width: 100%;
			min-width: 300px;
		}
		code.hljs {
			transition: all 0.5s ease;
			&::-webkit-scrollbar {
				width: 10px;
				height: 4px;
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 10px;
				background: #535353;
			}
			&:hover {
				&::-webkit-scrollbar {
					height: 10px;
				}
			}
		}
		table {
			display: block;
			overflow: auto;

			tbody {
				padding: 5px;
				background-color: $color-block-wrap;

				tr {
					th,
					td {
						padding: 5px;
					}
				}
			}
		}

		figure > table,
		pre {
			&::-webkit-scrollbar {
				width: 10px;
				height: 4px;
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 10px;
				background: #535353;
			}
		}

		pre {
			color: darkorange;
			border: 2px solid #000;
			border-radius: 2px;
			box-sizing: border-box;
			overflow-x: auto;
		}
	}

	.article-tags-list {
		font-size: 0.28rem;
		margin-bottom: 20px;
		.tag-lk {
			position: relative;
			display: inline-block;
			padding: 5px 10px;
			margin: 5px 0;
			margin-right: 20px;
			background-color: #085e2c;
			transition: background-color 0.3s ease;
			z-index: 2;
			&:hover {
				background-color: #064922;
			}

			&:after,
			&:before {
				content: "";
				position: absolute;
				right: 0;
				top: 0;
				height: 100%;
				width: 20%;
				transform: skewX(30deg);
				background-color: inherit;
				z-index: -1;
			}

			&:before {
				transform: skewX(-30deg) !important;
			}
		}
	}
</style>
