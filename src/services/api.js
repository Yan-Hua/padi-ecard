import Taro from '@tarojs/taro'
// import * as config from './config.json'
import { getAuthorization } from './storage'

var config = require("./config.json");

const baseURL = config.baseURL_qa;

const http = async (url, data, method, paramsName, params) => {
  let header = {
    'Content-Type': 'application/json'
  }
  await getAuthorization().then(res => {
    if(res.data) {
      header.Authorization = res.data
    }
  }).catch(err => {
    console.log(err)
  })
  return Taro.request({
    url: paramsName ? `${url}?${paramsName}=${params}` : url,
    data,
    header,
    method: method
  }).then(res => {
    const { statusCode, data } = res
    if(statusCode !== 200){
      console.log(`error statueCode${statusCode}`);
      return;
    }
    if(data.error) return { error: data.error }
    return { data }
  })
}

const getData = async (url, data, paramsName, params) => http(`${baseURL}${url}`, data, 'GET', paramsName, params)
const postData = async (url, data) => http(`${baseURL}${url}`, data, 'POST')

export const emailLogin = ({email, password}) => postData(config.emailLogin, {username: email, password})
export const aliPayUserId = (code) => postData(config.getAliPayUserId, code)
export const fetchEcards = async () => getData(config.ecards, {})
export const getUnionId = (jsCode, code) => getData(config.getUnionId, {}, jsCode, code)
export const fetchProfiles = (email) => getData(config.profiles, {email})