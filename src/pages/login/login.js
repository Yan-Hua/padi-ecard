import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { emailLogin, locationChange } from '../../actions'
import LoginForm from '../../components/login/loginForm'
import { getProfile } from '../../reducers/selectors'

import padi_logo from '../../assets/images/PADI-logo.png'
import avatar from '../../assets/images/avatar.jpg'

import './login.scss'

class LoginPage extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.locationChange(this.$router)
  }

  render () {
    const { emailLogin, profiles } = this.props
    return (
      <View className='login-page'>
        <View className='top'>
          <Image
            className='padi-logo'
            src={padi_logo}
          />
          <AtAvatar circle image={profiles && profiles.wechat ? profiles.wechat.headimgurl : avatar} className='avatar'></AtAvatar>
        </View>
        <LoginForm emailLogin={emailLogin} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    profiles: getProfile(state)
  }
}

export default connect(mapStateToProps, { emailLogin, locationChange })(LoginPage)