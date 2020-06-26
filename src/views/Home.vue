<template>
  <div class="home">
    <h1>AirApp</h1>
    <p>
      Check the weather! Enter the city name, or
      <strong>
        leave empty for geolocation
      </strong>
    </p>
    <form>
      <input v-model="city" class="styledInput" />
      <button type="submit" class="styledSubmit">CHECK</button>
    </form>
    <div class="details">
      <div class="temperature">{{ this.currentTemperature }}</div>
      <div class="date">Date: {{ this.date }}</div>
      <div class="location">Location: {{ this.currentLocation }}</div>
      <div class="description">Description: {{ this.weatherDescription }}</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import moment from "moment";
const API_URL = "http://api.openweathermap.org/data/2.5/weather?units=metric";
const API_KEY = "&APPID=882cdd78c8b93028565e817022096bcf";
export default {
  name: "Home",
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

<style scoped lang="scss">
$bg: rgba(169, 160, 160, 0.6);
.home {
  max-width: 400px;
}
p {
  color: #a9a0a0;

  strong {
    color: #fff;
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
  flex: 1;
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
