<template>
	<div class="wrap">
		<div class="box">
			<div class="wid-box">
				<div class="lt"></div>
				<div class="rt"></div>
			</div>
			<div class="con-box">
				<h1 class="title">WTF!!! -Page Not Found</h1>
				<router-link to="/" class="back-btn">回去首页</router-link>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	$bgColor: #446072;
	$boxColor: #566f7f;
	$fontColor: #fff;
	.wrap {
		width: 100vw;
		height: 100vh;
		background-color: $bgColor;
	}
	.con-box {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 100%;
		color: $fontColor;
		overflow: hidden;
		.title,
		.back-btn {
			position: relative;
			text-shadow: 0 0 5px rgb(59, 59, 59);
		}
		.title {
			font-size: 24px;
		}
		.back-btn {
			position: absolute;
			display: block;
			color: rgba(236, 236, 236, 0.568);
			font-size: 0.25rem;
			bottom: 10%;
			right: 10%;
			text-decoration: none;
			transition: all 0.5s ease;
		}

		.back-btn:hover {
			color: rgb(214, 214, 214);
		}
	}

	.box {
		position: absolute;
		height: 40%;
		width: 50%;
		max-width: 600px;
		max-height: 400px;
		top: 50%;
		left: 50%;
		border: 5px solid #374d5b;
		background-color: $boxColor;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.747) inset;
		border-radius: 10px;
		transform: translate(-50%, -50%);
		text-align: center;
		box-sizing: border-box;
		cursor: pointer;
	}

	.wid-box {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		left: 0;
		top: 0;
		box-sizing: border-box;
		perspective: 1200px;
		pointer-events: none;
		z-index: 100;
	}

	.wid-box .lt,
	.wid-box .rt {
		position: relative;
		width: 50%;
		height: 100%;

		box-sizing: border-box;
		border-radius: 5px;
		border: 2px solid rgb(53, 73, 85);
		background-color: #374d5b;
		transition: transform 1s ease;
	}

	.wid-box .lt:after,
	.wid-box .rt:after {
		content: "";
		position: absolute;
		height: 15%;
		width: 10%;
		top: 50%;
		transform: translateY(-50%);
		background-color: #314552;
		border-radius: 50%;
	}

	.wid-box .lt:after {
		right: 10px;
	}

	.wid-box .rt:after {
		left: 10px;
	}

	.wid-box .lt {
		transform-origin: left center;
		animation: ltAni 1s 1s forwards;
	}

	.wid-box .rt {
		transform-origin: right center;
		animation: rtAni 1s 1s forwards;
	}

	@keyframes ltAni {
		0% {
			transform: rotateY(0);
		}
		100% {
			transform: rotateY(-100deg);
		}
	}

	@keyframes rtAni {
		0% {
			transform: rotateY(0);
		}
		100% {
			transform: rotateY(100deg);
		}
	}
</style>
