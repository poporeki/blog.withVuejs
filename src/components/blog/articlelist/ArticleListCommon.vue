<template>
	<transition-group
		@before-enter="listEnterBefore"
		@enter="listEnter"
		tag="ul"
		class="article-list"
		@scroll="scrolls"
		ref="ulArclist"
	>
		<li v-for="(arc,idx) in arcList" class="article-list-item" :key="idx" :data-index="idx">
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
		<li v-if="isInit&&(!arcList||arcList.length===0)" key="nothing">没有相关内容</li>
		<li v-if="isOver" style="text-align:center;" key="end">--THE END--</li>
		<li v-if="isResuestError" @click="this.getNewData" key="reload">拉取数据失败，点击重试</li>
		<li v-if="!isResuestError&&this.isRequest" key="loading">
			<loading-item></loading-item>
		</li>
	</transition-group>
</template>


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
			/**
			 * 滚动更新
			 */
			scrolls() {
				if (this.isOver) return;
				let ref = this.$refs;
				let offsetTop = ref.ulArclist.$el.offsetTop;
				var offsetHeigth = ref.ulArclist.$el.offsetHeight;

				let windowHeight = window.innerHeight;
				var scroll = windowHeight + window.scrollY;
				if (
					scroll > offsetTop &&
					window.scrollY - offsetTop < offsetHeigth &&
					this.isScroll === false
				) {
					this.isScroll = true;
					this.getNewData();
				}
			},
			/**
			 * 获取相关文章列表
			 */
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
			},
			/**
			 * 列表载入前
			 */
			listEnterBefore(el) {
				el.style.opacity = 0;
				el.style.transform = "rotateX(-70deg)";
			},
			/**
			 * 列表载入中
			 */
			listEnter(el, done) {
				let idx =
					el.dataset.index >= 10
						? el.dataset.index.split("")[1]
						: el.dataset.index;
				console.log(idx);
				let delay = (delay = idx * 100);

				setTimeout(function() {
					Velocity(el, { opacity: 1, rotateX: 0 }, { complete: done });
				}, delay);
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
				this.isResuestError = false;
				this.isOver = false;
				this.isScroll = false;
				this.isRequest = false;
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

<style lang="scss" scoped>
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
			transition: transform 0.5s ease;
			transform-origin: bottom center;
			// animation: flipXIn 1s forwards;
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
