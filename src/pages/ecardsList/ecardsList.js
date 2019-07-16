import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { locationChange } from '../../actions'
import { getUserHeaderInfo } from '../../reducers/selectors.js'
import UserHeader from '../../components/ecardsList/userHeader'

import './ecardsList.scss'

class EcardsPage extends Component {

  config = {
    navigationBarTitleText: '电子证书'
  }

  componentDidMount() {
    this.props.locationChange(this.$router)
  }

  render () {
    return (
      <View className='ecards-list'>certs list
      <UserHeader userInfo={this.props.userHeaderInfo}/>>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    userHeaderInfo: getUserHeaderInfo(state)
  }
}

export default connect(mapStateToProps, { locationChange })(EcardsPage)
