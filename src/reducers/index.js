import { combineReducers } from 'redux'
import { SUCCESS } from '../actions'
import * as ActionTypes from '../actions'
import commonReducer from './common';

function data(state = {}, { type, data }) {
  switch(type) {
    case ActionTypes.LOGIN_REQUEST[SUCCESS]:
      const { wechat } = state
      return { wechat }
    case ActionTypes.ECARDS[SUCCESS]:
      const { wechatUser, ...ecardsResult } = data
      return {...state, ...ecardsResult}
    case ActionTypes.PROFILE[SUCCESS]:
      return {...state, ...data}
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  data,
  common: commonReducer
})
  
export default rootReducer