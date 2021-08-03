import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery'
window.jQuery = window.$ = jQuery
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.min.js'
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
