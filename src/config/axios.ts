import axios from 'axios'

const appID = 'yB4EiD1Fn4iD6CSQAdrStd8F'
const appSecret = 'f4GQD1qPMiC979ABK9ph6LYu'

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  const xToken = localStorage.getItem('x-token')
  if(xToken) {
    config.headers.Authorization = `Bearer ${xToken}`
  }
  return config;
}, (error) => {
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use( (response) => {
  // Do something with response data
  if(response.headers['x-token']) {
    localStorage.setItem('x-token',response.headers['x-token'])
  }
  return response;
}, (error) => {
  if(error.response.status === 401) {
    console.log('重定向');
    window.location.href = '/login'
  }
  return Promise.reject(error);
});

export default instance
