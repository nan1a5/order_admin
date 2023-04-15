import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instanc
const service = axios.create({
    baseURL: 'http://localhost:3039/api',
    timeout: 5000 
})

// request interceptor
service.interceptors.request.use(config => {
    // console.log(config);
    return config
}, error => {
    console.log(error);
    Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error);
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
