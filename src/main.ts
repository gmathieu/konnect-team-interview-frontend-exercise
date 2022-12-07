import "@kong/kongponents/dist/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Kongponents from "@kong/kongponents";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Kongponents);

app.mount("#app");
