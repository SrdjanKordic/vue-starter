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

export { handleErrors }
