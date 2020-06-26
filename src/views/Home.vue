<template>
  <div class="home">
    <h1>AirApp</h1>
    <p>
      Check the weather! Enter the city name, or
      <strong>leave empty for geolocation</strong>
    </p>
    <form @submit.prevent="submitForm">
      <input v-model="city" class="styledInput" />
      <button type="submit" class="styledSubmit">CHECK</button>
    </form>
    <detailsBox :weatherInfo="weatherInfo" />
  </div>
</template>

<script>
// @ is an alias to /src
import detailsBox from "@/components/detailsBox";
import axios from "axios";
import moment from "moment";
import { API_URL, API_KEY } from "@/helpers/api";
export default {
  name: "Home",
  components: {
    detailsBox
  },
  data: function() {
    return {
      city: "",
      weatherInfo: {
        currentTemperature: "",
        currentLocation: "",
        description: "",
        date: moment().format("DD-MM-YYYY"),
        location: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.getWeather(API_URL + "&q=" + this.city + API_KEY);
    },
    getWeather(url) {
      axios
        .get(url)
        .then(response => {
          this.weatherInfo.currentTemperature = Math.round(
            response.data.main.temp
          );
          this.weatherInfo.currentLocation =
            response.data.name + ", " + response.data.sys.country;
          this.weatherInfo.description = response.data.weather[0].description;
          this.weatherInfo.location = response.data.name;
        })
        .catch(error => {
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
    }
  },
  beforeMount() {
    this.geolocation();
  }
};
</script>

<style scoped lang="scss">
$bg: rgba(169, 160, 160, 0.6);
.home {
  max-width: 400px;
  @media (max-width: 500px) {
    margin: 0.5rem 1rem;
  }
}
p {
  color: #f0f0f0;
  font-weight: 500;
  font-size: 15px;
  strong {
    color: #fff;
    font-weight: 600;
  }
}
form {
  width: 100%;
  display: flex;
  height: 40px;
}
.styledInput {
  background: $bg;
  border: 1px solid rgb(214, 214, 214);
  box-shadow: none;
  color: #fff;
  height: calc(100% - 2px);
  padding: 0px 10px;
  flex: 2;
  outline: none;
  &:focus {
    outline: none;
  }
  max-height: 40px;
}

.styledSubmit {
  background: $bg;
  border: 1px solid rgb(214, 214, 214);
  height: 100%;
  margin-left: 10px;
  color: #fff;
  padding: 5px;
  flex: 1;
  font-weight: 700;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #a9a9a9;
  }
}
</style>
