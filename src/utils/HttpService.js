import axios from 'axios'
import router from '../router'

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    console.log(response.headers)
    if(response.headers.hasOwnProperty("logined_token")){
      let curTime = new Date().getTime();
      console.log(response.headers.logined_token)
      window.localStorage.setItem("token",JSON.stringify({data:response.headers.logined_token,time:curTime}))
    }
    if(response.headers.hasOwnProperty("refresh_token")){
      let curTime = new Date().getTime();
      window.localStorage.setItem("token",JSON.stringify({data:response.headers.refresh_token,time:curTime}))
    }
    return response
  },
  error => {
    console.log(error)
    // if(error.response){
    //   if(error.response.status == 401){
    //     window.location.href = "https://www.gxjzypt.com"
    //   }
    // }
    // window.location.href = "https://www.gxjzypt.com"
    return Promise.resolve(error.response)
  }
)

function checkResponse (response) {
  if(response.status === 401){
    return {
      code: 401,
      msg: '未登录'
    }
  }
  if (response.status !== 200 && response.status !== 304) {
    return {
      code: response.status,
      msg: '网络异常'
    }
  }
  return response.data
}

const httpServer = (opts, data) => {
  let queryObj = {}
  let postData = {}
  if (data) {
    if (opts.method === 'get') {
      queryObj = Object.assign(data)
    }else{
      postData = Object.assign(data)
    }
  }
  // http默认配置
  let httpDefaultOpts = {
    method: opts.method,
    // 请求协议
    // baseURL,  // 基础 url 前缀
    url: opts.url,
    // 请求的地址
    timeout: 10000,
    // 超时时间, 单位毫秒
    params: queryObj,
    // get 请求时带的参数
    // 数据处理, 主要是配合下面headers里的Content-Type, 转成表单提交, 让后端可以直接用 $_POST 拿到数据
    data: postData,
    // post 请求的数据
    // 请求头信息
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }
  let token = JSON.parse(window.localStorage.getItem("token"))
  if(token){
    if(opts.url.indexOf("login") < 0){
      httpDefaultOpts.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization':token
      }
    }/*else {
      router.replace({
        path: '/home'
      })
      return new Promise(function (resolve, reject) {
        reject('登陆超时')
      })
    }*/
  }

  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts)
      .then(res => {
        let result = checkResponse(res)
        if(result.code === 0 || result.code === -1){
          resolve(result)
        }else{
          reject(result)
        }
      })
      .catch(response => {
        reject(checkResponse(response))
      })
  })

  return promise
}

export default httpServer
