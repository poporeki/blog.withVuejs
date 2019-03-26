
<template>
	<footer>
		<div class="footer-inner">
			<ul class="lk-list">
				<li class="lk-item">
					<a href="http://www.bootcss.com" class="lk" target="_blank">Bootstrap</a>
					<a href="https://icomoon.io/" class="lk" target="_blank">Icomoon</a>
					<a href="https://iconmonstr.com/" class="lk" target="_blank">Iconmonstr</a>
					<a href="http://www.favicon.cc/" class="lk" target="_blank">favicon</a>
				</li>
				<li class="lk-item">
					<a href="http://mux.alimama.com/fonts" class="lk" target="_blank">UX图标字体库</a>
					<a href="http://browsershots.org/" class="lk" target="_blank">Browsershot</a>
					<a href="http://www.ddfont.com/" class="lk" target="_blank">ddfont英文字体</a>
					<a href="http://www.github.com" class="lk" target="_blank">Github</a>
				</li>
				<li class="lk-item">
					<a href="https://daneden.github.io/animate.css/" class="lk" target="_blank">AnimateCSS</a>
					<a href="http://www.w3school.com.cn/" class="lk" target="_blank">w3school</a>
					<a href="http://www.96yx.com/tool/ASC2.htm" class="lk" target="_blank">ASCII码表</a>
					<a href="https://thefwa.com/awards/page/1/" class="lk" target="_blank">thefwa</a>
				</li>
			</ul>
			<div class="copy-box">
				<h2 class="text-center">
					&copy; 2018
					<br>
					<strong>BY YANSK</strong>
				</h2>
				<h6>Four short words sum up what has lifted most successful individuals above the crowd: a little bit more.</h6>
			</div>
		</div>
	</footer>
</template>
<style lang="scss">
	footer {
		position: relative;
		width: 100%;
		bottom: 0;
		margin: 0 auto;
		margin-top: 100px;
		min-height: 100px;
		border-top: 1px solid rgb(58, 58, 58);
		transition: background-color 0.3s ease;
		background-color: rgb(0, 0, 0);
		background-image: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 1)
		);
		@media (max-width: 400px) {
			font-size: 10px;
		}
		@media (max-width: 850px) {
			.footer-inner {
				flex-direction: column !important;
				.copy-box {
					flex-basis: 100%;
					text-align: center;
				}
			}
		}
		@media (min-width: 851px) {
			.copy-box {
				max-width: 300px;
			}
		}
		.footer-inner {
			display: flex;
			flex-direction: row;
			margin: 0 auto;
			.lk-list {
				display: flex;
				flex-grow: 1;
				flex-direction: row;
				padding: 20px;
				box-sizing: border-box;
				@media (max-width: 360px) {
					& {
						flex-direction: column;
					}
				}
				.lk-item {
					display: flex;
					flex-grow: 1;
					flex-direction: column;
					align-items: center;
					> .lk {
						position: relative;
						display: block;
						max-width: 250px;
						padding: 10px 15px;
						box-sizing: border-box;
						text-align: center;
						text-shadow: 0 0 5px #2c2f34;
						font-size: 0.26rem;
						&:after {
							content: "";
							position: absolute;
							height: 2px;
							width: 0;
							bottom: 0;
							left: 50%;
							transform: translateX(-50%);
							transition: width 0.3s ease;
							background-color: rgb(230, 230, 230);
						}
						&:hover {
							&:after {
								width: 100%;
							}
						}
					}
				}
			}
			.copy-box {
				padding: 15px;
				box-sizing: border-box;
			}
		}
	}
</style>
