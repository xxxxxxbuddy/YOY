import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
import { Loading } from 'element-ui';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/BuyTicket',
      name: 'BuyTicket',
      component: resolve => require(['../views/buy/BuyTicket.vue'], resolve)
    },
    {
      path: '/AvailTickets',
      name: 'AvailTickets',
      component: resolve => require(['../views/buy/AvailTickets.vue'], resolve)
    },
    {
      path: '/MyTicket',
      name: 'MyTicket',
      component: resolve => require(['../views/buy/MyTicket.vue'], resolve)
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: resolve => require(['../views/buy/confirm.vue'], resolve)
    },
    {
      path: '/payment',
      name: 'payment',
      component: resolve => require(['../views/buy/payment.vue'], resolve)
    },
    {
      path: '/VisitorLogin',
      name: 'VisitorLogin',
      component: resolve => require(['../views/visit/login.vue'], resolve)
    },
    {
      path: '/Visit',
      name: 'Visit',
      component: resolve => require(['../views/visit/Visit.vue'], resolve)
    },
    {
      path: '/Route',
      name: 'Route',
      component: resolve => require(['../views/visit/Route.vue'], resolve)
    },
    {
      path: '/Team',
      name: 'Team',
      component: resolve => require(['../views/visit/Team.vue'], resolve)
    },
    {
      path: '/RouteDetail',
      name: 'RouteDetail',
      component: resolve => require(['../views/visit/RouteDetail.vue'], resolve)
    },
    {
      path: '/Facility',
      name: 'Facility',
      component: resolve => require(['../views/visit/Facility.vue'], resolve)
    },
    {
      path: '/Food',
      name: 'Food',
      component: resolve => require(['../views/visit/Food.vue'], resolve)
    },
    {
      path: '/Store',
      name: 'Store',
      component: resolve => require(['../views/visit/Store.vue'], resolve)
    },
    {
      path: '/Order',
      name: 'Order',
      component: resolve => require(['../views/visit/Order.vue'], resolve)
    },
    {
      path: '/MyOrder',
      name: 'MyOrder',
      component: resolve => require(['../views/visit/MyOrder.vue'], resolve)
    },
    {
      path: '/Map',
      name: 'Map',
      component: resolve => require(['../views/visit/Map.vue'], resolve)
    },
    {
      path: '/DeviceNotSupport',
      name: 'DeviceNotSupport',
      component: resolve => require(['../views/DeviceNotSupport.vue'], resolve)
    },
    {
      path: '/Card',
      name: 'Card',
      component: resolve => require(['../views/visit/Card.vue'], resolve)
    },
    {
      path: '/HistoryRecord',
      name: 'HistoryRecord',
      component: resolve => require(['../views/visit/HistoryRecord.vue'], resolve)
    },
    {
      path: '/Notice',
      name: 'Notice',
      component: resolve => require(['../views/visit/Notice.vue'], resolve)
    }
  ]
})
router.beforeEach((to, from, next) => {
  let loadingInstance = Loading.service();
  next();
})

router.afterEach((to, from) => {
  let loadingInstance = Loading.service();
  loadingInstance.close();
})

export default router;
