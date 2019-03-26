

<template>
	<!-- |---------------------|
       |      O       O      |
       |---------------------|
	-->
	<div class="loading-ani-item"></div>
</template>

<style lang="scss">
	.loading-ani-item {
		position: relative;
		padding: 10px;

		&:after,
		&:before {
			content: "";
			position: absolute;
			width: 10px;
			height: 10px;
			top: 50%;
			margin-top: -5px;
			animation-duration: 2s;
			animation-fill-mode: both;
			animation-name: loadAni;
			animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
			animation-iteration-count: infinite;
			z-index: 1000;
		}

		&:after {
			left: 45%;
			margin-left: -5px;
			background-color: #60bb46;
			box-shadow: 0 0 5px #82b674;
		}

		&:before {
			left: 55%;
			margin-left: -5px;
			background-color: rgb(196, 34, 134);
			box-shadow: 0 0 5px rgb(194, 101, 158);
			animation-delay: 0.2s;
		}

		@keyframes loadAni {
			0% {
				border-radius: 0;
				opacity: 1;
				transform: scale(0);
			}

			50% {
				border-radius: 50%;
				opacity: 1;
				transform: scale(1);
			}

			100% {
				border-radius: 50%;
				opacity: 0;
				transform: scale(2);
			}
		}
	}
</style>

