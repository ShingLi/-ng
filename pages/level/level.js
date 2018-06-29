// pages/level/level.js
const app = getApp()
import util from '../../utils/index.js'
const url = app.baseUrl
Page({

    data: {
        isShow:0,//积分值说明显示和隐藏的
        userInfo:{}
    },
    onLoad(){
        let userInfo = app.globalData.userInfo
        if (userInfo){
            this.setData({
                userInfo
            })
        }
        this._getInfo()
    },
    _getInfo(){
        var self = this 
        util.request({
            url: `${url}/api/user/user_level`,
            data:{
                session3rd:wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            self.setData({
                pageInfo: res.result
            })
        })
    },
    showModal(){
        this.setData({
            isShow:1
        })
    },
    closeModal(){
        this.setData({
            isShow: 0
        })
    },
    stop(){
        // 阻止冒泡的不能删除
    }
})