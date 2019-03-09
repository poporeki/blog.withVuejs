<template>
  <div class="sec-wrapper">
    <div class="line"></div>
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

<style lang="scss">
.w-icon {
  font-size: 0.3rem;
}
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
@media (max-width: 767.9px) {
  .sec-wrapper {
    flex-direction: column;
  }

  .weather {
    align-self: center;
  }
}
@media(max-width: 768px) {
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
  margin-bottom:20px;
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
      font-size: 0.8rem;
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
    }

    .w-province {
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 0.6rem;
    }

    .w-city {
      position: absolute;
      width: 0.3rem;
      right: 0;
      bottom: 0;
      font-size: 0.3rem;
      color: gray;
    }
  }
}
</style>

<script>
import weatherIcon from "../../icon/weather";
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
    weatherIcon
  },
  methods: {
    getWeather(geolo) {
      let _this = this;
      this.$axios
        .get("https://www.yansk.cn/api/v1/weather/gettheday", {
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
