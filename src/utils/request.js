import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: 'http://120.92.79.156:8080/',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const send = function(url, data = {}, methods = 'post') {
  console.log(data, 'data==')
  return new Promise((resolve, reject) => {
    axios({
      method: methods,
      url: url,
      data: data
      // headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(res => {
      reject(res.data)
    })
    // axios({
    //   method: 'get',
    //   url: url,
    //   data: {
    //     current: 1,
    //     size: 10
    //   }
    // }).then(function(res) {
    //   resolve(res.data)
    // })
  })
}

export default {
  send,
  service
}
