import Taro from '@tarojs/taro'
import { take, put, call, fork, select, all, spawn } from 'redux-saga/effects'
import * as actions from '../actions'
import { api } from '../services'
import showDialog from '../components/common/showDialog'
import { setStorage, getAuthorization, getStorageSync } from '../services/storage'
import { getUserInfo, getProfile } from '../reducers/selectors'

const { 
  loginRequest, 
  aliPayRequest,
  ecards,
  getUnionId,
  profile, 
} = actions

function* fetchEntity(entity, apiFn, ...rest) {
  Taro.showLoading({ title: '' })
  yield put( entity.request(...rest) )
  const { data, error } = yield call(apiFn, ...rest)
  if(data) {
      Taro.hideLoading()
      yield put(entity.success(data))
      return { data }
  }
  if(error) {
    Taro.hideLoading()
    yield put(entity.failure(error))
    if(error.code === 'auth.required' || error.code === 'email.not.inm2') {
      // skip router automatically
      showDialog('', error.clientMsg, false, '关闭', () => Taro.redirectTo({ url: '/pages/login/login' }))
    }else if(error.code === 'has.unpaid.order') {
      console.log('跳转到订单页')
    }else {
      showDialog('', error.clientMsg, false, '关闭')
    }
    return { error }
  }
  Taro.hideLoading()
}

function* fetchEntityNotJson(entity, apiFn, ...rest) {
  Taro.showLoading({ title: '' })
  yield put( entity.request(...rest) )
  const {data, error} = yield call(apiFn, ...rest)
  if(data.toString()) {
    yield put( entity.success(data) )
    return data
  }else{
    yield put( entity.failure(error) )
  }
  Taro.hideLoading()
}

function* postEntity(apiFn, notError, ...rest) {
  Taro.hideLoading()
  const result = yield call(apiFn, ...rest)
  const {data, error} = result
  if(error) {
    // skip router automatically
    if(error.code === 'email.not.verified') {
      Taro.redirectTo({ url: '/pages/verifyEmail/verifyEmail' })
    }
    if(!notError) showDialog('', error.clientMsg, false, '关闭')
  }
  Taro.hideLoading()
  return data
}

export const fetchLoginRequest = fetchEntity.bind(null, loginRequest, api.emailLogin)
export const fetchAliPayUserId = fetchEntity.bind(null, aliPayRequest, api.aliPayUserId)
export const fetchEcards = fetchEntity.bind(null, ecards, api.fetchEcards)
export const fetchUnionId = fetchEntityNotJson.bind(null, getUnionId, api.getUnionId)
export const fetchProfiles = fetchEntity.bind(null, profile, api.fetchProfiles)
export const postAlipayUser = postEntity.bind(null, api.updateAliUser, false)

function* loadEcardsPage() {
  yield all([loadEcards(), loadProfile()])
}

function* loadEcards() {
  const diver = yield select(getUserInfo)
  // const requesting = yield select(isRequesting, actions.ECARDS)
  if(!diver) {
    yield call(fetchEcards)
  }
}

function* loadProfile() {
  const profiles = yield select(getProfile)
  if(!profiles) {
    yield call(fetchProfiles)
  }
}

function* watchNavigate() {
  while(true) {
    const location = yield take(actions.LOCATION_CHANGE)
    const { path, params } = location.path
    if(path === '/pages/ecardsList/ecardsList') {
      try {
        yield call(loadEcardsPage)
      }catch(error) {
        showDialog('发生错误', '系统繁忙，请稍后再试', false, '关闭')
      }
    }
    if(path === '/pages/login/login' || path === '/pages/verifyEmail/verifyEmail') {
      yield call(loadProfile)
    }
  }
}

function* watchLoadPage() {
  while(true) {
    yield take(actions.LOAD_PAGE)
    if(process.env.TARO_ENV === 'weapp') {
      try {
        const token = yield call(() => getAuthorization())
        if(token.data) {
          const result = yield call(fetchEcards)
          if(result) {
            Taro.redirectTo({ url: '/pages/ecardsList/ecardsList' })
          }else {
            showDialog('发生错误', '系统繁忙，请稍后再试', false, '关闭')
          }
        }
      }catch(error) {
        const { code } = yield call(() => Taro.login())
        if(code) {
          const unionId = yield call(fetchUnionId, code)
          if(unionId) {
            setStorage('token', unionId)
            Taro.redirectTo({ url: '/pages/login/login' })
          }else {
            showDialog('发生错误', '系统繁忙，请稍后再试', false, '关闭')
          }
        }else {
          showDialog('', '请求授权失败', false, '关闭')
        }
      }
    }else if(process.env.TARO_ENV === 'alipay') {
      console.log('ali')
      const token = getStorageSync('token')
      const userInfo = getStorageSync('userInfo')
      if(userInfo) {
        // userInfo in storage
        if(token) {
          userInfo.userId = token
          try {
            yield call(postAlipayUser, userInfo)
            Taro.redirectTo({ url: '/pages/login/login' })
          }catch(error) {
            showDialog('发生错误', '系统繁忙，请稍后再试', false, '关闭')
          }
          Taro.redirectTo({ url: '/pages/login/login' })
        }else {
          try {
            const { authCode } = yield call(() => my.getAuthCode())
            const { data } = yield call(fetchAliPayUserId, authCode)
            if(data.status === 0) {
              setStorage('token', data.data)
              userInfo.userId = token
              try {
                yield call(postAlipayUser, userInfo)
                Taro.redirectTo({ url: '/pages/login/login' })
              }catch(error) {
                showDialog('发生错误', '系统繁忙，请稍后再试', false, '关闭')
              }
            }else {
              showDialog('', '请求授权失败', false, '关闭')
            }
          }catch(error) {
            showDialog('', '请求授权失败', false, '关闭')
          }
        }
      }else {
        // userInfo not in storage
        Taro.redirectTo({ url: '/pages/aliPayLoadPage/aliPayLoadPage' })
      }
    }else if(process.env.TARO_ENV === 'h5') {
        console.log('h5')
        Taro.redirectTo({ url: '/pages/login/login' })
    }
  }
}

function* watchEmailLogin() {
  while(true) {
    const emailLogin = yield take(actions.EMAIL_LOGIN)
    try {
      const { data } = yield call(fetchLoginRequest, emailLogin)
      if(process.env.TARO_ENV === 'h5' && data && data.token) {
        setStorage('token', data.token)
      }
      if(data && data.ok === true) {
        Taro.navigateTo({ url: '/pages/ecardsList/ecardsList' })
      }
    } catch(error) {
      showDialog('发生错误', '系统繁忙，请稍后再试', false, '关闭')
    }
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchNavigate),
    fork(watchEmailLogin),
    fork(watchLoadPage)
  ])
}