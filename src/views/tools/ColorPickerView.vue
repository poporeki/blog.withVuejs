<template>
	<div>
		<div class="bg-color" :style="bgStyle"></div>
		<photoshop-picker v-model="colors"></photoshop-picker>
		<div class="rs-wrapper">
			<div class="rs-box">
				<h6>HEX:</h6>
				<h6>{{colors.hex}}</h6>
			</div>
			<div class="rs-box">
				<h6>HSL:</h6>
				<h6>{{hsl}}</h6>
			</div>
			<div class="rs-box">
				<h6>HSV:</h6>
				<h6>{{hsv}}</h6>
			</div>
			<div class="rs-box">
				<h6>RGBA:</h6>
				<h6>{{rgba}}</h6>
			</div>
		</div>
	</div>
</template>

<script>
	import { Chrome } from "vue-color";
	export default {
		data() {
			return {
				bgStyle: {
					backgroundColor: "transparent"
				},
				colors: {
					hex: "#194d33",

					hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
					hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
					rgba: { r: 25, g: 77, b: 51, a: 1 },
					a: 1
				}
			};
		},
		watch: {
			colors(val) {
				let rgba = `rgba(${val.rgba.r},${val.rgba.g},${val.rgba.b},${
					val.rgba.a
				})`;
				this.bgStyle.backgroundColor = rgba;
			}
		},
		computed: {
			hsl() {
				return `${this.colors.hsl.h},${this.colors.hsl.s},${this.colors.hsl.l},${
					this.colors.hsl.a
				}`;
			},
			hsv() {
				return `${this.colors.hsv.h},${this.colors.hsv.s},${this.colors.hsv.v},${
					this.colors.hsv.a
				}`;
			},
			rgba() {
				return `${this.colors.rgba.r},${this.colors.rgba.g},${
					this.colors.rgba.b
				},${this.colors.rgba.a}`;
			}
		},
		components: { "photoshop-picker": Chrome }
	};
</script>


<style lang="scss">
	.bg-color {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50vh;
		background-color: transparent;
		transform: background-color 0.3s ease;
		z-index: -1;
	}
	.rs-wrapper {
		margin-top: 20px;
	}
	.rs-box {
		border-top: 1px solid rgb(211, 154, 89);
		text-shadow: 0 0 3px #000;
		h3 {
			word-break: break-all;
			&:nth-child(2) {
				color: rgb(155, 167, 161);
			}
		}
	}
</style>
