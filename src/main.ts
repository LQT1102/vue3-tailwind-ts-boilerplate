import { registerLang } from "@/locales/register";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import i18n from "./locales/i18n";
import { registerLayouts } from "./layouts/register";

registerLang();
const app = createApp(App);
app.use(router);
registerLayouts(app);
app.use(i18n);
app.mount("#app");
