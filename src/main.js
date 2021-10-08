import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'

import 'bootstrap'

Vue.use(Toasted, {
	duration: 4000,
	position: 'bottom-right',
	router,
})

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faBars,
	faBox,
	faClock,
	faCogs,
	faHouseUser,
	faInfoCircle,
	faLock,
	faPaperclip,
	faUser,
	faUserEdit,
	faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(
	faBars,
	faHouseUser,
	faPaperclip,
	faBox,
	faCogs,
	faUsers,
	faGithub,
	faGoogle,
	faFacebook,
	faInfoCircle,
	faUser,
	faClock,
	faLock,
	faUserEdit
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
