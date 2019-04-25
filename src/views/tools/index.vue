<template>
	<transition enter-active-class="animated fadeInUp">
		<div class="wrapper">
			<div class="page-inner">
				<div class="left-section">
					<div class="tool-title">
						<h2>{{pageTitle}}</h2>
						<p>{{pageTitleDescription}}</p>
					</div>
					<div class="tool-box">
						<router-view></router-view>
					</div>
					<div class="back-lk" @click="$router.go(-1)">
						<div class="square arrow"></div>
						<div class="square arrow"></div>
						<div class="square"></div>
					</div>
				</div>
				<div class="right-section"></div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		computed: {
			pageTitle() {
				return this.$route.meta.title || "";
			},
			pageTitleDescription() {
				return this.$route.meta.titleDescription || "";
			}
		}
	};
</script>


<style lang="scss">
	.wrapper {
		.tool-title {
			padding: 10px 0;
			> h2 {
				display: inline-block;
				padding: 5px 0;
				border-bottom: 2px solid #f8bc3a;
			}
			> p {
				margin: 0;
				color: rgb(117, 117, 117);
			}
		}

		.page-inner {
			position: relative;
			display: flex;
			justify-content: space-between;
			padding: 20px;
			z-index: 2;
			.left-section {
				flex-grow: 1;
			}
			&::before {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: -1;
				filter: blur(1px);
			}
		}
	}
	.back-lk {
		position: absolute;
		width: 50px;
		height: 50px;
		right: 10px;
		top: 10px;
		cursor: pointer;
		&:hover {
			.square {
				&:nth-child(1) {
					transform: rotate(-20deg);
				}
				&:nth-child(2) {
					transform: rotate(20deg);
				}
			}
		}
		.square {
			position: absolute;
			height: 20%;
			width: 100%;
			background-color: #f8bc3a;
			border-radius: 20%;
			transition: transform 0.3s ease;
			&:nth-child(1),
			&:nth-child(2) {
				transform-origin: 8% center;
			}
			&:nth-child(1) {
				transform: rotate(-30deg);
			}
			&:nth-child(2) {
				transform: rotate(30deg);
			}
			&:nth-child(3) {
				width: 50%;
				right: 0;
			}
		}
	}
</style>

