import Home from '../views/Home.vue'
import SecondPage from '../views/SecondPage.vue'
import UIKit from '../views/UIKit.vue'
import Users from '../views/Users.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Profile from '../views/Profile.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'

import middleware from './middleware'

export default [
	{
		path: '/login',
		name: 'login',
		component: Login,
		beforeEnter: middleware.guest,
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
		beforeEnter: middleware.guest,
	},
	{
		path: '/forgot-password',
		name: 'forgotPassword',
		component: ForgotPassword,
		beforeEnter: middleware.guest,
	},
	{
		path: '/reset-password',
		name: 'resetPassword',
		component: ResetPassword,
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
	{
		path: '/profile',
		name: 'profile',
		component: Profile,
		beforeEnter: middleware.user,
	},
]
