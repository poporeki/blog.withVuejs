<template>
	<div class="comment-top-box">
		<h4>最新评论</h4>
		<Loading v-if="isRequest"></Loading>
		<div @click="getNewArtCommList" v-if="isRequestError">获取失败，点击重试</div>
		<div class="artcomm-list" v-if="!isRequest">
			<a
				v-for="item in commlist"
				:key="item.id"
				class="comm-lk"
				:href="'/blog/article/'+item.article[0]._id+'#comment'"
			>
				<h6 class="arc-tit" :title="item.article[0].title">{{item.article[0].title}}</h6>
				<div class="arc-comm">
					<div class="user-avatar-pic">
						<img
							class="head-pic"
							v-lazy="'https://v.yansk.cn'+(item.avatar[0]!=null?item.avatar[0].save_path+'thumbnail_'+item.avatar[0].new_name:'/images/user/avatars/default/1.png')"
							alt="头像"
						>
					</div>
					<div class="text-info">
						<span class="user-name">{{item.author[0].user_name}}</span>
						<span class="comm-text">{{item.comment_text}}</span>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
	import Loading from "@/components/loading/Loading_02";
	export default {
		components: { Loading },
		data() {
			return {
				isRequest: false,
				isRequestError: false,
				commlist: []
			};
		},
		methods: {
			getNewArtCommList() {
				let that = this;
				that.isRequest = true;
				that.isRequestError = false;
				this.$axios
					.get("/api/v1/article/comment/gettop")
					.then(({ data }) => {
						that.isRequest = false;
						that.commlist = data;
					})
					.catch(() => {
						that.isRequest = false;
						that.isRequestError = true;
					});
			}
		},
		created() {
			this.getNewArtCommList();
		}
	};
</script>

<style lang="scss">
	.comment-top-box {
		position: relative;
		min-height: 200px;
	}
	.artcomm-list {
		display: flex;
		position: relative;
		flex-wrap: wrap;
		align-items: stretch;

		.arc-tit {
			position: relative;
			margin: 0;
			padding: 0;
			font-size: 1rem;
		}

		.comm-lk {
			display: block;
			flex-grow: 1;
			margin-bottom: 5px;
			padding: 10px;
			color: rgb(255, 255, 255);
			border-bottom: 3px solid rgb(148, 148, 148);

			box-sizing: border-box;
			transition: border-radius 0.5s ease, background-color 0.3s ease;

			&:hover {
				border-bottom-left-radius: 20%;
				border-bottom-right-radius: 20%;
				background-color: rgb(99, 99, 99);
			}
		}

		.arc-comm {
			display: flex;
			flex-direction: row;
			padding: 10px 0;
			font-size: 0.8rem;
			color: rgb(202, 202, 202);
			.user-avatar-pic {
				flex-shrink: 0;
				height: 3rem;
				width: 3rem;
				position: relative;
				border-radius: 50%;
				overflow: hidden;

				> img {
					max-height: 100%;
					vertical-align: bottom;
					margin-right: 5px;
				}
			}
			.user-name {
				font-weight: 500;
				letter-spacing: 5px;
				color: rgba(255, 255, 255, 0.349);
				text-transform: uppercase;
			}
			.text-info {
				display: flex;
				flex-direction: column;
				.comm-text {
					padding-left: 20px;
					flex-grow: 1;
				}
			}
		}
	}
</style>
