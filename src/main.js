import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { currency } from './filter.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.filter('currency', currency)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.mixin({
   data() {
     return {
         backendUrl: '127.0.0.1/ess',
         typeColor: {
             solar: '#ffc400',
             grid: '#81e8fb',
             load: '#ff5f60',
             battery: '#7ef38d',
         }
     }
   },
   methods: {
       getSum(total, num) {
           return total + num;
       },
       calc_money(use){
           let money, tax1, tax2;
           if(use < 200){
               money = 910 + (93.3 * use) - 4000;
               if(money < 1000) money = 1000;
           }
           else if(use < 400) money = 1600 * 18660 + (187.9 * (use-200));
           else money = 7300 + 18660 + 37580 + (280.6 * (use-400));
           tax1 = money * 0.1;
           tax2 = money * 0.037;
           money = (money + tax1 + tax2 ) - (money + tax1 + tax2 )%10;
           return money;
       }
   }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
