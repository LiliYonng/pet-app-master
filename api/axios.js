import store from '@/store';
import axios from 'axios';
import router from '@/router';
const instance = axios.create({
  baseURL: '/api/manage',
  timeout: 4000,
  header: {}
})
instance.interceptors.request.use(
  (config) => {
    if(!config.headers.Authorization)
    config.headers.Authorization ='Bearer '+ store.state.user.token;
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  async (error) => {
    try {
      if (error.response && error.response.status === 401) {
      // 未登录  跳转登录页面  阻止程序运行
      //获取refrshToken,如果不存在，跳转到login页面
      const refreshToken = window.localStorage.getItem('refreshToken');
        if (!refreshToken) {
          router.push('/login')
          return Promise.reject(error)
        }
        // 刷新token，发请求，没有配置的axios，自己配置refresh_token
        // const res = await axios({
        //   url: 'http://localhost:8080/api/refreshToken',
        //   method: 'get',
        //   headers: {
        //     Authorization: `Bearer ${refreshToken}`
        //   }
        // })
        const res = await instance.request({
          url:'/refreshToken',
          method:'get',
          headers:{
            Authorization: `Bearer ${refreshToken}`
          }
        })
        console.log(res)
        const {accessToken} = res;
        store.commit('setToken',accessToken);
        // 继续发送刚才错误的请求
        // instance({之前错误的请求配置})
        // error错误对象 包含（response 响应对象 |config 请求配置）W
        error.config.headers.Authorization =  `Bearer ${accessToken}`;
        const lastRes = await axios.request(error.config)
        return lastRes.data;
      }
    } catch (e) { // exception 异常
      // 刷新token失败
      console.log(e);
      router.push('/login');
      return Promise.reject(e);
    }

    if(error&&error.response) return Promise.reject(error.response.data);
    return Promise.reject(error)
  }
)
export default instance
