// pages/smile/smile.js
const app = getApp()
const url = app.baseUrl;
const Dialog = require('../../lib/dist/dialog/dialog')

import util from '../../utils/index.js'
Page({

    data: {
        showCode:0,
        smile:[0,1,2,3,4,5,6,7,8,9],
        nomore:false,
        btn_color:['canchange','changeing','changeed'],//按钮的颜色
        smile_icon: ['smile_y',"smile_x",'smile_g'],//笑脸的颜色数组
    },
    onLoad: function (options) {
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
        this._user_face_card()
    },
    _user_face_card(){
        var self = this
        util.request({
            url: `${url}/api/user/user_face_card`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            console.log(res)
            let unuse_list = res.result.unuse_list,
                use_list   = res.result.use_list;
            if (!unuse_list.length && !use_list.length){
                self.setData({
                    nomore:true
                })
            }
            self.setData({
                unuse_list,
                use_list
            })
            
        })
    },
    changeing(){
        wx.showModal({
            title:'兑换失败',
            content:'抱歉笑脸卡不足不能兑换'
        })
    },
    canchange(){
        var self = this 
        util.request({
            url: `${url}/api/user/user_face_card_exchange`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            console.log(res)
            let { code } = res
            switch(code){
                case 121:
                    wx.showToast({
                        title: '笑脸卡不足',
                        icon:'loading'
                    })
                    
                break;
                case 201:
                    wx.showToast({
                        title: '兑换成功',
                        duration:1500
                    })
                    this._user_face_card()
                    
                break;
            }
        })
    }
})