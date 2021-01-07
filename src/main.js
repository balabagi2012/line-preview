import "@/assets/scss/index.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { QSelect, Quasar } from "quasar";
import Vue from "vue";
import VueRx from "vue-rx";
import VuejsClipper from "vuejs-clipper";
import App from "./App.vue";
import './quasar'

Vue.use(Quasar, {
  components: {
    QSelect,
  },
});
Vue.use(ElementUI);
Vue.use(VueRx);
Vue.use(VuejsClipper, {
  components: {
    clipperBasic: true,
    clipperPreview: false,
    clipperFixed: false,
  },
});
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
