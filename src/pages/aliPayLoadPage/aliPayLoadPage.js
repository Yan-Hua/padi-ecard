Page({
  onGetAuthorize(res) {
    my.getOpenUserInfo({
      success: (userinfo) => {
        const userInfoObj = JSON.parse(userinfo.response)
        const { msg } = userInfoObj.response
        if(msg === 'Success') {
          const { msg, ...info } = userInfoObj.response
          const { data } = my.getStorageSync({ key: 'token' })
          my.request({
            url: 'https://wechat-api-qa.padi.com.cn/api/alipay/updateAlipayUser',
            method: 'POST',
            data: {
              ...info,
              userId: data,
            },
            dataType: 'json',
            success: function(res) {
              my.redirectTo({
                url: '/pages/login/login'
              })
            },
            fail: function(res) {
              my.alert({
                title: '授权失败',
                content: '抱歉，请求授权失败，请重新授权。',
                buttonText: '我知道了'
              });
            }
          });
        }else {
          my.alert({
            title: '授权失败',
            content: '抱歉，请求授权失败，请重新授权。',
            buttonText: '我知道了'
          });
        }
      }
    });
  },
});