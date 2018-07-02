// pages/integral/integral.js
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
        this._initGetIntegral()
    },
    _initGetIntegral(){
        var self = this
        util.request({
            url: `${url}/api/integral/user_integral`,
            data: {
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            console.log(res)
            let integral = res.result
            self.setData({
                integral
            })
        })
    },
    // 兑换
    exchange(e){
        var self =this
        let eid = e.currentTarget.dataset.id //当前item 的id
        util.request({
            url: `${url}/api/integral/user_exchange`,
            data: {
                session3rd: wx.getStorageSync('session3rd'),
                eid
            }
        }).then(res=>{
            console.log(res)
            let { code } = res
            code = parseInt(code)
            switch (code){
                case 201:
                    wx.showToast({
                        title: '兑换成功',
                        duration: 1200
                    })
                break;
                case 121:
                    wx.showToast({
                        title: '无效的优惠券',
                        icon:'loading',
                        duration: 1200
                    }) 
                break;
                case 123:
                    wx.showToast({
                        title: '积分不足',
                        icon: 'loading',
                        duration: 1200
                    }) 
                break;
                case 124:
                    wx.showToast({
                        title: '兑换失败',
                        icon: 'loading',
                        duration: 1200
                    }) 
                break;

            }
            
        })
    }
})