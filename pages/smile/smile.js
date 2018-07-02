// pages/smile/smile.js
const app = getApp()
const url = app.baseUrl;
const Dialog = require('../../lib/dist/dialog/dialog')

import util from '../../utils/index.js'
Page({

    data: {
        showCode:1,
        smile:[0,1,2,3,4,5,6,7,8,9],
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
        util.request({
            url: `${url}/api/user/user_face_card`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            console.log(res)
        })
    }
})