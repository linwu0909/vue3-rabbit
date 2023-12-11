import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '../router'
// 可以通过axios.create创建多个实例，这样就能连接到多个地址
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

httpInstance.interceptors.request.use(
  (config) => {
    // console.log('000')
    const userStore = useUserStore()
    const token = userStore.userInfo.token

    // console.log('333')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    // console.log('111')
    debugger
    const userStore = useUserStore()
    console.log('e', e)
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })
    // console.log('222')
    debugger
    e.response.status = 401
    if (e.response.status === 401) {
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(e)
  }
)

export default httpInstance
