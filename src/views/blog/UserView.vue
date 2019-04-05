<template>
	<div>
		<div class="wrapper">
			<header class="top-box">
				<div class="head-box scrollIn" @click="isShowModal=!isShowModal">
					<div class="tips">
						<i class="iconfont icon-camera"></i>
						<span>更换头像</span>
					</div>
					<img v-lazy="`https://www.yansk.cn${avatar}`" v-if="avatar!==''" alt="head-pic">
				</div>
				<div class="name-box">
					<input type="text" :placeholder="userName">
				</div>
			</header>
			<div class="content-box">
				<div class="tab">
					<div class="tab-head">
						<ul>
							<li :class="{'tab-head-item':true,active:tabIndex===1}">
								<a href="javascript:void(0);" @click="tabIndex=1">
									<i class="iconfont"></i>
									<span>基本信息</span>
								</a>
							</li>
							<li :class="{'tab-head-item':true,active:tabIndex===2}">
								<a href="javascript:void(0);" @click="tabIndex=2">
									<i class="iconfont"></i>
									<span>安全</span>
								</a>
							</li>
						</ul>
					</div>
					<div class="tab-body">
						<ul>
							<li class="tab-body-item" v-show="tabIndex===1">
								<ul class="info-list">
									<li class="info-item username">
										<p class="tit">账号</p>
										<div class="text-box" v-show="!isShowNameInput">
											<span>{{userName}}</span>
											<a
												href="javascript:void(0);"
												class="btn-update-username"
												@click="isShowNameInput=!isShowNameInput"
											>
												<i class="iconfont icon-info"></i>修改
											</a>
										</div>
										<input
											v-show="isShowNameInput"
											type="text"
											:placeholder="userName"
											class="input-text-username"
											id="text_username"
										>
										<div class="box-tips"></div>
									</li>
									<li class="info-item">
										<p class="tit">Email</p>
										<input type="text" id="text_email" :placeholder="email">
									</li>
									<li class="info-item">
										<p class="tit">手机号</p>
										<input type="text" id="text_telnumber" :placeholder="telNumber">
									</li>
								</ul>
								<a href="javascript:void(0);" class="update-info-btn">提交信息</a>
							</li>
							<li class="tab-body-item" v-show="tabIndex===2">
								<ul class="info-list">
									<li class="info-item">
										<p class="tit">原密码</p>
										<input type="password" name="password" id="pwd">
									</li>
									<li class="info-item">
										<p class="tit">新密码</p>
										<input type="password" name="new_password" id="new_pwd">
									</li>
								</ul>
								<a href="javascript:void(0);" class="update-info-btn" id="submit_pwd">提交信息</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-box" v-show="isShowModal">
			<div class="inner">
				<div class="head-box">
					<h3 class="tit">上传头像</h3>
					<a href="javascript:void(0);" class="close-btn" @click="isShowModal=false"></a>
				</div>
				<div class="body-box">
					<div class="upload-box">
						<h4 class="tit">选择图片</h4>
						<input
							type="file"
							class="select-img"
							accept="image/png, image/jpeg, image/gif, image/jpg"
							@change="uploadImg($event, 1)"
						>
					</div>
					<div class="bottom-box">
						<div class="img-wrapper">
							<img src class="img-avatar" id="img_avatar" alt>
							<vue-cropper :img="img" :isSubmit="isSubmit" @previews="getPreviews" @submitBase="getBase64"></vue-cropper>
						</div>
						<div class="preview-box">
							<div class="preview small-preview">
								<img :src="previews.url" :style="previews.img">
							</div>
							<div class="preview small-preview2">
								<img :src="previews.url" :style="previews.img">
							</div>
						</div>
					</div>
					<div class="tool-box">
						<a href="javascript:void(0);" class="submit-btn" @click="isSubmit=true">保存修改</a>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-box" v-show="tips==null">
			<div class="tips-box">{{tips.text}}</div>
		</div>
		<modal-comp :type="tips.type" :text="tips.text"></modal-comp>
	</div>
