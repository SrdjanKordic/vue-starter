import restAPI from '../api'
import store from '../store'
import { Device } from '@capacitor/device'
import ip from 'ip'

const handleErrors = (error, type) => {
	console.log(error.response.data)
	let errorMsg = handleValidationErrors(error, type)
	if (errorMsg != '') {
		return errorMsg
	} else {
		return error
	}
}

const handleValidationErrors = (error, type) => {
	let errorMessage = ''
	let validationProps = []
	let validationErrors = error.response.data.error
	switch (type) {
		case 'login':
			validationProps = ['email', 'password']
			break
		case 'register':
			validationProps = ['email', 'password', 'name']
			break
		case 'forgotPassword':
			validationProps = ['email']
			break
		case 'resetPassword':
			validationProps = ['email', 'password']
			break
		case 'userCreate':
			validationProps = ['email', 'password', 'name']
			break
		case 'userUpdate':
			validationProps = ['name']
			break
		case 'userAvatar':
			validationProps = ['avatar']
			break
		case 'roleStore':
			validationProps = ['name']
			break
	}

	if (error.response.data.error) {
		validationProps.forEach(prop => {
			if (validationErrors[prop]) {
				errorMessage += ' ' + validationErrors[prop]
			}
		})
	}

	if (type === 'login' && error.response.data.message) {
		errorMessage = error.response.data.message
	}

	return errorMessage
}

const logActivity = async (type, operation, description, subjectType, subjectId, properties) => {
	let deviceInfo = await logDeviceInfo()

	let logInfo = {
		type,
		operation,
		description,
		subject_type: subjectType,
		subject_id: subjectId,
		properties: JSON.stringify(properties),
		user_agent: navigator.userAgent,
		user_id: store.state.account.id,
		user_ip: ip.address(),
		user_os: deviceInfo.operatingSystem,
		user_os_version: deviceInfo.osVersion,
		user_platform: deviceInfo.platform,
	}

	restAPI.post('/log', logInfo)
}

const logDeviceInfo = async () => {
	return await Device.getInfo()
}

export { handleErrors, logActivity }
