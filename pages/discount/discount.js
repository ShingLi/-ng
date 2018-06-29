// pages/discount/discount.js
const app = getApp()
import util from '../../utils/index.js'
const url = app.baseUrl
Page({

    data: {
    
    },
    onLoad(){
        let userInfo  = app.globalData.userInfo
        this.setData({
            userInfo
        })
        this._initGetInfo()
    },
    _initGetInfo(){
        var self = this 
        util.request({
            url: `${url}/api/user/user_level_discount`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            console.log(res)
            this.setData({
                result:res.result
            })
        })
    }
})