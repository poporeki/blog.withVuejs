<template>
	<div class="sec-wrapper">
		<rule-line></rule-line>
		<section class="weather">
			<div class="inner">
				<weatherIcon :temp="weatherData.weather"></weatherIcon>
				<div class="w-info">
					<span class="w-city">{{weatherData.city}}</span>
					<span class="w-up-time">{{weatherData.updateTime}}</span>
					<span class="w-temp">{{weatherData.temp}}</span>
					<span class="w-province">{{weatherData.province}}</span>
				</div>
			</div>
		</section>
	</div>
</template>


<script>
	import weatherIcon from "../../icon/weather";
	import RuleLine from "@/components/RuleLine.vue";
	export default {
		data() {
			return {
				weatherData: {
					city: "取",
					updateTime: "正",
					temp: "在",
					province: "获",
					weather: ""
				}
			};
		},
		components: {
			weatherIcon,
			RuleLine
		},
		methods: {
			getWeather(geolo) {
				let _this = this;
				this.$axios
					.get("/api/v1/weather/gettheday", {
						geolocation: geolo
					})
					.then(({ data }) => {
						let wData = data.lives[0];
						_this.weatherData.city = wData.city;
						_this.weatherData.updateTime = wData.reporttime;
						_this.weatherData.temp = wData.temperature;
						_this.weatherData.province = wData.province;
						_this.weatherData.weather = wData.weather;
					});
			},
			/* 获取定位 */
			getGeolocation() {
				let geolocation = false;
				let options = {
					enableHighAccuracy: true,
					timeout: 20000,
					maximumAge: 0
				};

				return new Promise(resolve => {
					if (navigator.geolocation) {
						let success = pos => {
							let crd = pos.coords;
							//经度
							let longitude = crd.longitude;
							//纬度
							let latitude = crd.latitude;
							geolocation = longitude + "," + latitude;
							return resolve(geolocation);
						};

						let error = err => {
							err;
							return resolve();
						};
						navigator.geolocation.getCurrentPosition(success, error, options);
					}
				});
			}
		},
		created() {
			let _this = this;
			this.getGeolocation().then(geo => {
				_this.getWeather(geo);
			});
		}
	};
</script>

<style lang="scss">
	.w-icon {
		font-size: 1rem;
	}
	@media (max-width: 767.9px) {
		.sec-wrapper {
			flex-direction: column;
		}

		.weather {
			align-self: center;
		}
	}
	@media (max-width: 768px) {
		.sec-wrapper {
			flex-direction: column;
		}

		.weather {
			align-self: center;
			width: 100% !important;
		}
	}
	.sec-wrapper {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		.weather {
			position: relative;
			width: 300px;
			min-height: 180px;

			.inner {
				display: flex;
			}

			.w-temp {
				position: absolute;
				right: 0;
				top: 0;
				font-size: 3rem;
				color: rgb(255, 136, 0);

				&:after {
					content: "c";
					vertical-align: super;
				}
			}

			.w-up-time {
				position: absolute;
				top: 0;
				left: 0;
				color: rgb(167, 167, 167);
				font-size: 0.7rem;
			}

			.w-province {
				position: absolute;
				left: 0;
				bottom: 0;
				font-size: 2rem;
			}

			.w-city {
				position: absolute;
				right: 10px;
				bottom: 0;
				width: 10px;
				font-size: 1rem;
				color: gray;
			}
		}
	}
</style>
