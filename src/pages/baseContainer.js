import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { locationChange } from '../actions'

class BaseContainer extends Component {

    constructor(props){
        super(props);
        if(process.env.TARO_ENV === 'h5') {
            console.log('h5')
        }else {
            const { path, params } = this.$router
            if(this.$router.path) this.props.locationChange(this.$router)
        }
    }

}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { locationChange })(BaseContainer)