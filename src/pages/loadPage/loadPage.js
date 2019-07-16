import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { loadPage, locationChange } from '../../actions'
import { getPadiQrStatus } from '../../reducers/selectors'
import padiQrcode from '../../assets/images/official_qrcode.jpg'

class LoadPage extends Component {

    config = {
        navigationBarTitleText: 'PADI电子潜水证书'
    }

    componentDidMount() {
        this.props.locationChange(this.$router)
        this.props.loadPage()
    }

    render () {
        const { padiQrStatus } = this.props
        return padiQrStatus ? <View className='qr-code'>
                <View>请关注 PADI 官方微信公众号：</View>
                <View>PADIDIVING（或扫描下方二维码）</View>
                <View>关注后重新进入小程序以完成授权</View>
                <Image
                    className='padi-qrcode'
                    src={padiQrcode}
                />
            </View>
            :
            <View className='loading'>
                页面加载中...
            </View>
    }
}

function mapStateToProps(state) {
    return {
        padiQrStatus: getPadiQrStatus(state)
    }
}

export default connect(mapStateToProps, { loadPage, locationChange })(LoadPage)
