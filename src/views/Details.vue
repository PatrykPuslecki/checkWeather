<template>
  <div class="about">
    <div v-if="!this.infos.city">Loading...</div>
    <div v-else>
      <h1>AirApp</h1>
      <div class="infoBox">
        <span>
          <strong>Date:</strong>
          {{ this.currentDate }}
        </span>
        <span>
          <strong>Location:</strong>
          {{ this.infos.city.name}}, {{ this.infos.city.country }}
        </span>
      </div>

      <div class="hourlyBox">
        <table>
          <thead>
            <tr>
              <td>Hour</td>
              <td>Temperature</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="singleHour in this.infos.list" :key="singleHour.dt">
              <td>{{ formatToHour(singleHour.dt_txt) }}</td>
              <td>{{Math.round(singleHour.main.temp)}}°C</td>
              <td>{{singleHour.weather[0].description}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { API_HOURLY_URL, API_KEY } from "@/helpers/api.js";
import axios from "axios";
import moment from "moment";
export default {
  name: "Details",
  props: ["city"],
  data: function() {
    return {
      currentDate: moment().format("DD-MM-YYYY"),
      infos: {}
    };
  },
  methods: {
    formatToHour(date) {
      let formattedDate = new Date(date);
      return moment(formattedDate).format("HH:mm");
    },
    getWeather(url) {
      axios
        .get(url)
        .then(response => {
          this.infos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeMount() {
    if (!this.city) {
      this.$router.go(-1);
    } else {
      this.getWeather(API_HOURLY_URL + "&q=" + this.city + API_KEY + "&cnt=6");
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  max-width: 600px;
  width: 500px;

  h1 {
    text-align: left;
  }
  @media (max-width: 500px) {
    margin: 0.5rem 1rem;
    h1 {
      text-align: center;
    }
  }
}
.infoBox {
  background: rgba(169, 160, 160, 0.6);
  border: 1px solid rgb(214, 214, 214);
  padding: 20px 40px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  color: #d8d4d4;
  font-weight: 500;
  strong {
    color: #fff;
    font-weight: 600;
  }
  @media (max-width: 500px) {
    span {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
}
.hourlyBox {
  margin-top: 1rem;
  table {
    width: 100%;
    table-layout: fixed;
    td {
      padding: 20px 10px;
    }
    thead td {
      font-weight: 600;
    }
    tbody td {
      background: rgba(169, 160, 160, 0.6);
    }
  }
}
</style>