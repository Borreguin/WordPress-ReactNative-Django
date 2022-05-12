import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App)
  .use(router)
  .use(pinia)
  .use(BootstrapVue)
  .use(IconsPlugin)
  .mount("#app");
