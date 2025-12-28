import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/common.scss'
import { directivePlugin } from './directives/index'
import { componentPlugin } from './components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)


const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.use(directivePlugin)
app.use(componentPlugin)
app.mount('#app')
