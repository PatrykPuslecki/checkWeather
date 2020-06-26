import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
// api key 882cdd78c8b93028565e817022096bcf
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
