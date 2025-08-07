import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'  // 导入路由配置
Vue.config.productionTip = false

Vue.config.productionTip = false
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
