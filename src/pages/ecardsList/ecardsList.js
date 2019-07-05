import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { locationChange } from '../../actions'
import BaseContainer from '../baseContainer'

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
      <View className='ecards-list'>certs list</View>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { locationChange })(EcardsPage)
