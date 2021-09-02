import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './libs'
import settings from './config/settings'

// Element-UI
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';

// 全局样式
import './styles/index.scss';


(async () => {

    // 微信登录授权
    if (settings.wxLogin) {
        const { wxAuth } = await import('./libs/wxAuth')
        await wxAuth();
    }

    const app = createApp(App)

    app.use(ElementPlus, { locale }).use(router).use(store).mount('#app')
})()