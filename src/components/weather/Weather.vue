<template>
  <div
    class="weather container"
    :style="`backgroundImage: url(${backgroundImg});`"
  >
    <div class="weather__header row">
      <div class="real-time col-4">{{ time }}</div>
      <div class="provinces col-8">
        <select
          class="form-select"
          aria-label="Default select example"
          @change="selected = $event.target.value"
        >
          <option
            v-for="province in locationList"
            :key="province.name"
            :value="province.key"
            :selected="province.key === 'da nang'"
          >
            {{ province.name }}
          </option>
        </select>
        <!-- <ul>
          <li
            v-for="province in locationList"
            :key="province.key"
            @click="selected = province.key"
            :class="{ active: selected === province.key }"
          >
            {{ province.name }}
          </li>
        </ul> -->
      </div>
    </div>
    <div class="weather__body row">
      <div class="province-name">{{ selected }}</div>
      <div class="date">{{ today }}</div>
      <div class="temparature">{{ mainTemp }}°c</div>
      <div class="line">--------</div>
      <div>
        <img
          :src="`http://openweathermap.org/img/wn/${icon}@2x.png`"
          alt="Weather icon"
          width="80"
        />
      </div>
      <div class="weather-status">
        {{ weatherStatus }}
      </div>
      <div class="range-temp">
        <span class="font-weight-bold">{{ minTemp }}</span
        >°c / <span class="font-weight-bold">{{ maxTemp }}</span
        >°c
      </div>
    </div>
    <div class="weather__footer row">
      <div class="col-12 d-flex">
        <div class="item">
          <div class="label">Sunrise</div>
          <div class="value">{{ sunrise }}</div>
        </div>
        <div class="item">
          <div class="label">Sunset</div>
          <div class="value">{{ sunset }}</div>
        </div>
      </div>
      <div class="col-12 d-flex">
        <div class="item">
          <div class="label">Humidity</div>
          <div class="value">{{ humidity }}%</div>
        </div>
        <div class="item">
          <div class="label">Wind speed</div>
          <div class="value">{{ windSpeed }} km/h</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import dayClear from "../../assets/images/day-clear.jpg";
import dayClouds from "../../assets/images/day-clouds.jpg";
import dayClouds2 from "../../assets/images/day-clouds-2.jpg";
import dayClouds3 from "../../assets/images/day-clouds-3.jpg";
import dayClouds4 from "../../assets/images/day-clouds-4.jpg";
import dayRain from "../../assets/images/day-rainy.gif";
import dayThunder from "../../assets/images/day-thunder.jpg";
import nightClear from "../../assets/images/night-clean-2.jpg";
import nightClear2 from "../../assets/images/night-clean.jpg";
import nightClouds from "../../assets/images/night-clouds.jpg";
import nightClouds2 from "../../assets/images/night-clouds-2.jpg";
import nightClouds3 from "../../assets/images/night-clouds-3.jpg";
import nightRain from "../../assets/images/night-rainy.jpg";
import nightRain2 from "../../assets/images/night-rainy-2.gif";
import nightThunder from "../../assets/images/night-thunder.jpg";
import afternoon from "../../assets/images/afternoon.jpg";

export default {
  name: "WeatherComponent",
  data() {
    return {
      locationList: [
        {
          name: "Danang",
          key: "da nang",
        },
        {
          name: "Hanoi",
          key: "ha noi",
        },
        {
          name: "Ho Chi Minh",
          key: "ho chi minh",
        },
        {
          name: "Da Lat",
          key: "da lat",
        },
        {
          name: "Hoi An",
          key: "hoi an",
        },
        {
          name: "Kon Tum",
          key: "kon tum",
        },
        {
          name: "Sa Pa",
          key: "sa pa",
        },
      ],
      selected: "da nang",
      appId: "5cf5a3f831300f389a5ee9d240e7535e",
      weatherInfo: {},
      error: "",
      defaultData: "--",
      backgroundData: "../../assets/images/day-clouds-2.jpg",
      dayClear,
      dayClouds,
      dayClouds2,
      dayClouds3,
      dayClouds4,
      dayRain,
      dayThunder,
      nightRain,
      nightClear,
      nightClear2,
      nightClouds,
      nightClouds2,
      nightClouds3,
      nightThunder,
      afternoon,
      nightRain2,
    };
  },
  watch: {
    selected: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) this.getWeatherInfo();
      },
    },
  },
  mounted() {
    this.getWeatherInfo();
  },
  computed: {
    today() {
      return moment().format("dddd, MMMM Do, yyyy");
    },
    time() {
      return moment().format("H:mm");
    },
    mainTemp() {
      return this.weatherInfo?.main?.temp?.toFixed() || this.defaultData;
    },
    weatherStatus() {
      return this.weatherInfo?.weather?.[0]?.main || this.defaultData;
    },
    weatherDescription() {
      return this.weatherInfo?.weather?.[0]?.description || "";
    },
    minTemp() {
      return this.weatherInfo?.main?.temp_min?.toFixed() || this.defaultData;
    },
    maxTemp() {
      return this.weatherInfo?.main?.temp_max?.toFixed() || this.defaultData;
    },
    icon() {
      return this.weatherInfo?.weather?.[0]?.icon || "10d";
    },
    sunrise() {
      return this.weatherInfo?.sys?.sunrise
        ? moment.unix(this.weatherInfo.sys.sunrise).format("H:mm")
        : this.defaultData;
    },
    sunset() {
      return this.weatherInfo?.sys?.sunset
        ? moment.unix(this.weatherInfo.sys.sunset).format("H:mm")
        : this.defaultData;
    },
    windSpeed() {
      return this.weatherInfo?.wind?.speed
        ? (this.weatherInfo?.wind?.speed * 3.6).toFixed(2)
        : this.defaultData;
    },
    humidity() {
      return this.weatherInfo?.main?.humidity || this.defaultData;
    },
    hour() {
      return moment().get("hour");
    },
    backgroundImg() {
      if (this.hour < 18 && this.hour > 6) {
        switch (this.weatherDescription) {
          case "clear sky":
            return this.dayClear;
          case "few clouds":
            return this.dayClouds;
          case "scattered clouds":
            return this.dayClouds2;
          case "broken clouds":
            return this.dayClouds3;
          case "overcast clouds":
            return this.dayClouds4;
          case "shower rain":
          case "rain":
            return this.dayRain;
          case "thunderstorm":
            return this.dayThunder;
          case "":
          default:
            return afternoon;
        }
      } else {
        switch (this.weatherDescription) {
          case "clear sky":
            return this.nightClear;
          case "few clouds":
            return this.nightClouds;
          case "scattered clouds":
            return this.nightClouds2;
          case "broken clouds":
          case "overcast clouds":
            return this.nightClouds3;
          case "shower rain":
          case "rain":
            return this.nightRain;
          case "thunderstorm":
            return this.nightThunder;
          case "":
          default:
            return this.nightClear2;
        }
      }
    },
  },
  methods: {
    getWeatherInfo() {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.selected}&appid=${this.appId}&units=metric`
      )
        .then(async (res) => {
          this.weatherInfo = await res.json();
        })
        .catch((error) => (this.error = error));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./Weather.scss";
@import "./WeatherResponsive.scss";
</style>
