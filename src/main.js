import Vue from "vue";

import App from "@/App.vue";
import router from "@/main.routes";
import store from "@/store";

import "@/main.scss";
import "@/plugins";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
