<template>
  <div class="details">
    <div class="temperature">{{ this.currentTemperature }}</div>
    <div class="date">Date: {{ this.date }}</div>
    <div class="location">Location: {{ this.currentLocation }}</div>
    <div class="description">Description: {{ this.weatherDescription }}</div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { API_KEY, API_URL } from "@/helpers/api";
export default {
  name: "detailsBox",
  data: function() {
    return {
      city: "",
      currentTemperature: "",
      currentLocation: "",
      weatherDescription: "",
      date: moment().format("DD-MM-YYYY"),
    };
  },
  methods: {
    getWeather(url) {
      axios
        .get(url)
        .then((response) => {
          this.currentTemperature = Math.round(response.data.main.temp);
          this.currentLocation =
            response.data.name + ", " + response.data.sys.country;
          this.weatherDescription = response.data.weather[0].description;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
    },
    buildUrl(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.getWeather(API_URL + "&lat=" + lat + "&lon=" + lon + API_KEY);
    },
    geoError() {
      this.getWeather(API_URL + "&lat=0&lon=0" + API_KEY);
    },
  },
  beforeMount() {
    this.geolocation();
  },
};
</script>
