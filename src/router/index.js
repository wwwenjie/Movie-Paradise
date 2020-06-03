import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Search from '../views/Search'
import Setting from '../views/Settings'
import MovieDetail from '../views/MovieDetail'
import MovieMore from '../views/MovieMore'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/index',
    component: Home
  },
  {
    path: '/search',
    component: Search,
    props: true
  },
  {
    path: '/settings',
    component: Setting,
    props: true
  },
  {
    path: '/movie/:path',
    component: MovieDetail,
    props: true
  },
  {
    path: '/movies',
    component: MovieMore,
    props: true
  },
  {
    // it supposed to be 404 page
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
