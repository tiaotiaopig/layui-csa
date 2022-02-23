/* eslint-disable */
// import axios from 'axios';
axios.defaults.timeout = 3600;  //超时时间设置
// 前端开了跨域，后端也要设置，不然就不要开
axios.defaults.withCredentials = true;  //true允许跨域
//Content-Type 响应头
// application/x-www-form-urlencoded;charset=UTF-8
// application/json
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// // 设置base_url
axios.defaults.baseURL = 'http://192.168.50.17:7788';
// const myaxios = axios.create({
//   baseURL: 'http://localhost:7788',
//   withCredentials: true,
//   timeout: 3600
// });
// myaxios.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 403:
          // console.log('管理员权限已修改请重新登录')
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          // console.log('请求页面飞到火星去了')
          break;
      }
      return Promise.reject(error.response);
    }
  });

  // 请求拦截器 
  axios.interceptors.request.use(function(config) {
    // console.log(config.url)
    // 任何请求都会经过这一步   在发送请求之前做些什么
    if(localStorage.getItem("satoken") != null) {
        config.headers.satoken = localStorage.getItem("satoken");
    }
    // 这里一定要return   否则配置不成功  
    return config;
  }, function(err){
    // 对请求错误做点什么    
    console.log(err)
  });



/**
   * 封装get方法
   * @param url
   * @param data
   * @returns {Promise}
   */

function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */

function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
   * 封装delete请求
   * @param url
   * @param data
   * @returns {Promise}
   */

function deletes(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
   * 封装put请求
   * @param url
   * @param data
   * @returns {Promise}
   */

function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
