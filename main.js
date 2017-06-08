import Vue from 'vue'
import Router from './routes.js'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueClip from 'vue-clip'
import Auth from './packages/auth/auth.js'
import store from './store.js'
import validate from 'vee-validate'
import VueCookie from 'vue-cookie'
// import LinkPopover from 'vue-link-popover'
import scroll from 'vue-scroll'

import VueTimeago from 'vue-timeago'
import vmodal from 'vue-js-modal'
import {mapGetters} from 'vuex'

import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.css'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueCookie)
Vue.use(vmodal)
Vue.use(VueResource)
Vue.use(VueClip)
Vue.use(Auth)
Vue.use(validate)
Vue.use(VueMaterial)
// Vue.use(LinkPopover)
Vue.use(scroll)
Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'es-ES',
  locales: {
    // you will need json-loader in webpack 1
    'es-ES': require('vue-timeago/locales/es-ES.json')
  }
})

Vue.material.registerTheme('default', {
  primary: 'black',
  accent: 'white',
  // warn: 'red',
  // background: 'grey'
})

Vue.http.options.root='http://besty.app:8000'
// Vue.http.options.root='http://besty.mx/public'
// Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken()
Vue.http.headers.common['Authorization'] = 'Bearer ' + store.getters.GET_TOKEN;
Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://besty.app:8000'
// Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://besty.mx'
Vue.http.headers.common['X-CSRF-TOKEN'] =  Vue.auth.getCsrfToken();
//documents.querySelector("#miid").getAtribute("value");
// Vue.http.headers.common['X-CSRF-TOKEN']


// Vue.component('v-navbar', require('./components/v-navbar.vue'));
Vue.component('v-post', require('./components/post/v-post.vue'));
Vue.component('share-modal', require('./components/post/share-modal.vue'));
Vue.component('v-user-profile', require('./components/perfil/v-profile.vue'));
Vue.component('v-empresa-profile', require('./components/empresa/v-empresa-profile.vue'));


Router.beforeEach(
  (to, from, next)=>{
      if (to.matched.some(record=>record.meta.forVisitors)) {
        if (Vue.auth.isAuthenticated()) {
          next({
            path: '/'
          })
        } else next()
      }

      if (to.matched.some(record=>record.meta.forAuth)) {
        if (!Vue.auth.isAuthenticated()) {
          next({
            path: '/login'
          })
        } else next()
      }
      if (to.matched.some(record=>record.meta.forAdmin)) {
        if (!Vue.auth.isAuthenticated()) {
          next({
            path:'/adminA'
          })
        }
        else next()
      }
      else next()
  }
)
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router: Router,
  computed:{
    ...mapGetters(['GET_TOKEN'])
  }
})
