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
    path: '/account',
    component: AccountDetail,
    props: true
  },
  {
    path: '/account/edit',
    component: AccountDetailEdit,
    props: (route) => ({ userId: route.query.userId })
  },
  {
    path: '/account/comment',
    component: AccountDetailComment,
    props: (route) => ({ userId: route.query.userId })
  },
  {
    path: '/feedback',
    component: Feedback,
    props: true
  },
  {
    path: '/about',
    component: About,
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
