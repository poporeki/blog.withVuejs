<template>
	<transition enter-active-class="animated flipInX">
		<div class="rt" v-if="isShow">
			<div class="s-wrap" @mouseout="hideFn">
				<div
					:class="{'search-box':true,'show':searchBoxIsShow}"
					@mouseover="searchBoxIsShow=true"
					id="search_box"
				>
					<div class="s-btn"></div>
					<div class="input-box">
						<Loading :isLoading="isRequest"></Loading>
						<input
							type="text"
							class="search"
							v-model="keywords"
							@focus="inputFocus"
							@blur="inputBlur();hideFn()"
							placeholder="search"
							@keyup="getSearchData"
						>
						<div class="msg-box"></div>
					</div>
				</div>
				<div
					:class="{dropdown:true, 'search-dropdown':true, hide:dropDownIsShow===false,show:dropDownIsShow}"
				>
					<template v-if="searchData===undefined||searchData.length===0">
						<p>
							没有查询到与
							<span class="highlight">{{keywords}}</span>相关的信息
						</p>
					</template>
					<transition-group
						v-show="dropDownIsShow"
						tag="ul"
						@before-enter="beforeEnter"
						@enter="enter"
						@leave="leave"
					>
						<template v-show="searchData!==undefined||searchData.length!==0">
							<li v-for="(item,idx) in searchData" :key="idx" :data-index="idx">
								<a class="arc-lk" :href="'/blog/article/' + item._id ">{{item.title}}</a>
							</li>
						</template>
					</transition-group>
				</div>
			</div>
		</div>
	</transition>
</template>


<script>
	import Loading from "@/components/blog/header/BlogHeaderSearchLoading";

	export default {
		data() {
			return {
				isShow: false /* 页面显示状态 */,
				isFocus: false /* input是否得到焦点 */,
				keywords: "" /* 搜索字符 */,
				searchBoxIsShow: false /* 搜索栏状态 */,
				dropDownIsShow: false /* 搜索栏下拉菜单状态 */,
				searchData: [] /* 搜索数据 */,
				isRequest: false /* 请求状态 */,
				isRequestError: false
			};
		},
		components: {
			Loading /* ajax请求等待动画 */
		},
		methods: {
			/* 判断隐藏搜索框 */
			hideFn() {
				let kws = this.keywords;
				if (!this.isFocus && kws === "") {
					this.searchBoxIsShow = false;
					this.dropDownIsShow = false;
					this.searchData = [];
				}
			},
			/* 得到焦点 */
			inputFocus() {
				this.isFocus = true;
			},
			/* 失去焦点 */
			inputBlur() {
				this.isFocus = false;
			},
			/* 根据输入信息获取搜索数据 */
			getSearchData() {
				/* 是否处于请求中 如果true则返回*/
				if (this.isRequest) return;
				/* 当输入内容为空时隐藏下拉框 */
				if (this.keywords === "") {
					this.dropDownIsShow = false;
					return;
				}
				const that = this;
				this.isRequest = true;
				this.$axios
					.post("/api/v1/article/search/like", {
						wd: this.keywords /* 键入文本 */
					})
					.then(({ data }) => {
						let ds = data.data;
						that.dropDownIsShow = true;
						that.searchData = ds;
						that.isRequest = false;
					})
					.catch(err => {
						console.log(err);
					});
			},
			beforeEnter: function(el) {
				el.style.opacity = 0;
				el.style.transform = "translateX(-20%)";
			},
			enter: function(el, done) {
				var delay = el.dataset.index * 100;
				setTimeout(function() {
					Velocity(el, { opacity: 1, translateX: 0 }, { complete: done });
				}, delay);
			},
			leave(el, done) {
				var delay = el.dataset.index * 100;
				setTimeout(function() {
					Velocity(el, { opacity: 0, translateX: "20%" }, { complete: done });
				}, delay);
			}
		},
		mounted() {
			/* 渲染完毕后显示 */
			this.isShow = true;
		}
	};
</script>

