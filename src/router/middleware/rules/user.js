import store from '../../../store'

export default (to, from, next) => {
	if (store.getters['isAuth']) {
		store.dispatch('accountInfo')
		next()
	} else {
		next({ name: 'login' })
	}
}
