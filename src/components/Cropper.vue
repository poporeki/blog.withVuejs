<template>
	<vueCropper
		ref="cropper"
		:img="option.img"
		:outputSize="option.size"
		:outputType="option.outputType"
		:canMove="option.canMove"
		:canMoveBox="option.canMoveBox"
		:fixedBox="option.fixedBox"
		:original="option.original"
		:autoCrop="option.autoCrop"
		:autoCropWidth="option.autoCropWidth"
		:autoCropHeight="option.autoCropHeight"
		:centerBox="option.centerBox"
		:high="option.high"
		:infoTrue="option.infoTrue"
		@realTime="realTime"
	></vueCropper>
</template>


<script>
	import { VueCropper } from "vue-cropper";

	export default {
		components: { VueCropper },
		props: ["img", "isSubmit"],
		watch: {
			img() {
				this.option.img = this.img;
			},
			isSubmit(val) {
				if (!val) return;
				this.$emit("submitBase", this.$refs.cropper);
			}
		},
		data() {
			return {
				option: {
					img: "",
					outputType: "jpg",
					autoCrop: true,
					autoCropWidth: 200,
					autoCropHeight: 200,
					fixed: true,
					fixedNumber: [1, 1]
				}
			};
		},
		methods: {
			realTime(data) {
				this.$emit("previews", data);
			}
		},
		created() {}
	};
</script>
