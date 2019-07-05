import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { loadPage, locationChange, requestEcards } from '../../actions'

class LoadPage extends Component {

    config = {
        navigationBarTitleText: 'PADI电子潜水证书'
    }

    componentDidMount() {
        this.props.locationChange(this.$router)
        this.props.loadPage()
    }

    render () {
        return (
            <View>
                页面加载中...
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { loadPage, locationChange, requestEcards })(LoadPage)
