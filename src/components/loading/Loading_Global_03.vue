<template >
	<div v-if="is" class="loading">
		<div class="k-line2 k-line12-1"></div>
		<div class="k-line2 k-line12-2"></div>
		<div class="k-line2 k-line12-3"></div>
		<div class="k-line2 k-line12-4"></div>
		<div class="k-line2 k-line12-5"></div>
		<div class="k-line2 k-line12-6"></div>
		<div class="k-line2 k-line12-7"></div>
		<div class="k-line2 k-line12-8"></div>
	</div>
</template>

<style lang="scss">
	.loading {
		position: relative;
		margin: 0 auto;
	}
	.k-line2 {
		display: inline-block;
		background: #666;
		height: 10px;
		width: 10px;
		opacity: 0;
		border-radius: 50%;
		transform: translateX(-300px);
		background-color: #4b9cdb;
	}
	.k-line12-1 {
		animation: k-loadingS 4s infinite;
		animation-delay: 0.8s;
	}
	.k-line12-2 {
		animation: k-loadingS 4s infinite;
		animation-delay: 0.7s;
	}
	.k-line12-3 {
		animation: k-loadingS 4s infinite;
		animation-delay: 0.6s;
	}
	.k-line12-4 {
		animation: k-loadingS 4s infinite;
		animation-delay: 0.5s;
	}
	.k-line12-5 {
		animation: k-loadingS 4s infinite;
		animation-delay: 0.4s;
	}
	.k-line12-6 {
		animation: k-loadingS 4s infinite;
		animation-delay: 0.3s;
	}
	.k-line12-7 {
		animation: k-loadingS 4s infinite;
		animation-delay: 0.2s;
	}
	.k-line12-8 {
		animation: k-loadingS 4s infinite;
		animation-delay: 0.1s;
	}
	@keyframes k-loadingS {
		40% {
			transform: translateX(0);
			opacity: 0.8;
		}
		100% {
			transform: translateX(300px);
			opacity: 0;
		}
	}
</style>
<script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				is: true
			};
		},
		computed: {
			...mapGetters(["showLoading"])
		}
	};
</script>

