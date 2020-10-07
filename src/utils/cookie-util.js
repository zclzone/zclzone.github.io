import Cookies from 'js-cookie'

const TOKEN_CODE = 'access_token'

export function getToken() {
  return Cookies.get(TOKEN_CODE)
}

export function setToken(token) {
  return Cookies.set(TOKEN_CODE, token)
}

export function removeToken() {
  Cookies.remove(TOKEN_CODE)
  Cookies.remove('User')
}

export function getUser() {
  return Cookies.get('User')
}

export function setUser(userInfo) {
  return Cookies.set('User', userInfo)
}