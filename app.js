//app.js
App({
    onLaunch: function () {
        
        
    },
    _getUserInfo(){
        var self = this
        return new Promise((resolve,reject)=>{
            wx.getSetting({
                success: res => {
                    console.log("进入getseting")
                    console.log(res);
                    if (res.authSetting['scope.userInfo']) {
                        console.log("已经授权过直接调用getuserinfo")
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                            success: res => {
                                // console.log(res)
                                // 可以将 res 发送给后台解码出 unionId
                                resolve(res)
                            }
                        })
                    }else{
                        reject(res)
                    }
                }
            })
        })
    },
    globalData: {
        userInfo: null,
        encryptedData:'',
        iv:'',
        signature:'',
        rawData:''
    },
    baseUrl:'https://ranch.sindao.cn'
})