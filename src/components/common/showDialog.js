import Taro from '@tarojs/taro'

const ShowDialog = (title, content, showCancel, confirmText, successMethod) => {
    return Taro.showModal({
        title,
        content,
        showCancel,
        confirmText,
        success: successMethod
        }) 
}

export default ShowDialog