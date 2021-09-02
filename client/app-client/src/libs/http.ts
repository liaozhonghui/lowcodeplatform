import axios from 'axios'
import router from '../router/index'
import store from "../store/index"
import { result, errMsg } from "../api/result"
import settings from '../config/settings'
import { ElMessage } from 'element-plus'

const service = axios.create({
    withCredentials: true,
    timeout: 120000
})

// 添加一个请求拦截器
service.interceptors.request.use(
    config => {

        // header添加token
        const sessiontoken = sessionStorage.getItem('sessiontoken') || ''
        const freshtoken = sessionStorage.getItem('freshtoken') || ''
        config.headers = {
            ...config.headers,
            sessiontoken,
            freshtoken,
            authorization: sessiontoken,
            'Access-Control-Expose-Headers': 'sessionToken, freshtoken',
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 添加一个返回拦截器
service.interceptors.response.use(
    async (response) => {

        const code = response.data.errno

        // 重置最新token
        const headers = response.headers
        if (headers?.sessiontoken) {
            sessionStorage.setItem('sessiontoken', headers.sessiontoken)
        }
        if (headers?.freshtoken) {
            sessionStorage.setItem('freshtoken', headers.freshtoken)
        }

        // 接口当前登录状态失效或不存在
        if (code === result.TOKENEXP) {
            await store.dispatch('clearUserInfo');
            if (settings.wxLogin) {
                window.location.reload();
            } else {
                router.push({path: '/login'})
            }
            // 中断promise链
            return new Promise(() => {})
        }
        // 服务器错误
        else if (code !== result.NORMAL) {
            const errCode = code || 999
            const msg = settings.serverError ? response.data.errmsg : (errMsg as any)[errCode];
            ElMessage.error(msg)
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)
export default service;
