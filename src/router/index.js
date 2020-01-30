import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import MovieDetail from '../views/MovieDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/movie',
    component: MovieDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
