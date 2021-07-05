import axios from 'axios'
import API from './api'

import showAlert from '@/x-views/xAlert/xAlert'


let developmentMode = undefined
if(process.env.NODE_ENV === 'development'){
  developmentMode = false
}
if(process.env.NODE_ENV === 'production'){
  developmentMode = false
}




const dataPool = axios.create({
  baseURL:developmentMode ? 'http://172.20.29.106:10086/devicemanage':'http://www.dms.yuhualab.com:10086/devicemanage'
  // baseURL:'http://172.20.29.106:10086/eval'
})

//请求拦截器
dataPool.interceptors.request.use(config => {
  const {method} = config
  return config
},error => {
  showAlert('无法获取数据,请检查网络','failure')
  return Promise.reject(error)
})

//响应拦截器
dataPool.interceptors.response.use(res => {
  const {config:reqConfig,data:resData} = res;
  const {method:reqMethod,data:reqData} = reqConfig;
  const {code} = resData
  // console.log(resData)
  if(code === 200){ //200才是成功
    return resData
  } else {
    // console.log('出错')
    console.log(resData)
  }
  return resData
},error => {
  return Promise.reject(error)
})


const http = {}
const api = Object.assign(
    {},
    API
  )


for(let key in api){
  const {method,url} = api[key]
  switch(method){
    case 'get':
      http[key] = function(config={}){
        return dataPool[method](url,config)
      }
    break;
    case 'post':
      http[key] = function(data={},config={}){
        return dataPool[method](url,data,config)
      }
    break;
    case 'delete':
      http[key] = function(config={}){
        return dataPool[method](url,config)
      }
    break;
    default:
      http[key] = null
  }
}

export default http
