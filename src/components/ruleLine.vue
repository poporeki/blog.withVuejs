<template>
	<div class="line"></div>
</template>


<style lang="scss" scoped>
	.line {
		position: relative;
		margin: 10vh 0;
		width: 50vw;
		max-width: 300px;
		height: 2px;

		&:before {
			position: absolute;
			top: 0;
			left: 0;
			content: "";
			height: 100%;
			width: 70%;
			background-color: #60bb46;
		}

		&:after {
			position: absolute;
			top: 0;
			right: 0;
			content: "";
			height: 100%;
			width: 30%;
			background-color: #c34c9c;
		}
	}
</style>

