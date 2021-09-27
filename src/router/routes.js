import Home from '../views/Home.vue'
import SecondPage from '../views/SecondPage.vue'
import UIKit from '../views/UIKit.vue'
import Users from '../views/Users.vue'
import Login from '../views/auth/Login.vue'

import middleware from './middleware'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: middleware.guest,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: middleware.user,
  },
  {
    path: '/second-page',
    component: SecondPage,
  },
  {
    path: '/ui-kit',
    component: UIKit,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    beforeEnter: middleware.user,
  },
]
