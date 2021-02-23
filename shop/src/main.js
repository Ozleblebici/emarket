import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { sync } from 'vuex-router-sync'
sync(store, router)
Vue.use(IconsPlugin);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
