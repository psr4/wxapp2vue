import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import './common/style/init.less'
import router from './router/index.js'
import store from './store/index.js'
Vue.config.productionTip = false

// loading
import 'vue2-toast/lib/toast.css';
import Loading from 'vue2-toast';
Vue.use(Loading,{
  defaultType: 'center',
  duration: 3000,
  wordWrap: true,
  width: '150px'
});
// messagebox
import {Alert, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Alert, {})
Vue.use(Confirm, {})
Vue.use(Toast, 2000)

/* eslint-disable no-new */
router.afterEach((to, from) => {
  clearTimeout(this.timer)
  this.timer = setTimeout(() => {
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent('Redirect')
    document.dispatchEvent(e, true, true);
  }, 500)
})

window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
