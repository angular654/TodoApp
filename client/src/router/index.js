import Vue from 'vue'
import Router from 'vue-router'
const Notes = () => import('@/components/Notes')
const Auth = () => import('@/components/Auth')
import PageNotFound from '@/components/PageNotFound'
const Create = () => import('@/components/Create')
const Signin = () => import('@/components/Signin')
const Files = () => import('@/components/Files')
const Info = () => import('@/components/Info')
Vue.use(Router)

export default new Router({
  routes: [
    {
     path: '/', component: Notes
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/files',
      name: 'FileStorage',
      component: Files
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    { path: "*", component: PageNotFound }
  ]
})
