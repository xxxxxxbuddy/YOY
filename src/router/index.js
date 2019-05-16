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
      path: '/buyTicket',
      name: 'buyTicket',
      component: resolve => require(['../views/buyTicket.vue'], resolve)
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
