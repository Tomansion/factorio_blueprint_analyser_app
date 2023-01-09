import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// Router
import router from './router'
app.use(router)

// PrimeVue
import PrimeVue from "primevue/config"
app.use(PrimeVue)

import "primevue/resources/themes/vela-orange/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import Button from "primevue/button"
app.component("p-button", Button)
import Card from 'primevue/card'
app.component("p-card", Card)
import Toolbar from 'primevue/toolbar'
app.component("p-toolbar", Toolbar)
import Textarea from 'primevue/textarea';
app.component("p-textarea", Textarea)
import Panel from 'primevue/panel';
app.component("p-panel", Panel)
import FileUpload from 'primevue/fileupload';
app.component("p-fileupload", FileUpload)
import SelectButton from 'primevue/selectbutton';
app.component("p-selectbutton", SelectButton)
import ProgressSpinner from 'primevue/progressspinner';
app.component("p-progressspinner", ProgressSpinner)
import Menubar from 'primevue/menubar';
app.component("p-menubar", Menubar)
import ToastService from 'primevue/toastservice';
app.use(ToastService);

// import Image from 'primevue/image';
// app.component("p-image", Image)

// Mount the app
app.mount('#app')
