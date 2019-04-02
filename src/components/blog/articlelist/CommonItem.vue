<template>
	<ul class="article-list" @scroll="scrolls" ref="ulArclist">
		<transition enter-active-class="animated flipInX">
			<li v-if="isInit&&(!arcList||arcList.length===0)">没有相关内容</li>
		</transition>

		<li v-for="(arc,idx) in arcList" class="article-list-item" :key="idx">
			<a :href="'/blog/article/'+ arc.artid">
				<div class="lt">
					<div class="top">
						<div class="title">
							<h4>{{arc.title}}</h4>
						</div>
						<div class="time">{{arc.create_time}}</div>
					</div>
					<div class="thumbnail">{{arc.source}}</div>
				</div>
			</a>
		</li>

		<li v-if="isOver" style="text-align:center;">--THE END--</li>
		<transition enter-active-class="animated fadeInDown" leave-active-class="animated flipOutX">
			<li v-if="isResuestError" @click="this.getNewData">拉取数据失败，点击重试</li>
		</transition>
		<li v-if="!isResuestError&&this.isRequest">
			<loading-item></loading-item>
		</li>
	</ul>
</template>

<style lang="scss">
	ul.article-list {
		color: #fff;
		background-color: rgba(0, 0, 0, 0.74);
		padding: 10px 0;
		perspective: 1200px;

		a {
			color: #fff;
		}

		> .article-list-item {
			margin-bottom: 20px;
			border-bottom: 1px solid rgb(41, 41, 41);
			padding: 0 10px;
			padding-bottom: 20px;
			background-color: #000;
			transition: transform 0.2s ease;
			transform-origin: bottom center;
			animation: flipXIn 1s forwards;
			perspective: 1200px;
			font-size: 0.28rem;
			&:last-child {
				margin-bottom: 0;
			}

			&:hover,
			&:active {
				> a {
					transform: translateX(6px);
				}
			}

			> a {
				display: flex;
				justify-content: space-between;
				transition: transform 0.3s ease;
			}

			.lt {
				width: 100%;
			}

			.lt {
				position: relative;
				display: flex;
				flex-direction: column;

				.top {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.time {
						align-self: center;
						color: rgb(172, 172, 172);
					}

					.title {
						border-left: 5px solid #60bb46;
						padding: 0 5px;
						background-color: #000;
						border-top-right-radius: 2px;
						border-bottom-right-radius: 2px;
					}
				}

				.thumbnail {
					color: rgb(189, 189, 189);
					padding-top: 10px;
					word-break: break-all;
					font-size: 0.8em;
				}
			}

			.thumbnail {
				&:after {
					content: "...";
				}
			}
		}
	}
</style>

<script>
	import LoadingItem from "@/components/loading/Loading_01";
	import qs from "qs";
	export default {
		components: { LoadingItem },
		data() {
			return {
				page: 1,
				isInit: false,
				querystring: "",
				isResuestError: false,
				limit: 10,
				isOver: false,
				isScroll: false,
				isRequest: false,
				typename: "",
				arcList: [],
				menus: this.$route.params.path
			};
		},
		props: ["requestUrl"],
		methods: {
			listenerScroll() {
				window.addEventListener("scroll", this.scrolls);
			},
			scrolls() {
				if (this.isOver) return;
				let ref = this.$refs;
				let listScrollTop = ref.ulArclist.offsetTop;
				let scrollHeight = ref.ulArclist.clientHeight;
				let offsetHeight = document.documentElement.scrollTop;
				let sTop = document.documentElement.offsetHeight;
				let RemainingHeight = scrollHeight + listScrollTop;
				if (
					RemainingHeight - (offsetHeight + sTop) < 100 &&
					this.isScroll === false
				) {
					this.isScroll = true;
					this.getNewData();
				}
			},
			// 获取相关文章列表
			getNewData() {
				const that = this;
				if (!this.requestUrl) return;
				this.isResuestError = false;
				this.isRequest = true;
				let params = {};
				that.querystring !== "" ? (params = that.querystring) : "";
				params["page"] = this.page;
				params["limit"] = this.limit;
				this.$axios
					.get(this.requestUrl, { params })
					.then(({ data }) => {
						that.isRequest = false;
						let datas = data.data;
						if (data.status === 0 || data.status === false) {
							that.isOver = true;
							return;
						}
						that.isScroll = false;
						let list = datas.arclist;
						let searchedName = data.data.searchedName || "";
						if (searchedName !== "") {
							that.$emit("update:title", searchedName);
						}
						if (!list) return;

						list.map(value => {
							that.arcList.push(value);
							// that.$set(that.arcList, that.arcList.length, value);
						});
						that.page++;
					})
					.catch(err => {
						that.isResuestError = true;
						that.isScroll = false;
					});
			},
			getArticlelistData() {
				const that = this;
				this.$axios.get(this.requestUrl).then(({ data }) => {
					let datas = data.data;
					if (
						data.status === undefined ||
						data.code === 404 ||
						data.status === 0 ||
						data.status === false
					) {
						that.$router.replace({
							path: "/404"
						});
						return;
					}
					let searchedName = data.data.searchedName || "";
					console.log("QQQ:" + searchedName);
					if (searchedName !== "") {
						that.$emit("update:title", searchedName);
					}

					if (data.status !== 1 || !datas) return;

					that.isInit = true;
					that.arcList = datas.arclist;
					that.listenerScroll();
					that.page++;
				});
			}
		},
		watch: {
			// 监听路由query信息
			$route(val, oldVal) {
				if (val.query === oldVal.query) return;
				//重置内容
				let query = val.query;
				this.arcList = [];
				this.page = 1;
				this.querystring = query ? qs.parse(query) : "";
				this.getNewData();
			}
		},
		created() {
			let query = this.$route.query;
			this.querystring = query ? qs.parse(query) : "";
			this.getNewData();
			this.listenerScroll();
		}
	};
</script>

