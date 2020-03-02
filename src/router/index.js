import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import MovieDetail from '../views/MovieDetail'
import Setting from '../views/Settings'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/index',
    component: Home
  },
  {
    path: '/movie/:movieId',
    component: MovieDetail,
    props: true
  },
  {
    path: '/settings',
    component: Setting,
    props: true
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
