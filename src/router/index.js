import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Search from '../views/Search'
import Setting from '../views/Settings'
import MovieDetail from '../views/MovieDetail'
import MovieMore from '../views/MovieMore'
import AccountDetail from '../views/AccountDetail'
import AccountDetailEdit from '../components/AccountDetailEdit'
import AccountDetailComment from '../components/AccountDetailComment'
import AccountDetailMovie from '../components/AccountDetailMovie'
import About from '../views/About'
import Feedback from '../views/Feedback'

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
    component: Search
  },
  {
    path: '/settings',
    component: Setting
  },
  {
    path: '/movie/:path',
    component: MovieDetail
  },
  {
    path: '/movies',
    component: MovieMore
  },
  {
    path: '/account',
    component: AccountDetail
  },
  {
    path: '/account/edit',
    component: AccountDetailEdit
  },
  {
    path: '/account/comments',
    component: AccountDetailComment
  },
  {
    path: '/account/movies',
    component: AccountDetailMovie
  },
  {
    path: '/feedback',
    component: Feedback
  },
  {
    path: '/about',
    component: About
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
