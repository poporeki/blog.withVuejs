<template>
	<section class="comment-block" id="comment">
		<h5>发表评论</h5>
		<div class="add-comm clearfix">
			<textarea
				@keyup="typing($event)"
				v-model="context_comm"
				name="comm_textarea"
				class="comm-textarea"
				id="comm_textarea"
			></textarea>
			<a href="javascript:void(0);" class="comm-submit-btn" @click="submitComment" data-attr>
				提交
				<transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
					<span class="s-c-empty" v-if="isCommConError">{{commConErrorMsg}}</span>
				</transition>
			</a>
		</div>
		<div class="comm-list">
			<h5>评论列表({{artTotal}})</h5>
			<!-- 评论列表 -->
			<ul class="list">
				<li v-if="commList.length===0">目前并没有评论哦</li>
				<li
					class="comment-item"
					v-for=" (comm,commIdx) in commList"
					:key="comm.id"
					:data-commid="comm.id"
				>
					<div>
						<div class="head-pic">
							<a href="javascript:void(0);">
								<img v-lazy="avatarUrl(comm.user.avatar)" alt="avatar">
							</a>
						</div>
						<div class="content">
							<div class="info">
								<div class="lt">
									<div class="username">{{comm.user.name}}</div>
									<div class="address">{{comm.submit_address}}</div>
									<div class="p-date">{{comm.create_time}}</div>
								</div>
								<div class="floor-blk">{{comm.floor+'楼'}}</div>
							</div>
							<p>{{comm.text}}</p>
							<div class="tools">
								<a href="javascript:void(0);" class="comm-reply-btn" @click="fadeToggle($event,commIdx)">回复</a>
								<transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutUp">
									<div class="reply-block" v-show="comm.status">
										<div class="add-comm clearfix">
											<textarea
												name="comm_textarea"
												@keyup="typing"
												v-model="replyContent"
												class="comm-textarea"
												id="comm_textarea"
												cols="30"
												rows="10"
											></textarea>
											<a
												href="javascript:void(0);"
												class="comm-submit-btn"
												@click="submitComment($event,'toComment',comm.id,commIdx)"
											>
												提交
												<transition
													enter-active-class="animated fadeInUp"
													leave-active-class="animated fadeOutUp"
												>
													<span class="s-c-empty" v-if="isCommConError">{{commConErrorMsg}}</span>
												</transition>
											</a>
										</div>
										<div class="close-btn" @click="comm.status=false"></div>
									</div>
								</transition>
							</div>
						</div>
					</div>

					<!-- 评论中的回复列表 -->

					<ul :class="{'reply-list':true,show:comm.commReps&&comm.commReps.length!=0}">
						<li class="comment-item" v-for="(reply,repIdx) in comm.commReps" :key="reply.id">
							<div>
								<span># {{reply.floor}}</span>
								<div class="head-pic">
									<a href="javascript:void(0);">
										<img :src="avatarUrl(reply.user.avatar)" alt="avatar">
									</a>
								</div>
								<div class="content">
									<div class="info">
										<div class="lt">
											<div class="username">{{reply.user.name}}</div>
											<div class="address">{{reply.submit_address}}</div>
											<div class="p-date">{{reply.create_time}}</div>
										</div>
									</div>
									<p v-if="reply.to==''">{{reply.arc_content}}</p>
									<p v-if="typeof reply!=='undefined'&&reply.to!==''&&reply.to!==null">
										回复
										<span class="rep-to-name">#{{reply.to.floor}} {{reply.to.user.name}}:</span>
										{{reply.arc_content}}
									</p>
									<div class="tools">
										<a
											href="javascript:void(0);"
											@click="fadeToggle($event,commIdx,repIdx)"
											class="comm-reply-btn"
										>回复</a>
										<transition
											enter-active-class="animated fadeInUp"
											leave-active-class="animated fadeOutUp"
										>
											<div class="reply-block" v-show="reply.status">
												<div class="add-comm clearfix">
													<textarea
														name="comm_textarea"
														@keyup="typing"
														v-model="replyContent"
														class="comm-textarea"
														id="comm_textarea"
														cols="30"
														rows="10"
													></textarea>
													<a
														href="javascript:void(0);"
														@click="submitComment($event,'toReply',comm.id,commIdx,reply.id,repIdx)"
														class="comm-submit-btn reply-child"
														:data-repid="reply.id"
													>
														提交
														<transition
															enter-active-class="animated fadeInUp"
															leave-active-class="animated fadeOutUp"
														>
															<span class="s-c-empty" v-if="isCommConError">{{commConErrorMsg}}</span>
														</transition>
													</a>
												</div>
												<div class="close-btn" @click="reply.status=false"></div>
											</div>
										</transition>
									</div>
								</div>
							</div>
						</li>
						<li
							class="comment-item"
							v-if="comm.commReps&&comm.commReps.length!==0&&comm.commReps.count>5"
						>
							还有{{comm.commReps.count-5}}条回复，
							<a href="javascript:void(0);">点击查看</a>
						</li>
					</ul>
				</li>

				<li class="comment-more" v-if="(artTotal>artComms.length)&&(!(isEnd||isRequestError))">
					<a href="javascript:void(0);" class="more-comms-lk" @click="getMoreComment()">查看更多评论</a>
				</li>
				<li v-if="isEnd" style="text-align:center;">--THE END--</li>
				<transition enter-active-class="animated fadeInDown" leave-active-class="animated flipOutX">
					<li v-if="isRequestError" @click="this.getMoreComment">拉取数据失败，点击重试</li>
				</transition>
				<li v-if="!isRequestError&&isRequest">
					<div class="loading-ani-articlelist"></div>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				// 评论文本
				context_comm: "",
				isCommConError: false,
				commConErrorMsg: "",
				// 回复文本
				replyContent: "",
				context_reply: "",
				isEnd: false,
				// 请求状态
				isRequest: false,
				// 请求数据错误状态
				isRequestError: false,
				replyBoxStatus: [],
				commList: []
			};
		},
		props: ["arcId", "artTotal", "artComms", "toComment"],
		watch: {
			artComms() {
				this.commList = [];
				this.pushCommentData(this, this.artComms);
			}
		},
		methods: {
			/* 跳转到锚点 */
			goAnchor(el) {
				setTimeout(() => {
					let event = document.getElementById(el);
					let offTop = event.offsetTop;
					document.body.scrollTop = offTop; // chrome
					document.documentElement.scrollTop = offTop; // firefox
				}, 200);
			},
			/* 输入状态 */
			typing(ev) {
				console.log("typing:" + ev);
				let target = ev.currentTarget;
				let nextSibling = target.nextSibling;
				if (target.value === "")
					return this.commonFn.removeClass(nextSibling, "show");

				if (nextSibling.tagName === "A") {
					this.commonFn.addClass(nextSibling, "show");
				}
			},
			/* 提交评论 */
			submitComment(event, type, commid, commidx, replyid, replyidx) {
				if (!this.isLogin) {
					return this.$router.push({
						path: "/login"
					});
				}
				if (type === "toComment") {
					this.submitToComment(commid, commidx);
					return;
				} else if (type === "toReply") {
					this.submitToReply(commid, replyid, commidx, replyidx);
					return;
				}
				const that = this;
				this.$axios
					.post("/api/v1/article/comment/submitComment", {
						isGlobalLoading: false,
						comm_content: this.context_comm,
						arc_id: this.arcId
					})
					.then(({ data }) => {
						if (data.status === true) {
							that.context_comm = "";
							that.pushCommentData(that, data.data);
						} else if (data.status === -1) {
							that.isCommConError = true;
							that.commConErrorMsg = data.msg;
							setTimeout(() => {
								that.isCommConError = false;
								that.commConErrorMsg = "";
							}, 2000);
						} else {
							that.isCommConError = true;
							that.commConErrorMsg = data.msg;
							setTimeout(() => {
								that.isCommConError = false;
								that.commConErrorMsg = "";
							}, 2000);
						}
					})
					.catch(err => {});
			},
			/**
			 * 提交评论
			 *
			 */
			submitToComment(commid, idx) {
				let that = this;
				let url = "/api/v1/article/comment/submitReply";
				this.$axios
					.post(url, {
						isGlobalLoading: false,
						comm_content: this.replyContent,
						arc_id: this.arcId,
						commid: commid
					})
					.then(({ data }) => {
						if (data.status === true) {
							that.replyContent = "";
							that.commList[idx].status = false;
							that.pushCommentData(that, data.data);
						} else {
							that.isCommConError = true;
							that.commConErrorMsg = data.msg;
							setTimeout(() => {
								that.isCommConError = false;
								that.commConErrorMsg = "";
							}, 2000);
						}
					});
			},
			/**
			 * 提交评论回复
			 */
			submitToReply(commid, replyid, commidx, replyidx) {
				let that = this;
				let url = "/api/v1/article/comment/submitReply";
				this.$axios
					.post(url, {
						isGlobalLoading: false,
						comm_content: this.replyContent,
						arc_id: this.arcId,
						commid: commid,
						reply_id: replyid
					})
					.then(({ data }) => {
						if (data.status === true) {
							that.replyContent = "";
							that.commList[commidx].commReps[replyidx].status = false;
							that.pushCommentData(that, data.data, commidx);
						} else {
							that.isCommConError = true;
							that.commConErrorMsg = data.msg;
							setTimeout(() => {
								that.isCommConError = false;
								that.commConErrorMsg = "";
							}, 2000);
						}
					});
			},
			/* 回复框切换 */
			fadeToggle(event, commIdx, replyIdx) {
				let replyBoxStatus = this.commList;
				this.replyContent = "";
				replyBoxStatus.map(comm => {
					comm.status = false;
					let replyArr = comm.commReps;
					if (
						replyArr === undefined ||
						typeof replyArr === undefined ||
						replyArr.length === 0
					) {
						return;
					}
					replyArr.map(reply => {
						reply.status = false;
					});
				});
				if (arguments.length === 3) {
					replyBoxStatus[commIdx].commReps[replyIdx].status = !replyBoxStatus[
						commIdx
					].commReps[replyIdx].status;
					return;
				}
				replyBoxStatus[commIdx].status = !replyBoxStatus[commIdx].status;
			},
			pushCommentData(that, commlist, commidx) {
				return new Promise(resolve => {
					let comms = commlist;
					if (typeof comms == "undefined") return resolve();
					if (arguments.length === 3) {
						that.$set(comms, "status", false);
						that.commList[commidx].commReps.unshift(comms);
						return resolve();
					}
					if (!(comms instanceof Array)) {
						that.$set(comms, "status", false);
						that.commList.unshift(comms);
						return resolve();
					}
					comms.map((comm, idx) => {
						that.$set(commlist[idx], "status", false);

						let replyArr = comm.commReps;
						if (
							replyArr === undefined ||
							replyArr === null ||
							typeof replyArr === "undefined" ||
							replyArr.length === 0
						) {
							that.commList.push(comm);
							return;
						}
						replyArr.map((reply, repidx) => {
							that.$set(commlist[idx].commReps[repidx], "status", false);
						});
						that.commList.push(comm);
					});
					resolve();
				});
			},
			/* 获取更多评论 */
			getMoreComment() {
				let that = this;
				this.isRequest = true;
				this.isRequestError = false;
				that.$axios
					.get("/api/v1/article/comment/getComments", {
						params: {
							isGlobalLoading: false,
							skip: that.commList.length || 0,
							arcid: that.arcId
						}
					})
					.then(({ data }) => {
						that.isRequest = false;
						if (data.status !== 1) {
							that.isEnd = true;
						}
						that.pushCommentData(that, data.data);
					})
					.catch(() => {
						that.isRequestError = true;
					});
			},
			avatarUrl(avatar) {
				if (!avatar)
					return "https://v.yansk.cn/images/user/avatars/default/1.png";
				return ["http://", "https://"].indexOf(avatar) !== -1
					? `https://v.yansk.cn${avatar}`
					: avatar;
			}
		},
		created() {
			this.pushCommentData(this, this.artComms);
		},
		mounted() {
			/* 是否锚点到评论区 */
			this.toComment === true ? this.goAnchor("comment") : "";
		},
		computed: {
			isLogin() {
				return this.$store.state.isLogin;
			}
		}
	};
