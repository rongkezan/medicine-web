// 封装 ls 存取token
const key = 'token';

const setToken = (token) => {
    return window.localStorage.setItem(key, token)
}

const getToken = (token) => {
    return window.localStorage.getItem(key, token)
}

const removeToken = () => {
    return window.localStorage.removeItem(key)
}

export { setToken, getToken, removeToken }