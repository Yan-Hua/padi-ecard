import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { locationChange } from '../../actions'

class ForgetPasswordPage extends Component {

    config = {
        navigationBarTitleText: '忘记密码'
    }

    componentDidMount() {
        this.props.locationChange(this.$router)
    }

    render () {
        return (
            <View>
                忘记密码
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { locationChange })(ForgetPasswordPage)
