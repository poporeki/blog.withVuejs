<template>
	<ul></ul>
</template>

<script>
	export default {
		data() {
			videoTypeList: [];
		},
		methods: {
			getVideoTypeList() {
				let that = this;
				let url = "http://baobab.kaiyanapp.com/api/v4/discovery";
				that.$axios.get(url).then(({ data }) => {
					that.videoTypeList = data.tabInfo.tabList;
				});
			}
		}
	};
</script>
