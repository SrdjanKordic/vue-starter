import Home from '../views/Home.vue'
import EmptyPage from '../views/EmptyPage.vue'
import UIKit from '../views/UIKit.vue'
import Users from '../views/users/UsersParent.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Account from '../views/account/Account.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'
import SettingsParent from '../views/settings/SettingsParent.vue'
import Logs from '../views/Logs.vue'
import store from '../store/index'

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
		path: '/empty-page',
		component: EmptyPage,
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
		children: [
			{
				path: '',
				component: () => import(/* webpackChunkName: "account" */ '../views/users/Users.vue'),
			},
			{
				path: ':id',
				component: () => import(/* webpackChunkName: "account" */ '../views/users/edit/EditParent.vue'),
				children: [
					{
						path: '',
						component: () => import(/* webpackChunkName: "account" */ '../views/users/edit/Overview.vue'),
						name: 'userOverview',
					},
					{
						path: 'information',
						component: () =>
							import(/* webpackChunkName: "account" */ '../views/users/edit/Information.vue'),
						name: 'userInformation',
					},
					{
						path: 'timeline',
						component: () => import(/* webpackChunkName: "account" */ '../views/users/edit/Timeline.vue'),
						name: 'userTimeline',
					},
					{
						path: 'permissions',
						component: () =>
							import(/* webpackChunkName: "account" */ '../views/users/edit/Permissions.vue'),
						name: 'userPermissions',
					},
				],
			},
		],
	},
	{
		path: '/account',
		name: 'account',
		component: Account,
		meta: {
			title: 'Your account',
			backTo: '/',
		},
		beforeEnter: middleware.user,
		children: [
			{
				path: '',
				component: () => import(/* webpackChunkName: "account" */ '../views/account/General.vue'),
				name: 'accountGeneral',
			},
			{
				path: 'password',
				component: () => import(/* webpackChunkName: "account" */ '../views/account/ChangePassword.vue'),
				name: 'accountPassword',
			},
			{
				path: 'information',
				component: () => import(/* webpackChunkName: "account" */ '../views/account/Information.vue'),
				name: 'accountInformation',
			},
			{
				path: 'social',
				component: () => import(/* webpackChunkName: "account" */ '../views/account/Social.vue'),
				name: 'accountSocial',
			},
			{
				path: 'notifications',
				component: () => import(/* webpackChunkName: "account" */ '../views/account/Notifications.vue'),
				name: 'accountNotifications',
			},
		],
	},
	{
		path: '/settings',
		component: SettingsParent,
		beforeEnter: middleware.user,
		children: [
			{
				path: '',
				component: () => import(/* webpackChunkName: "account" */ '../views/settings/General.vue'),
				name: 'settingsGeneral',
			},
			{
				path: 'roles',
				component: () => import(/* webpackChunkName: "account" */ '../views/settings/Roles.vue'),
				name: 'settingsRoles',
			},
		],
	},
	{
		path: '/logs',
		component: Logs,
		name: 'logs',
		beforeEnter: (to, from, next) => {
			if (store.getters['isAuth']) {
				if (store.state.authUser.permissions.includes('LOGS_ACCESS')) {
					next()
				} else {
					next({ name: 'home' })
				}
			} else {
				next({ name: 'login' })
			}
		},
	},
]
