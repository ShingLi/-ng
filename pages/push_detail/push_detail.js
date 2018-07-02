// pages/push_detail/push_detail.js
const app = getApp()
const url = app.baseUrl;
const Dialog = require('../../lib/dist/dialog/dialog')

import util from '../../utils/index.js'
Page({
    data: {

    },
    onLoad(){
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
        this._user_recharge_detail()
    },
    _user_recharge_detail(){
        var self = this
        util.request({
            url: `${url}/api/balance/user_recharge_detail`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            console.log(res)
            let { result } = res
            self.setData({
                result
            })
        })
    }
})