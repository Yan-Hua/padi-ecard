Page({
  onGetAuthorize(res) {
    my.getStorage({
      key: 'userInfo',
      success: function(res) {
        if(res.data) {
          my.redirectTo({
            url: '/pages/loadPage/loadPage'
          })
        }else {
          my.getOpenUserInfo({
            success: (userinfo) => {
              const userInfoObj = JSON.parse(userinfo.response)
              const { msg } = userInfoObj.response
              if(msg === 'Success') {
                const { msg, ...info } = userInfoObj.response
                my.setStorage({
                  key: 'userInfo',
                  data: { ...info },
                  success: function() {
                    my.redirectTo({
                      url: '/pages/loadPage/loadPage'
                    })
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
        }
      },
      fail: function(res){
        my.alert({ content: res.errorMessage });
      }
    });
  },
});