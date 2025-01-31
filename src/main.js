// Plugins
import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import { apolloProvider } from './boots/apollo'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


registerPlugins(app);
app.use(apolloProvider);
app.use(pinia);


app.mount('#app')
