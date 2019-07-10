import Taro from '@tarojs/taro'

export const setStorage = (key, data) => {
    Taro.setStorage({ key, data })
}

export const getStorage = (key) => {
    return Taro.getStorage({ key })
}

export const removeStorage = (key) => {
    Taro.removeStorage({ key })
}

export const getAuthorization = () => {
    return getStorage('token')
}

export const getStorageSync = (key) => {
    return Taro.getStorageSync(key)
}