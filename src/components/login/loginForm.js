import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import padi_qrcode from '../../assets/images/official_qrcode.jpg'
import { FontAwesome } from 'taro-icons'
import isEmail from 'validator/lib/isEmail'
import ShowDialog from '../common/showDialog'

import './login.scss'

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pending: false,
      password: '',
      errors: {},
      secret: true,
      iconClose: true,
    }
  }

  setStateAndShowAlert = (isNotEmail, isNotPassword, message, btnLabel) => {
    this.setState({
      pending: false,
      errors: { email: isNotEmail, password: isNotPassword }
    });
    ShowDialog('', message, false, btnLabel)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.verifyPassword();
  }

  verifyPassword = () => {
    this.setState({ pending: true });
    const email = this.state.email.toLowerCase().trim();
    const password = this.state.password.trim();
    if(!isEmail(email) || !password) {
      this.setStateAndShowAlert(true, true, '请输入正确的邮箱地址及密码', '关闭');
      return;
    }
    this.props.emailLogin({email, password});
    this.setState({ pending: false });
  }

  render () {
    return (
      <View className='login-form'>
        <AtForm>
          <AtInput
            className='form-items'
            name='email'
            type='text'
            placeholder='请输入邮箱'
            error={this.state.errors.email}
            onChange={email => this.setState({ email, errors: { email: false } })}
            value={this.state.email}
            editable={!this.state.pending}
          />
          <AtInput
            className='form-items'
            name='password'
            type={this.state.secret ? 'password' : 'text'}
            placeholder='请输入密码'
            error={this.state.errors.email}
            onChange={password => this.setState({ password, errors: { password: false } })}
            value={this.state.password}
            editable={!this.state.pending}
          >
            {/* <View onClick={() => this.setState({ secret: !this.state.secret, iconClose: !this.state.iconClose })}>
              <FontAwesome 
                family='solid' 
                name={this.state.iconClose ? 'eye-slash' : 'eye'} 
                size={16} 
                color='rgb(136, 136, 136)'
              />
            </View> */}
          </AtInput>
        </AtForm>
        <View className='forget-password'>
          <View className='text' onClick={() => Taro.navigateTo({ url: '/pages/verifyEmail/verifyEmail' })}>
            立即注册
          </View>
          <View className='text symbol'>
            |
          </View>
          <View className='text' onClick={() => Taro.navigateTo({ url: '/pages/forgetPassword/forgetPassword' })}>
            找回密码
          </View>
        </View>
        <AtButton 
          type='primary'
          className='btn-confirm'
          onClick={this.handleSubmit}
        >
          登 录
        </AtButton>
        <View className='layout-footer'>
          <View className='reminder'>
              <View>
                请输入您的 PADI SSO 账号（如您学习过 PADI eLearning，或登录过 PADI 专业人士网站，或注册过 PADI Scuba Earth，My PADI Club 等 PADI 相关服务平台，请直接输入您的邮箱和对应密码）
              </View>
          </View>
          { !(process.env.TARO_ENV === 'alipay') && <View className='qrcode'> 
            <View className='padi-intro'>
              PADI 全世界学习潜水的途径，蓝色星球的保护者大本营，和PADI一起择善而行，了解更多请关注 PADIDIVING。
            </View> 
            <Image
              className='padi-qrcode'
              src={padi_qrcode}
            />
          </View> }
        </View>
      </View>
    )
  }
}

export default LoginForm
