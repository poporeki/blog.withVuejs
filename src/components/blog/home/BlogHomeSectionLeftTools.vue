<template>
	<section class="tools">
		<rule-line></rule-line>
		<h4 class="title">
			工具
			<small>
				<router-link to="/blog/tools">More</router-link>
			</small>
		</h4>
		<ul class="tool-list">
			<li class="tool-list-item">
				<router-link to="/blog/tools/qrcode">
					<div class="tool-box">
						<div class="tool-icon">
							<i class="iconfont icon-qrcodescan"></i>
						</div>
						<div class="tool-content">
							<div class="tit">二维码生成器</div>
							<div class="info">根据输入内容生成二维码</div>
						</div>
					</div>
				</router-link>
			</li>
			<li class="tool-list-item">
				<router-link to="/blog/tools/postcode">
					<div class="tool-box">
						<div class="tool-icon">
							<i class="iconfont icon-free-postage"></i>
						</div>
						<div class="tool-content">
							<div class="tit">邮政编码查询</div>
							<div class="info">根据地址查询邮编，或根据邮编查询地址</div>
						</div>
					</div>
				</router-link>
			</li>
			<li class="tool-list-item">
				<router-link to="/blog/tools/colorPicker">
					<div class="tool-box">
						<div class="tool-icon">
							<i class="iconfont icon-format-color-fill"></i>
						</div>
						<div class="tool-content">
							<div class="tit">拾色器</div>
							<div class="info">颜色拾取</div>
						</div>
					</div>
				</router-link>
			</li>
			<li class="tool-list-item">
				<router-link to="/blog/tools/htmlentity">
					<div class="tool-box">
						<div class="tool-icon">
							<i class="iconfont icon-html-close-tag"></i>
						</div>
						<div class="tool-content">
							<div class="tit">Html特殊字符表</div>
							<div class="info">Html特殊字符表</div>
						</div>
					</div>
				</router-link>
			</li>
			<li class="tool-list-item">1</li>
		</ul>
	</section>
</template>


<script>
	import RuleLine from "@/components/RuleLine.vue";
	export default {
		components: { RuleLine }
	};
</script>

<style lang="scss">
	@import "~@/assets/iconfont/tools/iconfont.css";
	section.tools {
		display: flex;
		flex-basis: 100%;
		flex-direction: column;
		font-size: 1rem;
		@media (max-width: 768px) {
			.tool-list-item {
				flex-basis: 50%;
			}
		}
		@media (max-width: 360px) {
			.tool-list-item {
				flex-basis: 100%;
			}
		}
	}
	.tools {
		.title {
			a {
				transition: color 0.3s ease;
				&:hover {
					color: rgb(209, 209, 209);
				}
			}
		}
	}
	.tool-list {
		display: flex;
		flex-direction: row;
		margin: 20px 0;
		flex-wrap: wrap;
		.tool-list-item {
			flex-basis: 25%;
			padding: 20px;
			box-sizing: border-box;
			transition: box-shadow 0.3s ease;
			&:hover {
				box-shadow: 0 2px 5px rgb(110, 110, 110);
				.iconfont {
					color: rgb(172, 43, 43);
				}
			}
		}
	}
	.tool-icon .iconfont {
		transition: color 0.6s ease;
		font-size: 3rem;
	}
	.tool-box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	.tool-content {
		padding-left: 10px;
		.tit {
			font-size: 1em;
			font-weight: bold;
		}
		.info {
			padding-top: 5px;
			font-size: 0.8em;
			word-wrap: break-word;
			color: rgb(155, 155, 155);
		}
	}
</style>
