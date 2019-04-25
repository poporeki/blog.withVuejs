<template>
	<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
		<div class="page-outer">
			<div class="ball-wrapper">
				<div class="inner">
					<div class="ball-wrap">
						<div class="ball" @click="$router.push({path:'/blog/tools/qrcode'})">
							<p>
								<i class="iconfont icon-qrcodescan"></i>
							</p>
						</div>
					</div>
					<div class="ball-wrap">
						<div class="ball" @click="$router.push({path:'/blog/tools/postcode'})">
							<p>
								<i class="iconfont icon-free-postage"></i>
							</p>
						</div>
					</div>
					<div class="ball-wrap" @click="$router.push({path:'/blog/tools/colorpicker'})">
						<div class="ball">
							<p>
								<i class="iconfont icon-format-color-fill"></i>
							</p>
						</div>
					</div>
					<div class="ball-wrap">
						<div class="ball"></div>
					</div>
					<div class="ball-wrap">
						<div class="ball"></div>
					</div>
					<div class="ball-wrap">
						<div class="ball"></div>
					</div>
					<div class="ball-wrap">
						<div class="ball"></div>
					</div>
					<div class="ball-wrap">
						<div class="ball"></div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>


<script>
	export default {};
</script>
<style lang="scss">
	.page-outer {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ball-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 80%;
		min-width: 300px;
		min-height: 400px;
		max-width: 600px;
		max-height: 600px;
		position: relative;
		perspective: 1200px;
		transform-style: preserve-3d;
		.iconfont {
			font-size: 50px;
		}
		.inner {
			position: relative;
			width: 80%;
			height: 80%;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: transform 1s ease;
			animation: rotateInfinite 100s forwards infinite;
			transform-style: preserve-3d;
			&:hover {
				animation-play-state: paused;
			}
			@keyframes rotateInfinite {
				0% {
					transform: scale(1) rotateX(65deg) rotateZ(0);
				}
				40% {
					color: green;
				}
				50% {
					transform: scale(1.2) rotateX(65deg) rotateZ(360deg);
				}
				100% {
					transform: scale(1) rotateX(65deg) rotateZ(720deg);
				}
			}
			.ball {
				position: absolute;
				width: 20%;
				height: 20%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: rgba(50, 146, 66, 0.555);
				border: 3px solid rgb(34, 34, 34);
				box-shadow: 0 0 10px rgb(26, 31, 28);
				transform-origin: left center;
				border-radius: 50%;
				transition: all 0.3s ease;
				perspective: 1200px;
				transform-style: preserve-3d;
				box-sizing: border-box;
				cursor: pointer;
				z-index: 100;
				&:hover {
					background-color: rgba(255, 208, 0, 0.541);
					box-shadow: 0 0 10px rgb(88, 71, 33);
					color: rgba(255, 208, 0, 0.541);
				}
				p {
					position: absolute;
					display: block;
					margin: 0;
					padding: 0;
					transform: translateZ(40px) rotateX(-90deg);
					-webkit-box-reflect: below 0 -webkit-gradient(linear, left top, left
								bottom, from(transparent), to(rgba(250, 250, 250, 0.7)));
				}
			}
			@keyframes out {
				0% {
					width: 20%;
					padding-top: 20%;
				}
				50% {
					width: 30%;
					padding-top: 30%;
				}
				100% {
					width: 20%;
					padding-top: 20%;
				}
			}
			.ball-wrap {
				position: absolute;
				height: 100%;
				width: 100%;
				transform-style: preserve-3d;

				&:nth-child(1) {
					transform: rotate(45deg);
				}
				&:nth-child(2) {
					transform: rotate(90deg);
				}
				&:nth-child(3) {
					transform: rotate(135deg);
				}
				&:nth-child(4) {
					transform: rotate(180deg);
				}
				&:nth-child(5) {
					transform: rotate(225deg);
				}
				&:nth-child(6) {
					transform: rotate(270deg);
				}
				&:nth-child(7) {
					transform: rotate(315deg);
				}
				&:nth-child(8) {
					transform: rotate(360deg);
				}
			}
		}
	}
</style>