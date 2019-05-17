import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import './common/style/init.scss'
import store from './store/index.js'
import router from './router/index.js'
import vconsole from 'vconsole'


import './weapp/import.js'

Vue.config.productionTip = false

// loading
/*
 import 'vue2-toast/lib/toast.css';
 import Loading from 'vue2-toast';
 Vue.use(Loading,{
 defaultType: 'center',
 duration: 3000,
 wordWrap: true,
 width: '150px'
 });
 */
// messagebox
import { Alert, Confirm, Toast } from 'wc-messagebox'
import 'wc-messagebox/style.css'

Vue.use(Alert, {})
Vue.use(Confirm, {})
Vue.use(Toast, 2000)

/* eslint-disable no-new */

new vconsole();
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
