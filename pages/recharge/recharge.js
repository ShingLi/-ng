// pages/recharge_detail/detail.js
const app = getApp()
const url = app.baseUrl;
const Dialog = require('../../lib/dist/dialog/dialog')

import util from '../../utils/index.js'

Page({
    data: {
       
    },
    onLoad: function (options) {
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
        this._initGetuser_balance()
    },
    _initGetuser_balance(){
        var self = this 
        util.request({
            url: `${url}/api/balance/user_balance`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            console.log(res)
            let user_balance = res.result.user_balance;
            self.setData({
                user_balance
            })
        })
    }
})