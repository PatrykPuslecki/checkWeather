<template>
  <div class="details">
    <div class="details-temperature">{{ this.currentTemperature }}°C</div>
    <div class="details-right">
      <div class="details-date"><strong>Date:</strong> {{ this.date }}</div>
      <div class="details-location">
        <strong>Location:</strong> {{ this.currentLocation }}
      </div>
      <div class="details-description">
        <strong>Description:</strong> {{ this.weatherDescription }}
      </div>
      <router-link to="details" class="moreButton">MORE</router-link>
    </div>
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

<style lang="scss" scoped>
.details {
  margin-top: 1rem;
  padding: 25px 20px;
  position: relative;
  display: flex;
  background: rgba(169, 160, 160, 0.6);
  border: 1px solid rgb(214, 214, 214);
  @media (max-width: 620px) {
    flex-direction: column;
  }
  &-temperature {
    display: flex;
    align-items: center;
    font-size: 40px;
    font-weight: 700;
    flex: 1;
    @media (max-width: 620px) {
      width: 100%;
      flex: 0 1 100%;
      justify-content: center;
    }
  }
  &-right {
    flex: 3;
    font-size: 14px;
    color: #d8d4d4;
    margin-left: 16px;
    text-align: left;
    line-height: calc(14px * 1.6);
    strong {
      color: #fff;
    }
    @media (max-width: 620px) {
      width: 100%;
      flex: 0 1 100%;
      text-align: center;
      margin-left: 0;
    }
  }
  .moreButton {
    text-decoration: none;
    color: #d8d4d4;
    font-weight: 700;
    position: absolute;
    right: 10px;
    bottom: 10px;
    @media (max-width: 620px) {
      position: relative;
      text-align: center;
      margin-top: 2rem;
      right: 0;
      bottom: -10px;
      font-size: 16px;
    }
  }
}
</style>
