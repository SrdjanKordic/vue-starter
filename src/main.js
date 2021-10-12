import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'

import 'bootstrap'

Vue.use(VueSweetalert2, {
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
})

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faBars,
	faBox,
	faClock,
	faCogs,
	faEdit,
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
	faUserEdit,
	faEdit
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
