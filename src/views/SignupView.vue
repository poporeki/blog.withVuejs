<template>
	<div class="su-wrapper">
		<div class="su-title">
			<h1>注册账号</h1>
		</div>
		<form class="su-box">
			<ul class="form-list">
				<li class="form-item u-name">
					<div class="tit-box">
						用户名
						<small>(仅允许中文、英文、数字、'_',长度4-12位)</small>
					</div>
					<div class="body-box">
						<input
							type="text"
							data-status="0"
							maxlength="12"
							autocomplete="off"
							:class="{username:true,true:valid.userName.isChecked&&!valid.userName.errorStatus,error:valid.userName.isChecked&&valid.userName.errorStatus}"
							name="uname"
							val="账号"
							v-model="valid.userName.text"
							@keyup.enter="submitForm"
							@keyup.prevent="checkInput('userName')"
						>
						<transition
							enter-active-class="animated fadeInDown"
							leave-active-class="animated fadeOutUp"
							v-if="valid.userName.isChecked&&valid.userName.errorStatus===true"
						>
							<div :class="{'tips-box':true,error:true}">{{valid.userName.tips}}</div>
						</transition>
					</div>
				</li>
				<li class="form-item u-password">
					<div class="tit-box">密码</div>
					<div class="body-box">
						<input
							type="password"
							id="password"
							:class="{password:true,true:valid.password.isChecked&&!valid.password.errorStatus,error:valid.password.isChecked&&valid.password.errorStatus}"
							name="upwd"
							val="账号"
							v-model="valid.password.text"
							@keyup.enter="submitForm"
							@keyup.prevent="checkInput('password')"
						>
						<transition
							enter-active-class="animated fadeInDown"
							leave-active-class="animated fadeOutUp"
							v-if="valid.password.isChecked&&valid.password.errorStatus"
						>
							<div :class="{'tips-box':true,error:true}">{{valid.password.tips}}</div>
						</transition>
					</div>
				</li>
				<li class="form-item check-password">
					<div class="tit-box">确认密码</div>
					<div class="body-box">
						<input
							type="password"
							:class="{'check-password':true,true:valid.confirmPassword.isChecked&&!valid.confirmPassword.errorStatus,error:valid.confirmPassword.isChecked&&valid.confirmPassword.errorStatus}"
							name="a-password"
							val="账号"
							v-model="valid.confirmPassword.text"
							@keyup.enter="submitForm"
							@keyup.prevent="checkInput('confirmPassword')"
						>
						<transition
							enter-active-class="animated fadeInDown"
							leave-active-class="animated fadeOutUp"
							v-if="valid.confirmPassword.isChecked&&valid.confirmPassword.errorStatus"
						>
							<div :class="{'tips-box':true,error:true}">{{valid.confirmPassword.tips}}</div>
						</transition>
					</div>
				</li>
				<li class="form-item captcha">
					<div class="tit-box">验证码</div>
					<div class="body-box">
						<input
							type="text"
							:class="{captcha:true,true:valid.captcha.isChecked&&!valid.captcha.errorStatus,error:valid.captcha.isChecked&&valid.captcha.errorStatus}"
							autocomplete="off"
							name="su_captcha"
							val="账号"
							maxlength="5"
							v-model="valid.captcha.text"
							@keyup.enter="submitForm"
							@keyup.prevent="checkInput('captcha')"
						>
						<img :src="valid.captcha.captchaData" alt="captcha" class="captcha-img" @click="getCaptcha">
						<transition
							enter-active-class="animated fadeInDown"
							leave-active-class="animated fadeOutUp"
							v-if="valid.captcha.isChecked&&valid.captcha.errorStatus"
						>
							<div :class="{'tips-box':true,error:true}">{{valid.captcha.tips}}</div>
						</transition>
					</div>
				</li>
			</ul>
			<a href="javascript:void(0);" class="su-submit-btn" @click.prevent="submitForm">注册</a>
			<div class="loading-ani" v-if="isRequest"></div>
			<div :class="{'su-tips':true,show:this.submitForm_tips!==''}">
				<span>
					{{submitForm_tips}}
					<small></small>
				</span>
			</div>
		</form>
	</div>
