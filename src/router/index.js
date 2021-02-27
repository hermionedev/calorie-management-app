import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Auth from '@/components/Auth'
import Setting from '@/components/setting/Settings'
import IntakeList from '@/components/intake/IntakeList'
import IntakeCreate from '@/components/intake/IntakeCreate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Setting
    },
     {
      path: '/intake-list',
      name: 'IntakeList',
      component: IntakeList
    },
    {
      path: '/intake-list/:msg',
      name: 'IntakeUpdatedList',
      component: IntakeList
    },
    {
      path: '/intake-create',
      name: 'IntakeCreate',
      component: IntakeCreate
    },
    {
      path: '/intake-create/:pk',
      name: 'IntakeUpdate',
      component: IntakeCreate
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})