import store from '../../../store'

export default (to, from, next) => {
	let routeAccessPermission = to.matched[0].props.default.permission
	if (store.getters['isAuth']) {
		if (routeAccessPermission === '') {
			next()
		} else if (store.state.authUser.permissions.includes(routeAccessPermission)) {
			next()
		} else {
			next({ name: 'home' })
		}
	} else {
		next({ name: 'login' })
	}
}
