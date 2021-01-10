import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password, returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6XJ6t_9HpC5HmHyHLhu_CNaRr0Dahz7E'
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6XJ6t_9HpC5HmHyHLhu_CNaRr0Dahz7E'
        }
        const res = await axios.post(url, authData)
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
        localStorage.token = res.data.idToken
        localStorage.userId = res.data.localId
        localStorage.expirationDate = expirationDate
        dispatch(authSuccess(res.data.idToken))
        dispatch(autoLogout(res.data.expiresIn))
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function autoLogin() {
    return dispatch => {
       const token = localStorage.token
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }

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