</template>
<style lang="scss">
	.scrollIn {
		animation: scrollIn 2s;
	}
	@keyframes scrollIn {
		0% {
			transform: translateX(-50%) rotate(-180deg);
		}
		100% {
			transform: translateX(0) rotate(0);
		}
	}
	@media (max-width: 700px) {
		.body-box {
			.bottom-box {
				flex-direction: column !important;
				.img-wrapper {
					width: 100% !important;
					flex-grow: 1;
				}
				.preview-box {
					flex-direction: row !important;
					margin-left: 0 !important;
					margin-top: 20px;
					.preview {
						margin-right: 20px;
					}
				}
			}
			.tool-box {
				width: 100% !important;
				margin-left: 0 !important;
				.submit-btn {
				}
			}
		}
	}

	body {
		position: relative;
	}
	header.top-box {
		position: relative;
		height: 20%;
		width: 100%;
		display: flex;
		flex-direction: row;
		.head-box {
			position: relative;
			height: 100px;
			width: 100px;
			margin-left: 5%;
			border-radius: 50%;
			border: 5px solid #000;
			overflow: hidden;
			z-index: 1;
			cursor: pointer;
			.tips {
				position: absolute;
				display: flex;
				height: 100%;
				width: 100%;
				left: 0;
				top: 0;
				visibility: hidden;
				flex-direction: column;
				align-content: center;
				justify-content: center;
				align-items: center;
				background-color: rgba(0, 0, 0, 0.479);
				color: rgb(219, 219, 219);
				> .iconfont {
					font-size: 26px;
				}
			}
			> img {
				width: 100%;
			}
			// &:after {
			// 	content: "更换头像";
			// 	position: relative;
			// }
			&:hover {
				.tips {
					visibility: visible;
				}
			}
		}
		&:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 50%;
			left: 0;
			bottom: 0;
			background-color: #000;
			z-index: 0;
		}
		.name-box {
			position: relative;
			margin-left: 3%;
			width: 20%;
			z-index: 1;
			> input {
				position: absolute;
				height: 50%;
				width: 100%;
				padding: 10px;
				bottom: 0;
				left: 0;
				border: none;
				color: #fff;
				outline: none;
				box-sizing: border-box;
				font-size: 26px;
				background-color: transparent;
				&::-webkit-input-placeholder {
					color: #fff;
				}
				&:hover,
				&:focus {
					background-color: rgba(100, 100, 100, 0.404);
				}
			}
		}
	}

	.content-box {
		position: relative;
		background-color: rgb(243, 243, 243);
		padding-bottom: 200px;
		height: 80vh;
		.tab {
			position: relative;
			height: 100%;
			width: 100%;
			.tab-head {
				background-color: #fff;
				box-shadow: 0 3px 5px rgb(190, 190, 190);
				margin-bottom: 5px;
				overflow: hidden;
				ul {
					display: flex;
					flex-direction: row;
					.tab-head-item {
						> a {
							position: relative;
							display: block;
							margin: 0 5px;
							padding: 20px 20px;
							color: #000;
							font-size: 0.3rem;
							&:after {
								content: "";
								position: absolute;
								height: 5px;
								width: 0;
								left: 50%;
								bottom: 0;
								transform: translateX(-50%);
								transition: width 0.2s ease-out;
								background-color: #f0af23;
							}
						}
						&:hover,
						&.active {
							font-weight: bold;
							> a:after {
								width: 100%;
							}
						}
					}
				}
			}
			.tab-body {
				height: 80%;
				padding: 10px;
				color: rgb(39, 39, 39);
				margin: 20px;
				padding-bottom: 50px;
				background-color: #fff;
				color: #000;
				border-radius: 4px;
				box-shadow: 2px 2px 5px rgb(206, 206, 206);
				overflow-y: auto;
				overflow-x: hidden;
				&::-webkit-scrollbar {
					width: 10px;
					height: 1px;
				}
				&::-webkit-scrollbar-thumb {
					border-radius: 10px;
					background: #535353;
				}
				ul {
					perspective: 1200px;
				}
			}
			.tab-body-item {
				position: relative;
				height: 100%;
				padding: 10px;
				transform-origin: left center;
				animation: fadeIn_LR 0.5s forwards;
				font-size: 0.28rem;
				&.show {
					display: block;
					/* animation: fadeIn_LR 1s forwards; */
					@keyframes fadeIn_LR {
						0% {
							opacity: 0;
							transform: translateX(25%) rotateY(90deg);
						}
						100% {
							opacity: 1;
							transform: translateX(0) rotateY(0);
						}
					}
					@keyframes fadeOut_RL {
						0% {
							opacity: 1;
							transform: translateX(0);
						}
						100% {
							opacity: 0;
							transform: translateX(25%);
						}
					}
				}
				&.hide {
					animation: fadeOut_RL 1s forwards;
				}
			}
			.info-item {
				position: relative;
				font-size: 1em;
				margin-bottom: 20px;
				.tit {
					color: rgb(131, 131, 131);
					padding: 10px 0 10px 0;
					margin: 0;
					font-size: 1.1em;
				}
				input {
					height: 30px;
					width: 200px;
				}
			}
			.info-item.username {
				.text-box {
					> span {
						font-size: 1em;
					}
				}
				&.show {
					.text-box {
						display: none !important;
					}
					input {
						display: block !important;
					}
				}
			}

			.btn-update-username {
				color: #8d8d8d;
				font-size: 0.8em;
				&:hover,
				&:active {
					color: #b6b6b6;
				}
			}
			.update-info-btn {
				display: inline-block;
				margin-top: 20px;
				padding: 10px 20px;
				color: rgb(255, 255, 255);
				background-color: #e9ab26;
				border-radius: 4px;
				box-shadow: 2px 2px 5px rgb(206, 206, 206);
				&:hover,
				&:active {
					background-color: #f0b12a;
				}
			}
		}
	}

	.modal-box {
		position: absolute;
		flex-direction: column;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.74);
		border-radius: 4px;
		box-shadow: 0 0 5px rgb(155, 155, 155);
		color: #000;
		box-sizing: border-box;
		font-size: 0.26rem;
		z-index: 100000;
		overflow: hidden;
		&.show {
			display: flex;
		}
		.inner {
			position: relative;
			display: flex;
			flex-direction: column;
			padding: 10px;
			width: 90%;
			max-width: 900px;
			height: 90vh;
			left: 50%;
			top: 50px;
			background-color: #ffffff;
			border-radius: 4px;
			transform: translateX(-50%);
			box-shadow: 0 0 5px rgb(97, 97, 97);
			box-sizing: border-box;
			animation: fadeIn_TB 0.5s forwards;
			@keyframes fadeIn_TB {
				0% {
					opacity: 0;
					transform: translate(-50%, 0) scale(2);
				}
				100% {
					opacity: 1;
					transform: translate(-50%, 0) scale(1);
				}
			}
		}
		a {
			color: #000;
		}
		.head-box {
			position: relative;
			border-bottom: 1px solid #b6b6b6;
			.close-btn {
				position: absolute;
				height: 5vh;
				width: 5vh;
				right: 0;
				top: 0;
				transition: transform 0.3s ease;
				transform: rotate(45deg);
				&:hover,
				&:active {
					transform: rotate(-135deg);
				}
				&:after,
				&:before {
					content: "";
					position: absolute;
					left: 50%;
					top: 50%;
					background-color: #000;
					transform: translate(-50%, -50%);
				}
				&:after {
					height: 100%;
					width: 10%;
				}
				&:before {
					height: 10%;
					width: 100%;
				}
			}
		}
		.body-box {
			display: flex;
			flex-grow: 1;
			flex-direction: column;
		}
		.upload-box {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			.tit {
				margin-right: 20px;
			}
		}
		.bottom-box {
			position: relative;
			flex-grow: 1;
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: row;
			.img-wrapper {
				position: relative;
				width: 70%;
				border: 1px solid #dbdbdb;
				box-shadow: 0 0 5px #dbdbdb inset;
				overflow: hidden;
				border-radius: 4px;
				.img-avatar {
					position: relative;
					width: 100%;
					z-index: -1;
				}
			}
			.preview-box {
				position: relative;
				display: flex;
				flex-direction: column;
				margin-left: 20px;
				.preview {
					border: 1px solid #dbdbdb;
					border-radius: 4px;
					overflow: hidden;
					margin-bottom: 20px;
				}
				.small-preview {
					width: 150px;
					height: 150px;
				}
				.small-preview2 {
					width: 75px;
					height: 75px;
				}
			}
		}
		.tool-box {
			position: relative;
			width: 30%;
			margin-top: 20px;
			margin-left: 70%;
			.submit-btn {
				display: block;
				padding: 20px 0;
				width: 100%;
				border-radius: 4px;
				color: rgb(255, 255, 255);
				background-color: #f0af23;
				box-shadow: 0 0 5px #dbdbdb;
				text-align: center;
				font-size: 1.1em;
				line-height: 1.1em;
			}
		}
	}
