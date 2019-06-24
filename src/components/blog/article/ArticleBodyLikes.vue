<template>
	<div class="like-box">
		<a
			href="javascript:void(0);"
			@click="requestLike"
			:class="{'btn-article-like':true,'liked':isLiked}"
		>
			<span class="like-number">{{likesCount}}</span>
			<span class="iconfont icon-like"></span>
		</a>
	</div>
</template>

<style lang="scss" scoped>
	.like-box {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10vh 0 0 0;

		.btn-article-like {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			width: 20vw;
			height: 20vw;
			max-height: 100px;
			max-width: 100px;
			border-radius: 50%;
			background-color: #4cc37e;
			box-shadow: 0 0 1px #000;
			transition: transform 0.3s ease, background-color 0.3s ease,
				box-shadow 0.5s ease;
			font-family: "Architects Daughter", cursive;

			.like-number {
				font-size: 2rem;
			}

			.loading-ani {
				border-radius: 50%;
			}
			&::after {
				content: "";
				position: absolute;
				height: 100%;
				width: 100%;
				left: 0;
				top: 0;
				border-radius: 50%;
			}
			&:hover {
				background-color: #59e995;
				&::after {
					animation: lightScale 3s 0.1s infinite;
				}
			}
		}

		@keyframes lightScale {
			0% {
				transform: scale(1);
				box-shadow: 0 0 20px #38915a, 0 0 20px #38915a inset;
				opacity: 0;
			}
			50% {
				transform: scale(1);
				opacity: 1;
				box-shadow: 0 0 20px #38915a, 0 0 20px #38915a inset;
			}
			70% {
				opacity: 1;
				box-shadow: 0 0 20px #38915a, 0 0 20px #38915a inset;
			}
			100% {
				box-shadow: 0 0 20px #d48712, 0 0 20px #d38919 inset;
				transform: scale(2);
				opacity: 0;
			}
		}
		.liked {
			background-color: #cc8851;
			box-shadow: 0 0 20px #cc8851;

			&:hover {
				background-color: #cc8851;
			}

			.iconfont {
				color: rgb(255, 81, 0);
			}
		}

		.iconfont {
			display: inline-block;
			color: rgb(100, 100, 100);
			transition: transform 1s ease, color 0.3s ease;
		}
	}
</style>

<script>
	export default {
		props: ["arcid", "likesTotal", "userIsLiked"],
		computed: {
			likesCount() {
				return this.likesTotal;
			},
			isLiked() {
				return this.userIsLiked ? true : false;
			},
			class() {
				return this.userIsLiked ? "btn-article-like liked" : "btn-article-like";
			}
		},
		methods: {
			requestLike() {
				let that = this;

				that.$axios
					.post("/api/v1/article/like", {
						arcid: that.arcid,
						isGlobalLoading: false
					})
					.then(({ data }) => {
						that.isLiked = data && data.data && data.data.isLiked ? true : false;
						if (data.msg !== undefined) {
							that.likesCount = data.msg;
						}
					});
			}
		}
	};
</script>


