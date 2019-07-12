import Taro from '@tarojs/taro'
import { getAuthorization, getStorageSync } from './storage'

var config = require("./config.json");

const baseURL = config.baseURL_qa;

const http = async (endpoint, data, method) => {
  const language = getStorageSync('language') === 'tc' ? 'zh_TW' : getStorageSync('language') === 'en' ? 'en' : 'zh_CN'
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
  if(method === 'GET') {
    data.lang = language
  }
  const url = method === 'POST' ? `${endpoint}?lang=${language}` : `${endpoint}`
  return Taro.request({
    url,
    data,
    header,
    method,
    // cache: 'no-cache'
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

const getData = async (endpoint, data) => http(`${baseURL}${endpoint}`, data, 'GET')
const postData = async (endpoint, data) => http(`${baseURL}${endpoint}`, data, 'POST')

export const emailLogin = ({email, password}) => postData(config.emailLogin, {username: email, password})
export const aliPayUserId = (code) => getData(config.getAliPayUserId, {code})
export const fetchEcards = async () => getData(config.ecards, {})
export const getUnionId = (jsCode) => getData(config.getUnionId, {jsCode})
export const fetchProfiles = (email) => getData(config.profiles, {email})
export const updateAliUser = (data) => postData(config.updateAlipayUser, data)