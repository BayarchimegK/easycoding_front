import axios from 'axios'
import keycloak from './keycloak.ts'

const BASE_URL = 'http://localhost:8088'
keycloak.init({
    onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
    checkLoginIframe: true,
    pkceMethod: 'S256',
}).then((auth) => {
    if (!auth) {
        window.location.reload()
    } else {
        /* Remove below logs if you are using this on production */
        console.info('Authenticated')
        console.log('auth', auth)
        console.log('Keycloak', keycloak)
        console.log('Access Token', keycloak.token)

        /* http client will use this header in every request it sends */
        // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}`
        sessionStorage.setItem('auth', keycloak.token as string)

        keycloak.onTokenExpired = () => {
            console.log('token expired')
        }
    }
}, () => {
    /* Notify the user if necessary */
    console.error('Authentication Failed')
})
/********** for Content-Type 'application/json' **********/
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    data: {},
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})
axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${sessionStorage.getItem('auth')}`
        return config
    }, (error) => {
        return Promise.reject(error)
    },
)

export default axiosInstance