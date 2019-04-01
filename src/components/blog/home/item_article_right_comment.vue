<template>
	<div class="comment-top-box">
		<h2>最新评论</h2>
		<loading-item v-if="isRequest"></loading-item>
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
					<img
						class="head-pic"
						v-lazy="'https://www.yansk.cn'+(item.avatar[0]!=null?item.avatar[0].save_path+'thumbnail_'+item.avatar[0].new_name:'/images/user/avatars/default/1.png')"
						alt="头像"
					>
					{{item.author[0].user_name}} :
					<span>{{item.comment_text}}</span>
				</div>
			</a>
		</div>
	</div>
</template>
<style lang="scss">
	.artcomm-list {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		min-height: 200px;
		.arc-tit {
			position: relative;
			margin: 0;
			padding: 0;
			font-size: 0.22rem;
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
			padding: 10px 0;
			font-size: 0.2rem;
			color: rgb(202, 202, 202);

			> img {
				height: 0.4rem;
				vertical-align: bottom;
				margin-right: 5px;
			}
		}
	}
</style>

<script>
	import Loading from "@/components/loading/Loading_02";
	export default {
		components: { "loading-item": Loading },
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

