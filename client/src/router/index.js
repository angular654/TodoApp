import Vue from 'vue'
import Router from 'vue-router'
import Notes from '@/components/Notes'
import Auth from '@/components/Auth'
import PageNotFound from '@/components/PageNotFound'
import Create from '@/components/Create'
import Signin from '@/components/Signin'
import Files from '@/components/Files'
Vue.use(Router)

export default new Router({
  routes: [
    {
     path: '/notes/:id', component: Notes 
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
      path: '/files/:id',
      name: 'FileStorage',
      component: Files
    },
    { path: "*", component: PageNotFound }
  ]
})
