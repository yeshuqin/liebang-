import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

axios.defaults.baseURL = `${location.origin}/admin/`

axios.interceptors.request.use(
  function (config) {
    // 在请求发出之前进行一些操作
    // config.headers = { "Content-Type": "multipart/form-data" };
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

// 添加一个响应拦截器
axios.interceptors.response.use(
  function (res) {
    if (res.data.code === 40001) {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    }
    return res
  },
  function (err) {
    return Promise.reject(err)
  }
)


// axios.interceptors.response.use(
//   response => {
//     const res = response.data

//     // if (res.code !== 0) {
//     //   Message({
//     //     message: res.msg || '服务错误',
//     //     type: 'error',
//     //     duration: 5 * 1000
//     //   })
//     // }

//       // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//         //   confirmButtonText: 'Re-Login',
//         //   cancelButtonText: 'Cancel',
//         //   type: 'warning'
//         // }).then(() => {
//         //   store.dispatch('user/resetToken').then(() => {
//         //     location.reload()
//         //   })
//         // })
//       // }
//       // return Promise.reject(new Error(res.message || 'Error'))
//   },
//   error => {
//     Message({
//       message: error.msg,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

const send = function(url, data = {}, methods = 'post') {
  return new Promise((resolve, reject) => {
    axios({
      method: methods,
      url: url,
      data: data
    }).then(res => {
      if (res.data.code === 0) {
        resolve(res.data)
      } else {
        reject(res.data)
        Message({
            message: res.data.msg,
            type: 'error',
            duration: 5 * 1000
          })
      }
    }).catch(res => {
      reject(res.data)
    })
  })
}

export default {
  send
}
