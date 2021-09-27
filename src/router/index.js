import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SecondPage from '../views/SecondPage.vue'
import UIKit from '../views/UIKit.vue'
import Users from '../views/Users.vue'
import Login from '../views/auth/Login.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: Login },
    { path: '/', component: Home },
    { path: '/second-page', component: SecondPage },
    { path: '/ui-kit', component: UIKit },
    { path: '/users', component: Users }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

export default router
