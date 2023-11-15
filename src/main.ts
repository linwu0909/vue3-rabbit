import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/style/common.scss'
import { lazyPlugin } from '@/directive'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 通过插件的方式注册自定义指令
app.use(lazyPlugin)
app.mount('#app')
