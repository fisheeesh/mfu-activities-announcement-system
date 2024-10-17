import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/bootstrap.css'

// Import Bootstrap JS (bundle includes Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/js/darkmodetoggle.js'
import './assets/global.css'

createApp(App).use(router).mount('#app')
