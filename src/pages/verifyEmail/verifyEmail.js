import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { locationChange } from '../../actions'

class VerifyEmailPage extends Component {

    config = {
        navigationBarTitleText: '注册·验证邮箱'
    }

    componentDidMount() {
        this.props.locationChange(this.$router)
    }

    render () {
        return (
            <View>
                验证邮箱
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { locationChange })(VerifyEmailPage)
