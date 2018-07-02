// pages/integral_detail/integral_detail.js
const app = getApp()
const url = app.baseUrl;


import util from '../../utils/index.js'
Page({
    data:{
        integral_detail:[]
    },
    onLoad(){
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
        this._user_integral_detail()
    },
    _user_integral_detail(){
        var self = this 
        util.request({
            url: `${url}/api/integral/user_integral_detail`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            console.log(res)
            let { result } =res 
            self.setData({
                result
            })
        })
    }
})