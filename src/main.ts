import "@kong/kongponents/dist/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Kongponents, { ToastManager } from "@kong/kongponents";

const app = createApp(App);

app.config.globalProperties.$toaster = new ToastManager();

app.use(createPinia());
app.use(router);
app.use(Kongponents);

app.mount("#app");
