/*
ajax 请求函数模块
*/
import router from "../router/index"
import {
  isWx
} from "../util";
import {
  getCode
} from "../api/user";
import {
  showLoading,
  hideLoading
} from '../assets/js/loading';
import axios from 'axios'
import {
  Toast
} from "vant";
/**Í
 * 向外部暴漏一个函数 ajax
 * @param {*} url 请求路径，默认为空
 * @param {*} data 请求参数，默认为空对象
 * @param {*} type 请求方法，默认为GET
 */
export default function ajax(url = '', data = {}, type = 'GET') {
  // 返回值 Promise对象 （异步返回的数据是response.data，而不是response）
  return new Promise(function (resolve, reject) {
    // （利用axios）异步执行ajax请求
    let promise // 这个内部的promise用来保存axios的返回值(promise对象)
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = '' // 数据拼接字符串，将data连接到url
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    promise.then(response => {
        // 成功回调resolve()
        // console.log(response)
        if (response == undefined) {
          console.log("response.data遭受不明生物袭击！！")
        } else {
          resolve(response.data)
        }
      })
      .catch(error => {
        // 失败回调reject()
        reject(error)
      })
  })
}
/* 请求拦截器（请求之前的操作） */
axios.interceptors.request.use((req) => {
  // console.log(req)
  showLoading();
  if (req.method == 'post') {
    if (sessionStorage.getItem("cookie") == null) {
      req.data.cookie = ""
    } else {
      req.data.cookie = `${sessionStorage.getItem("cookie")}`
    }
  }

  return req;
}, err => Promise.reject(err));

/* 请求之后的操作 */
axios.interceptors.response.use((res) => {
  const code = res.data.code
  // console.log(code)
  if (code == 1) {
    hideLoading();
    return res;
  } else if (code == -7) {
    if (isWx()) {
      console.log("过期了")
      sessionStorage.removeItem('cookie');
      getCode();
      setTimeout(() => {
        router.go(0)
      }, 1000);
      hideLoading();
      return res;
    } else {
      router.push('/login')
      Toast.fail('登录过期')
      sessionStorage.removeItem('cookie');
      hideLoading();
      return res;
    }
  } else if (code == -12) {
    Toast.fail('请绑定手机号后操作')
    router.push('/bdingPhone')
    hideLoading();
  } else if (code == -14) {
    Toast.fail('不是学员身份')
    router.push('/openStudent')
    hideLoading();
  }//else if(code == -8){
  //   Toast.fail('资源不存在')
  //   router.go(-1);
  //   hideLoading();
  // } 
  else {
    hideLoading();
    return res;
  }

}, (err) => {
  hideLoading();
  return Promise.reject(err);
});
