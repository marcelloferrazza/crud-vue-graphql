// Plugins
import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import './styles/styles.css'
import { apolloProvider, apolloClient } from './boots/apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import velocity from 'velocity-animate'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


registerPlugins(app);
app.use(Notifications, { velocity });
app.use(apolloProvider);
app.provide(DefaultApolloClient, apolloClient)
app.use(pinia);


app.mount('#app')
