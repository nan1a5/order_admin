import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './utils/http'

Vue.use(ElementUI)
Vue.prototype.$http = http
Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

