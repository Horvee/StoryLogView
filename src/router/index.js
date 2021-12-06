import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LogDetail from '../views/LogDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
        // name: 'Home',
        keepAlive: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/logDetail',
    name: 'LogDetail',
    component: LogDetail
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
