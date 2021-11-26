import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../pages/Home.vue'
// import mainLayout from '../pages/mainLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainLayout',
    component: () =>
      import(/* webpackChunkName:'mainLayout' */ '../Layout/mainLayout.vue'),
    redirect: '/Home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        meta: {
          isShow: true,
          title: '首页',
        },
        component: () =>
          import(/* webpackChunkName: "Home" */ '../pages/Home.vue'),
      },
      {
        path: '/About',
        name: 'About',
        meta: {
          isShow: true,
          title: '关于',
        },
        component: () =>
          import(/* webpackChunkName: "Home" */ '../pages/About.vue'),
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
})

export default router
