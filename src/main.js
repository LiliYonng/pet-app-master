import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'
//import '../api/mock'
import autoIcon from './Icon'
import {btnPermission} from '@/directives/permission'
import {formatDate} from '@/utils/formatDate'
//在应用实例创建之前加载cookie中保存的数据
store.commit('getMenu', router)
store.commit('getUserInfo')
store.commit('getToken')
store.commit('getTap') // 恢复原有的tap
store.commit('getBtnPermission'); // 恢复原有的permission
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (to.name != 'login' && !token) next({ name: 'login' })
  else if (token && to.name === 'login') next({ name: 'home' })
  else {
    next()
  }
})
const app = createApp(App)
app.directive('permission',btnPermission)
app.config.globalProperties.$icon = autoIcon
// 挂载全局方法
app.config.globalProperties.$formateDate = formatDate
app.use(store).use(router).mount('#app')
