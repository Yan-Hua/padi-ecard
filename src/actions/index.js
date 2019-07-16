export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const EMAIL_LOGIN = 'EMAIL_LOGIN'
export const LOGIN_REQUEST = createRequestTypes('LOGIN_REQUEST')
export const LOAD_PAGE = 'LOAD_PAGE'
export const ALIPAY_REQUEST = createRequestTypes('ALIPAY_REQUEST')
export const LOCATION_CHANGE = 'LOCATION_CHANGE'
export const ECARDS = createRequestTypes('ECARDS')
export const WECHAT_UNIONID = createRequestTypes('WECHAT_UNIONID')
export const PROFILE = createRequestTypes('PROFILE')
export const UPDATE_ALI_USER = 'UPDATE_ALI_USER'
export const HAS_LOGIN = createRequestTypes('HAS_LOGIN')
export const SHOW_PADI_QR = 'SHOW_PADI_QR'

function action(type, payload = {}) {
  return {type, ...payload}
}

export const emailLogin = (data) => action(EMAIL_LOGIN, data)
export const loadPage = () => action(LOAD_PAGE)
export const updateAlipayUser = (data) => action(UPDATE_ALI_USER, data)

export const hasLogin = {
  request: () => action(HAS_LOGIN[REQUEST]),
  success: (data) => action(HAS_LOGIN[SUCCESS], { data }),
  failure: (error) => action(HAS_LOGIN[FAILURE], { error })
}

export const loginRequest = {
  request: () => action(LOGIN_REQUEST[REQUEST]),
  success: (data) => action(LOGIN_REQUEST[SUCCESS], { data }),
  failure: (error) => action(LOGIN_REQUEST[FAILURE], { error })
}

export const aliPayRequest = {
  request: () => action(ALIPAY_REQUEST[REQUEST]),
  success: (data) => action(ALIPAY_REQUEST[SUCCESS], { data }),
  failure: (error) => action(ALIPAY_REQUEST[FAILURE], { error })
}

export const ecards = {
  request: () => action(ECARDS[REQUEST]),
  success: (data) => action(ECARDS[SUCCESS], { data }),
  failure: (error) => action(ECARDS[FAILURE], { error }),
}

export const getUnionId = {
  request: () => action(WECHAT_UNIONID[REQUEST]),
  success: (data) => action(WECHAT_UNIONID[SUCCESS], { data }),
  failure: (error) => action(WECHAT_UNIONID[FAILURE], { error }),
}

export const profile = {
  request: () => action(PROFILE[REQUEST]),
  success: (data) => action(PROFILE[SUCCESS], { data }),
  failure: (error) => action(PROFILE[FAILURE], { error }),
}

/* common */
// export const pageLoading = () => action(PAGE_LOADING)
// export const pageLoaded = () => action(PAGE_LOADED)
// export const errorDialog = (error) => action(ERRORDIALOG, {error})
export const locationChange = (path) => action(LOCATION_CHANGE, { path })
export const showPadiQrCode = () => action(SHOW_PADI_QR)
// export const resetStore = () => action(RESET_STORE)