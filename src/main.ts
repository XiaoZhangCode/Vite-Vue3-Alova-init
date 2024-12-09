import { createApp } from "vue";
import Antd from "ant-design-vue";
import "./access/access.ts";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";

const pinia = createPinia();

const app = createApp(App);
app.use(router).use(pinia).use(Antd).mount("#app");
