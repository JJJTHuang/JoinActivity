import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/view/Index.vue'
import User from '@/view/User.vue'
import Activity from '@/view/Activity.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    }
  ]
})
