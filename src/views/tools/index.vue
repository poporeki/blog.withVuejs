<template>
	<div class="wrapper">
		<div class="page-inner">
			<div class="left-section">
				<div class="tool-title">
					<h2>二维码生成器</h2>
				</div>
				<div class="tool-box">
					<router-view></router-view>
				</div>
			</div>
			<div class="right-section"></div>
		</div>
	</div>
</template>

<style lang="scss">
	.wrapper {
		.tool-title {
			padding: 10px 0;
			> h2 {
				display: inline-block;
				padding: 5px 0;
				border-bottom: 2px solid #f8bc3a;
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
</style>

