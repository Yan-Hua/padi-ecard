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

const commonReducer = combineReducers({
    locationChange
})

export default commonReducer