</script>

<style lang="scss">
	.rep-to-name {
		color: #d18521;
	}
	.comment-block {
		font-size: 0.9rem;
		h5 {
			font-weight: bold;
			padding: 10px 0;
			border-bottom: 1px solid rgb(48, 48, 48);
		}

		.comment-item {
			position: relative;
		}

		.add-comm {
			position: relative;
			box-sizing: border-box;
			align-items: stretch;
			align-content: center;
			margin-bottom: 80px;

			> textarea {
				position: relative;
				display: block;
				width: 100%;
				height: 200px;
				margin: 0;
				padding: 10px;
				padding-right: 30px;
				border: none;
				border-radius: 2px;
				box-sizing: border-box;
				color: rgb(207, 207, 207);
				background-color: rgb(71, 71, 71);
				letter-spacing: 2px;
				resize: none;
				z-index: 100;
				overflow: auto;
			}

			.comm-submit-btn.show {
				transform: translateY(100%);
			}

			.comm-submit-btn {
				position: absolute;
				display: block;
				width: 100%;
				height: 60px;
				left: 0;
				bottom: 0;
				border-radius: 2px;
				line-height: 60px;
				background-color: #4cc37e;
				letter-spacing: 4px;
				font-weight: bold;
				text-align: center;
				box-sizing: border-box;
				z-index: 99;
				transition: transform 0.5s ease;
				overflow: hidden;

				&:after {
					content: attr(data-attr);
					flex-wrap: wrap;
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					z-index: 9;
					visibility: hidden;
					transform: translateY(-100%);
					transition: transform 0.5s ease, visibility.5s ease;
					background-color: orange;
				}

				&.msg {
					&:after {
						visibility: visible;
						transform: translateY(0);
					}
				}

				&.hide {
					&:after {
						visibility: hidden;
						transform: translateY(-100%);
					}
				}
				span {
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					display: block;
				}
				.s-c-empty {
					background-color: #d18521;
				}
			}
		}

		.reply-block.show {
			display: block;
		}

		.reply-list {
			display: none;
			position: relative;
			border-left: 1px solid #424242;
			margin-top: 15px;
			padding: 5px 15px;

			&.show {
				display: block;
			}
		}

		.reply-block {
			display: block;
			position: absolute;
			width: 100%;
			height: 110px;
			z-index: 100;

			> .add-comm {
				position: absolute;
				left: 0;
				right: 0;
				margin: 0 auto;
				padding: 0;
				width: 100%;
				height: 100%;
				z-index: 100;

				> .comm-textarea {
					height: 100% !important;
				}
			}

			.close-btn {
				position: absolute;
				content: "";
				right: 0;
				width: 30px;
				height: 30px;
				text-align: center;
				z-index: 101;
				transform: rotate(45deg);
				transition: transform 0.5s ease;
				cursor: pointer;

				&:after,
				&:before {
					position: absolute;
					content: "";
					top: 0;
					left: 0;
					transform: translate(-50%, -50%, 0);
					background-color: $color-font;
				}

				&:after {
					width: 100%;
					height: 10%;
					top: 50%;
				}

				&:before {
					height: 100%;
					width: 10%;
					left: 50%;
				}

				&:hover {
					transform: rotate(225deg);
				}
			}
		}
	}

	.comm-list {
		position: relative;
		background-color: #000;
		padding: 10px;
		ul.list {
			> li {
				position: relative;
				padding-left: 10px;
				margin-bottom: 15px;
				border-left: 5px solid #085e2c;
				transition: border-color 0.4s ease, height 0.3s ease;
				animation: fadeIn 0.5s;
				&:hover {
					border-color: #60bb46;
				}
				> span {
					flex-shrink: 0;
				}
				.head-pic {
					flex-shrink: 0;
					position: relative;
					padding: 10px;
					width: 10vw;
					height: 10vw;
					max-width: 80px;
					max-height: 80px;

					margin-top: 5px;
					box-sizing: border-box;
					a {
						display: block;
						height: 100%;
						width: 100%;
						min-width: 20px;
						min-height: 20px;
						border-radius: 50%;
						overflow: hidden;
						transition: all 0.3s ease;
						> img {
							height: 100%;
						}
					}
				}

				> div:nth-child(1),
				.reply-list > li > div:nth-child(1) {
					display: flex;
					position: relative;
					flex-direction: row;
				}

				.content {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					margin-left: 10px;

					.info {
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.lt {
							display: flex;
							flex-direction: row;
							flex-wrap: wrap;
							font-size: 12px;
							margin-bottom: 10px;

							> div {
								margin-right: 10px;
							}
						}

						.username {
							color: rgb(207, 207, 207);
						}

						.address {
							color: #728092;
						}

						.p-date {
							color: #728092;
						}

						.floor-blk {
							justify-self: flex-end;
							font-size: 12px;
							color: rgb(85, 85, 85);
						}
					}

					> p {
						margin: 0;
						color: #9dafc7;
						word-break: break-all;
					}

					.tools {
						position: relative;
						display: flex;
						justify-content: flex-end;
						.comm-reply-btn {
							font-size: 0.8rem;
						}
					}
				}
			}

			.comment-item {
				&:hover {
					> div {
						> .head-pic {
							> a {
								box-shadow: 0 2px 4px rgba(41, 168, 29, 0.76);
							}
						}
					}
				}
			}
		}

		.comment-more {
			text-align: center;

			> a.more-comms-lk {
				display: block;
				position: relative;
			}
		}
	}
</style>
