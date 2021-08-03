<template>
  <div id="app">
    <Weather msg="Welcome to Today's Weather infomation" />
  </div>
</template>

<script>
import Weather from "./components/weather/Weather.vue";

export default {
  name: "App",
  components: {
    Weather,
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Andada Pro", serif;
  text-align: center;
}
@import "~bootstrap/dist/css/bootstrap.css";
@import "./assets/app.scss";
</style>
