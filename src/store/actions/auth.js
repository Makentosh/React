import  Axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
	return async dispatch  => {
		const authData = {
		    email,
		    password,
		    returnSecureToken: true
		}

		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_vFbt3vDcqv5eT6MGiQ_qjXDjrEUIWNY';

		if (isLogin) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_vFbt3vDcqv5eT6MGiQ_qjXDjrEUIWNY'
		}
		const response = await Axios.post(url, authData)
		console.log(response.data)
		const data = response.data
		const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
		localStorage.setItem('token', data.idToken)
		localStorage.setItem('userId', data.localId)
		localStorage.setItem('expirationDate', expirationDate)

		dispatch(authSuccess(data.idToken))
		dispatch(autoLogout(data.expiresIn))


	}
}
export function logout() {
	localStorage.removeItem('token')
	localStorage.removeItem('userId')
	localStorage.removeItem('expirationDate')

	return {
		type: AUTH_LOGOUT
	}
}

export function autoLogout(time) {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout)
		},time * 1000)
	}
}
export function authSuccess(token) {
	return {
		type: AUTH_SUCCESS,
		token
	}
}