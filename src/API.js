import axios from "axios"

export const API_URL = 'https://auto-leasing-bank.herokuapp.com/api/'


const $api = axios.create({
  withCredentials:true,
  credentials: "same-origin",
  baseURL:API_URL,
  headers: {
    "Content-Type":"application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  },
})


$api.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  }
)


export default $api