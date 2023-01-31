import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import components from '@/components/UI/export';

loadFonts();

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component.component);
});

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.mount('#app');
