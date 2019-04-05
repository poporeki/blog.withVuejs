<template>
	<div class="block-wrapper">
		<div class="inner">
			<div class="col">
				<qrcode :value="QRSource" :options="{ width: 300 }" v-if="isCreated"></qrcode>
			</div>
			<div class="col">
				<input type="text" v-model="inputValue" placeholder="输入想要生成的内容," @keyup.enter="createQRCode">
				<a href="javascript:void(0);" class="button-create" @click="createQRCode">生成</a>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.block-wrapper {
		width: 100%;
		min-height: 300px;
	}
	.inner {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.col {
			padding: 10px;
			text-align: center;
			input {
				background-color: transparent;
				outline: none;
				border: none;
				text-align: center;
				color: rgb(204, 204, 204);
				margin-bottom: 5px;
				box-sizing: border-box;
				border-bottom: 1px solid rgb(126, 126, 126);
			}
			input,
			.button-create {
				height: 50px;
				line-height: 50px;
				width: auto;
			}
			.button-create {
				display: block;
				background-color: rgb(62, 124, 124);
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				inputValue: "https://www.yansk.cn",
				QRSource: "",
				isCreated: false
			};
		},
		methods: {
			createQRCode() {
				if (this.inputValue === "") {
					alert("不能为空");
				}
				this.QRSource = this.inputValue;
				this.isCreated = true;
			}
		},
		created() {
			this.createQRCode();
		}
	};
</script>