</style>

<script>
	import ModalComp from "@/components/Modal";
	import VueCropper from "@/components/Cropper";
	export default {
		components: { VueCropper, ModalComp },
		data() {
			return {
				tabIndex: 1,
				isShowModal: false,
				isShowNameInput: false,
				isSubmit: false,
				previews: {},
				img: "",
				avatar: "",
				email: "",
				telNumber: "",
				userName: "",
				tips: {
					isShow: false,
					type: null,
					text: ""
				}
			};
		},
		methods: {
			getUserInfo() {
				let that = this;
				that.$axios.get("/api/v1/user/getUserInfo").then(({ data }) => {
					if (!data.data) return;
					let userInfo = data.data;
					that.avatar = userInfo.avatar;
					that.userName = userInfo.username;
					that.email = userInfo.email;
					that.telNumber = userInfo.telnumber;
					console.log(data);
				});
			},
			getBase64(cropper) {
				cropper.getCropData(data => {
					this.submitNewAvatar(data);
				});
			},
			submitNewAvatar(base) {
				let that = this;
				let requestURL = "/blog/user/uploadAvatar";
				that.$axios
					.post(requestURL, {
						imgBase: base
					})
					.then(({ data }) => {
						if (!data.status) {
							that.tips.type = "err";
							that.tips.text = "提交失败";
						}
						that.tips.type = "success";
						that.tips.text = "提交成功";
					});
			},
			getPreviews(data) {
				this.previews = data;
			},
			uploadImg(e) {
				//上传图片
				// this.option.img
				var file = e.target.files[0];
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
					alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
					return false;
				}
				var reader = new FileReader();
				reader.onload = e => {
					let data;
					if (typeof e.target.result === "object") {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]));
					} else {
						data = e.target.result;
					}
					this.img = data;
				};
				// 转化为base64
				// reader.readAsDataURL(file)
				// 转化为blob
				reader.readAsArrayBuffer(file);
			},
			submitUpdateUserInfo() {
				let that = this;
				that.$axios.post();
			}
		},
		created() {
			this.getUserInfo();
		}
	};
</script>

