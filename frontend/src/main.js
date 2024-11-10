import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createPinia } from 'pinia';

const pinia = createPinia();

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#BA1E23',
              secondary: '#ffefef',
              accent: '#82B1FF',
              error: '#FF5252',
            },
          },
        },
      },
  components,
  directives,
})

//fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

//bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/bootstrap.css'
import './assets/css/custom.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { auth } from './firebase/config'
//darkmode
// import './assets/js/darkmodetoggle.js'

let app;
/**
 * ? We want user to stay in the dahsboard as long as the user is logged in
 * ? We dun want to push users back to the login page after they refresh the page even throught they are logged in
 * ? So we will let the vue app to build its components only when the auth library is connnected
 * ! Cuz it will take a bit time to connect. During that time route guard beforeEnter() will run and it will know like user is null
 * ? So the system wlll push the user to login page
 */
auth.onAuthStateChanged(() => {
    if (!app) app = createApp(App).use(vuetify).use(PrimeVue).use(router).use(Toast).use(pinia).mount('#app')
})
