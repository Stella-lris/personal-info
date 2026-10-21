import { createApp } from "vue";
import { createPinia } from 'pinia'
import ElementPlus from "element-plus";              // ← 新增：引入组件库
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus, { locale: zhCn });

// ← 新增：把所有图标逐个注册为全局组件
for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, component);
}

app.mount("#app");
