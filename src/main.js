import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi-svg'
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { store } from './store';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faDotCircle } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faClock, fas, faDotCircle)


const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
    }
  })
const app = createApp(App).component('fa', FontAwesomeIcon).use(vuetify)

app.use(store)
app.use(router)
// app.use(store)
app.mount('#app')
