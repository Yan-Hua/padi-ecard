import Taro from '@tarojs/taro'
import { AtToast } from "taro-ui"

const PageLoading = ({ pageLoading }) => {
  return <AtToast isOpened text="{text}" icon="{icon}"></AtToast>

}

export default PageLoading