import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import 'taro-icons/scss/FontAwesome.scss'

import LoginPage from './pages/login'

import configStore from './store'
import rootSaga from './sagas';

import './app.scss'

if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
  require('nerv-devtools')
}

const store = configStore()
store.runSaga(rootSaga);

class App extends Component {

  config = {
    pages: [
      'pages/loadPage/loadPage',
      'pages/login/login',
      'pages/ecardsList/ecardsList',
      'pages/forgetPassword/forgetPassword',
      'pages/verifyEmail/verifyEmail',
      'pages/aliPayLoadPage/aliPayLoadPage'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'PADI',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <LoginPage />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
