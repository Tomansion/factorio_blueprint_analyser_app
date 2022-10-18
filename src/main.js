import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)


// PrimeVue
import PrimeVue from "primevue/config"
import Button from "primevue/button"
import Card from 'primevue/card';

import "primevue/resources/themes/vela-orange/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

app.use(PrimeVue)
app.component("p-button", Button)
app.component("p-card", Card)

// Mount the app
app.mount('#app')
