import Vue from 'vue'
import Router from 'vue-router'
import StockView from '@/views/StockView.vue'  // 导入视图组件
import ZheXian from '@/views/ZheXianView.vue'
import DistributionView from '@/views/DistributionView.vue'
import ChatView from '@/views/ChatView.vue'
Vue.use(Router)  // 注册路由插件，让 Vue 知道你要用路由功能

export default new Router({
  mode: 'history',  // 路由模式，使用 HTML5 history API，URL 是正常路径（没有 #）
  routes: [         // 路由规则数组
    {
      path: '/',       // 访问根路径时
      name: 'StockView',  // 路由名称（可选，用于编程导航）
      component: StockView,  // 显示 StockView 组件
    },
    {
      path: '/overview/option1',  // 访问 /overview/option1 时
      name: 'OverviewOption1',  // 路由名称
      component: StockView,  // 显示 StockView 组件
    },
    {
      path: '/overview/option2',
      name: 'OverviewOption2',
      component: ZheXian
    },
    {
      path: '/overview/option3',
      name: 'OverviewOption3',
      component: DistributionView
    },
    {
      path:  '/nav2/option1',
      name: 'Nav2Option1',
      component: ChatView
    }
    
  ],
})
