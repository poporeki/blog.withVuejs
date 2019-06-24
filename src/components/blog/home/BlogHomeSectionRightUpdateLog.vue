<template>
	<div class="update-log-box">
		<h4 class="title">
			更新日志
			<small>
				<router-link to="/blog/log">More</router-link>
			</small>
		</h4>
		<Loading :isLoading="isRequest"></Loading>
		<ul class="log-list">
			<li class="log-list-item" v-for="item in logList" :key="item.id">
				<div class="u-time">
					<i class="iconfont bottom icon-time"></i>:
					<span>{{item.create_time}}</span>
				</div>
				<div class="u-cnt">
					更新内容:
					<span>{{item.log_content}}</span>
				</div>
			</li>
			<li class="log-end">...</li>
		</ul>
	</div>
</template>

<script>
	import Loading from "@/components/loading/Loading_02";
	export default {
		data() {
			return {
				logList: [],
				isRequest: false
			};
		},
		components: { Loading },
		methods: {
			getUpdateLogList() {
				let that = this;
				this.isRequest = true;
				that.$axios.get("/blog/log/getlist?limit=3").then(({ data }) => {
					that.isRequest = false;
					if (data.status !== 1 || data.data.logList.length === 0) return;
					let list = data.data.logList;
					that.logList = list;
				});
			}
		},
		created() {
			this.getUpdateLogList();
		}
	};
</script>

<style lang="scss">
	.update-log-box {
		position: relative;
		min-height: 100px;
		.title {
			a {
				color: rgb(207, 207, 207);
				&:hover {
					color: #fff;
				}
			}
		}
		.log-list {
			border-left: 1px solid rgb(78, 78, 78);
			padding-left: 25px;
			font-size: 0.9rem;
			.log-list-item {
				margin-bottom: 15px;
				.u-cnt {
					color: rgb(167, 167, 167);
					font-size: 0.9em;
				}
			}
			.log-end {
				text-align: right;
			}
		}
	}
</style>