</template>

<style lang="scss">
	@import "../assets/scss/mixins/_set-color.scss";
	@import "../assets/scss/mixins/_animation.scss";
	.loading-ani {
		position: absolute;
		width: 100%;
		height: 2px;
		top: 0;
		left: 0;
		animation: subLoadAni 2s infinite;
		background-color: rgba(115, 223, 27, 0.582);
		z-index: 4;
		@keyframes subLoadAni {
			0% {
				transform: scale(0);
				opacity: 0;
			}
			50% {
				transform: scale(1);
				opacity: 1;
			}
			100% {
				transform: scale(2);
				opacity: 0;
			}
		}
	}

	.su-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: $color-block-wrap;
		transform: translate(-50%, -50%);
		input {
			border: none;
			box-sizing: border-box;
		}
		.su-title {
			padding: 20px;
			border-bottom: 1px solid rgb(85, 85, 85);
			> h1 {
				font-size: 24px;
			}
		}
		.su-box {
			position: relative;
			padding: 50px;
			overflow: hidden;
			.su-tips {
				position: absolute;
				visibility: hidden;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 100%;
				background-color: black;
				transition: transform 0.5s ease;
				z-index: 5;
				& > span {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 6;
				}
				&.show {
					visibility: visible;
					animation: scaleIn_2x 0.5s ease;
				}
			}
			.form-list {
				display: flex;
				flex-direction: column;
				> .form-item {
					position: relative;
					margin-bottom: 20px;
					.tit-box {
						margin-bottom: 10px;
						color: rgb(175, 175, 175);
						small {
							color: rgb(112, 112, 112);
						}
					}
					input {
						position: relative;
						height: 40px;
						width: 300px;
						padding: 5px 10px;
						padding-right: 30px;
						box-sizing: border-box;
						color: rgb(112, 112, 112);
						border: 1px solid rgba(0, 0, 0, 0);
						z-index: 2;
						background-color: $highlight-color-block-wrap;
						transition: border 1s ease;
						&.error {
							border: 1px solid rgb(201, 135, 49);
						}
						&.true {
							border: 1px solid $color-green;
						}
					}
					&.captcha {
						input {
							letter-spacing: 15px;
							padding-right: 150px;
						}
						.captcha-img {
							position: absolute;
							display: block;
							height: 100%;
							width: 100px;
							right: 0;
							cursor: pointer;
							z-index: 3;
						}
					}
				}
			}
			.su-submit-btn {
				display: block;
				margin-top: 20px;
				padding: 10px 0;
				text-align: center;
				background-color: $color-green;
				transition: background-color 0.3s ease;
				letter-spacing: 10px;
				&:hover {
					background-color: $highlight-color-green;
				}
			}
			.body-box {
				position: relative;
				display: flex;
				flex-direction: row;
			}
			.tips-box {
				position: absolute;
				height: 50%;
				width: 100%;
				bottom: -50%;
				right: 0;
				z-index: 1;
				transition: transform 0.3s ease;
				&.show {
					transform: translateY(100%);
				}
				&.error {
					color: rgb(201, 135, 49);
				}
				&.true {
					color: rgb(52, 163, 61);
				}
			}
		}
	}
</style>


