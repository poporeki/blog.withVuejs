<template>
	<div class="wrapper">
		<h2>更新日志：</h2>
		<ul class="log-list">
			<li class="log-list-mark"></li>

			<li class="log-list-item" v-for="(item,key) in logList" :key="key">
				<p class="log-time">{{item.create_time}}</p>
				<p class="log-content">{{item.log_content}}</p>

				<br>
				<br>
				<br>
			</li>
		</ul>
	</div>
</template>
<style lang="scss" scoped>
	.log-list {
		position: relative;
		border-left: 2px solid;
		border-image: linear-gradient(#30d4fd, #3558f3) 1 5 5;
		padding-left: 25px;
	}
	.log-content {
		color: #dddddd;
	}
</style>

<script>
	export default {
		data() {
			return {
				logList: []
			};
		},
		methods: {
			//获取日志列表
			getLoglist() {
				let that = this;
				that.$axios
					.get("https://www.yansk.cn/blog/log/getlist")
					.then(({ data }) => {
						let datas = data.data;
						if (
							datas === null ||
							datas.logList === undefined ||
							datas.logList.length === 0
						) {
							return;
						}
						that.logList = datas.logList;
					});
			}
		},
		created() {
			this.getLoglist();
		}
	};
</script>
