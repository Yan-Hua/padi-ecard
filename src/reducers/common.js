import Taro from '@tarojs/taro'
import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

function locationChange(state = '/pages/home/home', { type, path }) {
    switch(type) {
        case ActionTypes.LOCATION_CHANGE:
            return path
        default:
            return state
    }
}

function padiQrCode(state = false, { type, path }) {
    switch(type) {
        case ActionTypes.SHOW_PADI_QR:
            return true
        default:
            return state
    }
}

const commonReducer = combineReducers({
    locationChange,
    padiQrCode
})

export default commonReducer