import axios from 'axios';

// const baseURL = process.env.Request_URL

// console.log('', import.meta.env.BASE_URL);
// debugger

// axios.interceptors.request.use(function (config) {
//     config.
// })

const instance = axios.create({
    baseURL: '/client',
    timeout: 30000,
    headers: {'Request-from': 'client'}
  });

  instance.interceptors.request.use(function (request) {
    request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return request
  })

  instance.interceptors.response.use(function (response) {
    if (response.status == 200) {
      return response.data;
    }
  }, function (err) {
    console.error('响应失败',err)
    return Promise.reject(err);
  })

  export default instance;