<style lang="scss" scoped>
	.highlight {
		color: rgb(255, 166, 0);

		&:after,
		&::before {
			content: " ";
		}
	}

	p {
		padding: 0 5px;
		text-align: center;
		word-break: break-all;
		color: #000;
	}

	nav {
		.rt {
			display: flex;
			position: relative;
			align-self: center;
			justify-content: flex-end;

			.s-wrap {
				position: relative;
				width: 200px;
			}

			.search-box {
				position: relative;
				border-radius: 2px;
				max-width: 100%;
				box-sizing: border-box;
				overflow: hidden;
				z-index: 101;

				&.show {
					.input-box {
						transform: translateX(0);
					}

					.s-btn {
						transform: rotate(360deg);
					}
				}

				.s-btn {
					position: absolute;
					height: 40px;
					width: 40px;
					top: 0;
					right: 0;
					background-color: #212121;
					cursor: pointer;
					z-index: 2;
					border-radius: $bor-radius;
					box-sizing: border-box;
					transition: transform 1s ease;

					&:after {
						content: "";
						position: absolute;
						width: 40%;
						height: 40%;
						top: 50%;
						left: 50%;
						transform: translateX(-50%) translateY(-50%);
						border-radius: 50%;
						border: 2px solid rgb(226, 226, 226);
					}

					&:before {
						content: "";
						position: absolute;
						top: 70%;
						left: 65%;
						width: 10%;
						border: 1px solid rgb(184, 184, 184);
						transform: rotate(45deg);
					}
				}

				.input-box {
					display: flex;
					position: relative;
					height: 40px;
					width: 100%;
					padding: 10px;
					padding-right: 50px;
					border-top-right-radius: $bor-radius;
					border-bottom-right-radius: $bor-radius;
					background-color: rgb(161, 161, 161);
					transition: transform 1s ease;
					z-index: 1;
					box-sizing: border-box;
					justify-content: center;
					align-items: center;
					transform: translateX(100%);

					.search {
						background-color: transparent;
						outline: none;
						border: none;
						width: 100%;
						color: #2a2a2a;
						justify-self: center;
					}

					.loading-ani-searchlike {
						position: absolute;
						height: 2px;
						width: 100%;
						left: 0;
						top: 0;
						padding-right: 50px;
						box-sizing: border-box;
						transform: scale(0);
						animation: inputLoadAni 1s infinite;
						background-color: #000;
					}

					@keyframes inputLoadAni {
						0% {
							transform: scale(0);
						}

						50% {
							transform: scale(1);
							background-color: rgb(131, 131, 131);
						}

						100% {
							transform: scale(0);
						}
					}
				}
			}

			.search-dropdown {
				position: absolute;
				top: 40px;
				left: 0;
				width: 100%;
				padding: 30px 0;
				background-color: #fff;
				border-bottom-left-radius: 2px;
				border-bottom-right-radius: 2px;
				box-shadow: 0 2px 5px rgb(129, 129, 129);
				transition: all 1s ease;
				z-index: 100;

				&.show {
					display: block;
					animation: ddAni_in 1s both;
				}

				&.hide {
					display: none;
					animation: ddAni_out 1s both;
				}
				li {
					transition: transform 0.5s ease;
				}
				.arc-lk {
					display: block;
					margin: 0 5px;
					padding: 10px 10px;
					font-size: 0.24rem;
					border-bottom: 1px solid rgba(218, 218, 218, 0.445);
					color: rgb(95, 95, 95);

					&:hover,
					&:active {
						background-color: #e2e2e2;
					}
				}

				@keyframes ddAni_in {
					0% {
						opacity: 0;
						transform: translateY(-10%);
					}

					100% {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes ddAni_out {
					0% {
						opacity: 1;
						transform: translateY(0);
					}

					100% {
						opacity: 0;
						transform: translateY(-10%);
					}
				}
			}
		}
	}

	@media (width: 360px) {
		.rt {
			align-self: flex-end !important;
			margin-bottom: 50px;
			width: 100% !important;

			.s-wrap {
				width: 100% !important;
			}
		}
	}

	@media (max-width: 768px) {
		.rt {
			align-self: flex-end !important;
			width: 100% !important;

			.s-wrap {
				width: 100% !important;
			}
		}
	}
</style>
