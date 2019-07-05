import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import PageLoading from './components/common/pageLoading'

class AppContainer extends Component {

  render () {
    return (
      <View>
        <PageLoading />
        {children}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, {  })(AppContainer)
