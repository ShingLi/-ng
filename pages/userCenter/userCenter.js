// pages/userCenter/userCenter.js
const app = getApp()
const url = app.baseUrl

import util from '../../utils/index.js'
Page({
    data:{

    },
    onLoad(){
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
        this._initGetUserInfo()
    },
    _initGetUserInfo(){
        var self = this 
        util.request({
            url: `${url}/api/user/user_center`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            console.log(res)
            let userCenterInfo = res.result
            self.setData({
                userCenterInfo
            })
        })
    }
})