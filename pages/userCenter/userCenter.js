// pages/userCenter/userCenter.js
const app = getApp()
const url = app.baseUrl

import util from '../../utils/index.js'
// 判断是够
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
    },
    // 重置手机手机好
    resetMobile(){
        console.log("重置执行开始")
        wx.navigateTo({
            url: '/pages/resetMobile/resetMobile',
        })
    },
    // 绑定手机号
    bindMobile(){
        wx.navigateTo({
            url: '/pages/modifyTel/modifyTel',
        })
    },
    // 设置绑定
    setBind(){
        wx.navigateTo({
            url: '/pages/payMobieCode/payMobileCode',
        })
    }
})