<script>
	export default {
		data() {
			return {
				//验证信息相关
				valid: {
					userName: {
						isChecked: false,
						text: "",
						rule: /^[\D]{1}([\u4e00-\u9fa5\-\w]){3,11}$/,
						errorStatus: false,
						style: {
							error: false,
							true: false
						},
						tips: "",
						checkUrl: ""
					},
					password: {
						isChecked: false,
						text: "",
						rule: /^\S{6,20}$/,
						errorStatus: false,
						tips: ""
					},
					confirmPassword: {
						isChecked: false,
						errorStatus: false,
						text: "",
						tips: ""
					} /* ,
																																														phoneNumber: {
																																															isChecked: false,
																																															text: "",
																																															rule: /^1[3-9]\d{9}$/,
																																															errorStatus: false,
																																															tips: ""
																																														} */,
					captcha: {
						captchaData: "",
						isChecked: false,
						text: "",
						errorStatus: false,
						tips: ""
					}
				},
				submitForm_tips: "",
				isRequest: false
			};
		},
		methods: {
			getCaptcha() {
				let that = this;
				that.$axios
					.post("/verify/refreshCaptcha", {
						isGlobalLoading: false
					})
					.then(({ data }) => {
						if (!data && !data.data) return;
						that.valid.captcha.captchaData = data.data;
					});
			},
			checkInput(text) {
				let that = this;
				that.valid[text].isChecked = true;
				let targetText = that.valid[text].text;
				let trimed = targetText.trim();
				if (trimed === null || trimed === "") {
					that.valid[text].tips = "输入内容不能为空";
					that.valid[text].errorStatus = true;
					return;
				}
				switch (text) {
					case "password": {
						let uPwd = that.valid.password;
						let reg = uPwd.rule;
						let isTrue = reg.test(uPwd.text);
						if (!isTrue) {
							uPwd.errorStatus = true;
							uPwd.tips = "密码格式不正确，请输入正确的格式";
							return;
						}
						uPwd.errorStatus = false;
						break;
					}
					case "confirmPassword": {
						let cfPwd = that.valid.confirmPassword;
						if (that.valid.password.text !== cfPwd.text) {
							cfPwd.errorStatus = true;
							cfPwd.tips = "密码不一致，请输入正确密码";
							return;
						}
						cfPwd.errorStatus = false;
						break;
					}
					case "userName": {
						let uName = that.valid.userName;
						let reg = uName.rule;
						let nameContent = uName.text;
						let isTrue = reg.test(uName.text);
						if (!isTrue) {
							uName.errorStatus = true;
							uName.tips = "用户名格式不正确,请重新输入";
							return;
						}
						that.$axios
							.post("/verify/checkUserName", {
								username: nameContent,
								isGlobalLoading: false
							})
							.then(({ data }) => {
								if (!data) {
									uName.errorStatus = true;
									uName.tips = "此名字已被注册";
									return;
								}
								uName.errorStatus = false;
							});
						break;
					}

					case "captcha": {
						let capt = that.valid.captcha;
						let content = capt.text;
						that.$axios
							.post("/verify/checkCaptcha", {
								str: content,
								isGlobalLoading: false
							})
							.then(({ data }) => {
								if (!data) {
									capt.errorStatus = true;
									capt.tips = "验证码输入错误";
									return;
								}
								capt.errorStatus = false;
							});
						break;
					}
				}
			},
			tipsStyle(target) {
				return {
					"tips-box": true,
					error: this.valid[target].isChecked && this.valid[target].errorStatus,
					true:
						this.valid[target].isChecked &&
						this.valid[target].errorStatus === false
				};
			},
			checkForm() {},
			/* 提交表单 */
			submitForm() {
				let that = this;
				let data = this.valid;
				for (var item in data) {
					if (data[item].errorStatus !== false || data[item].isChecked !== true) {
						that.submitForm_tips = "请检查注册信息后再提交注册请求";
						return;
					}
				}
				that.isRequest = true;
				debugger;
				that.$axios
					.post("/reg", {
						isGlobalLoading: false,
						uname: that.valid.userName.text,
						upwd: that.valid.password.text
					})
					.then(({ data }) => {
						that.isRequest = false;
						if (!data.status) {
							that.submitForm_tips = data.msg;
						}
						that.submitForm_tips = "注冊成功，即將跳往登陸頁面";
						setTimeout(() => {
							that.$router.push({
								path: "/login"
							});
						}, 3000);
					})
					.catch(() => {
						that.isRequest = false;
					});
			}
		},
		watch: {
			submitForm_tips() {
				setTimeout(() => {
					this.submitForm_tips = "";
				}, 3000);
			}
		},
		created() {
			//获取验证码
			this.getCaptcha();
		}
	};
</script>
