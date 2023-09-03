import { createApp } from 'vue'
import "./index.css";
import App from './App.vue'
import router from "./router";
import store from "./store";
import IconC from "@/components/IconsComponent.vue";

const app = createApp(App)

app
	.use(router)
	.use(store)
	.component("IconC", IconC)
	.mount('#app');
