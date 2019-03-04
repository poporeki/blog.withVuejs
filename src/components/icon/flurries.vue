<template>
  <div class="icon flurries">
    <div class="cloud"></div>
    <div class="snow">
      <div class="flake"></div>
      <div class="flake"></div>
    </div>
  </div>
</template>
<style lang="scss">
@import "../../..//public/scss/icon_weather_comm.scss";
.snow {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: 3.75em;
  height: 3.75em;
  margin: 0.375em 0 0 -2em;
  background: transparent;
}
.flake:before,
.flake:after {
  content: "\2744";
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -1.025em 0 0 -1.0125em;
  color: #fff;
  line-height: 1em;
  opacity: 0.2;
  -webkit-animation: spin 8s linear infinite reverse;
  animation: spin 8s linear infinite reverse;
}

.flake:after {
  margin: 0.125em 0 0 -1em;
  font-size: 1.5em;
  opacity: 0.4;
  -webkit-animation: spin 14s linear infinite;
  animation: spin 14s linear infinite;
}

.flake:nth-child(2):before {
  margin: -0.5em 0 0 0.25em;
  font-size: 1.25em;
  opacity: 0.2;
  -webkit-animation: spin 10s linear infinite;
  animation: spin 10s linear infinite;
}

.flake:nth-child(2):after {
  margin: 0.375em 0 0 0.125em;
  font-size: 2em;
  opacity: 0.4;
  -webkit-animation: spin 16s linear infinite reverse;
  animation: spin 16s linear infinite reverse;
}

/* Animations */

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>

