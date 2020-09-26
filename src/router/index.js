import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/Home'
import Call from '@/components/Call'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/call',
      name: 'Call',
      component: Call
    }
  ]
})
