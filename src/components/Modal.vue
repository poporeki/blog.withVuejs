<template>
	<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
		<div :class="{'modal-box':true,type} " v-if="isShow">
			<div class="tips-box" v-if="isShow">
				<div class="icon-box">
					<i class="iconfont"></i>
				</div>
				<p>{{text}}</p>
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
	.modal-box {
		position: fixed;
		flex-direction: column;
		display: flex;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		color: #000;
		box-shadow: none;
		box-sizing: border-box;
		z-index: 100000;
		overflow: hidden;
		pointer-events: none;
		&.show {
			display: flex;
		}
		.tips-box {
			display: flex;
			flex-direction: row;
			align-content: center;
			justify-content: center;
			background-color: #fff;
			border-radius: 4px;
			padding: 10px 20px;
			box-shadow: 0 0 5px rgb(56, 56, 56);
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
	}
	.fadeIn {
		animation: fadeIn 2s forwards;
	}

	@keyframes fadeIn {
		0% {
			transform: scale(0);
		}
		40% {
			transform: scale(1.2);
		}
		50% {
			transform: scale(1);
		}
		60% {
			transform: scale(1, 0.5) rotate(-10deg) translateX(-10px);
		}
		65% {
			transform: scale(1, 0.5) rotate(10deg) translateX(10px);
		}
		70% {
			transform: scale(1, 0.5) rotate(-10deg) translateX(-10px);
		}
		75% {
			transform: scale(1, 0.5) rotate(10deg) translateX(10px);
		}
		80% {
			transform: scale(1, 0.5) rotate(-10deg) translateX(-10px);
		}
		85% {
			transform: scale(1, 0.5) rotate(10deg) translateX(10px);
		}
		90% {
			transform: scale(1, 0.5) rotate(-10deg) translateX(-10px);
		}
		95% {
			transform: scale(1, 0.5) rotate(10deg) translateX(10px);
		}
		100% {
			transform: rotate(0) translateX(0);
		}
	}
	.fadeOut {
		animation: fadeOut 1s forwards;
	}
	@keyframes fadeOut {
		0% {
			opacity: 1;
			transform: scale(1);
		}
		70% {
			opacity: 1;
			transform: scale(0.8);
		}
		100% {
			opacity: 0;
			transform: scale(3);
		}
	}
</style>



<script>
	export default {
		data() {
			return {
				isShow: false
			};
		},
		props: ["text", "type"],
		methods: {
			showModal() {
				if (this.isShow === true) return;
				let that = this;
				that.isShow = true;
				setTimeout(function() {
					that.isShow = false;
				}, 5000);
			}
		},
		watch: {
			text(val, oldVal) {
				if (val === oldVal || val === "") return;
				this.showModal();
			},
			type(val) {
				if (val === "") return;
				this.showModal();
			}
		}
	};
</script>
