<template>
	<transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
		<div class="btn btn-default back-to-top" id="back_to_top" @click="backToTop" v-show="isShow">
			<div class="back-to-top-inner">
				<span class="glyphicon glyphicon-chevron-up"></span>TOP
			</div>
		</div>
	</transition>
</template>


<script>
	export default {
		data() {
			return {
				isShow: false
			};
		},
		methods: {
			onScroll(e) {
				let body = e.target.body;
				let scrollTop = body.getBoundingClientRect().top;
				this.isShow = scrollTop < 0 ? true : false;
			},
			backToTop() {
				let scrollTop = document.documentElement.scrollTop;
				// window.scroll(0, 0)
				// document.documentElement.scrollTop = 0;
				// requestAnimationFrame(this.toTopAnimation);
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			},
			toTopAnimation() {
				if (document.documentElement.scrollTop === 0) return;
				document.documentElement.scrollTop =
					document.documentElement.scrollTop - 100;
				requestAnimationFrame(this.toTopAnimation);
			}
		},
		mounted() {
			this.$nextTick(function() {
				document.addEventListener("scroll", this.onScroll);
			});
		},
		destroyed() {
			document.removeEventListener("scroll", this.onScroll);
		}
	};
</script>


<style lang="scss" scoped>
	.back-to-top {
		position: fixed;
		width: 50px;
		height: 50px;
		bottom: 20px;
		right: 20px;
		background-color: #fff;
		border: 1px solid rgb(180, 180, 180);
		border-radius: 50%;
		box-sizing: border-box;
		padding: 10px;
		z-index: 999;
		cursor: pointer;
		/* &::before {
				content: "回到顶部";
				position: absolute;
				display: flex;
				height: 100%;
				justify-content: center;
				align-items: center;
				top: 0;
				left: -100%;
				margin-left: -1rem;
				transition: transform 0.3s ease;
				transform: translateX(100%) scale(0);
			}
			&:hover {
				&::before {
					transform: translateX(0) scale(1);
				}
			} */
		.back-to-top-inner {
			position: relative;
			height: 100%;
			width: 100%;
			transform: rotate(180deg);
			&:after,
			&:before {
				content: "";
				position: absolute;
				width: 50%;
				height: 2px;
				top: 50%;
				background-color: #000;
			}

			&:hover {
				&:after {
					left: 2%;
					transform: rotate(20deg);
				}

				&:before {
					right: 2%;
					transform: rotate(-20deg);
				}
			}

			&:active {
				transform: rotate(180deg) scale(0.95);

				&:after {
					left: 6%;
					transform: rotate(220deg);
				}

				&:before {
					right: 6%;
					transform: rotate(-220deg);
				}
			}

			&:after {
				left: 6%;
				transform: rotate(40deg);
				transition: 0.2s all ease;
			}

			&:before {
				right: 6%;
				transform: rotate(-40deg);
				transition: 0.2s all ease;
			}
		}
	}
</style>

