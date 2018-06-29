//index.js
//获取应用实例
import util from '../../utils/index';
const app = getApp()
const url  = app.baseUrl
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad(){
        app._getUserInfo().then(res=>{
            if(res){
                // 这里等待getUserInfo的返回值
                // console.log(res)

                this._indexInfo(res)
                this.setData({
                    hasUserInfo:false
                })
            }
        }).catch(err=>{
            if(err.authSetting){
                this.setData({
                    hasUserInfo: true
                })
            }
        })
        
    },
    // 首页信息
    _indexInfo(result){
        let session3rd = wx.getStorageSync('session3rd')
        var self = this
        if (session3rd){
            util.request({
                url: `${url}/api/user/user_index`,
                data:{
                    session3rd: session3rd
                }
            }).then(res=>{
                // console.log(res)
                let { code } = res
                if(code ==150){
                    wx.showToast({
                       title: '重新登录中',
                       icon:'loading'
                    }) 
                    let code = app.globalData.code                    
                    let { encryptedData, iv, signature, rawData } = result
                    console.log('重新登录```')
                    this.Login(code, rawData, signature, encryptedData, iv)
                }else{
                    let userInfo = res.result
                    // console.log(userInfo)
                    self.setData({
                        userInfo
                    })

                    app.globalData.userInfo = userInfo
                }
            }).catch(err=>{
                console.log(err)
            })
        } 
    },
    // 重新登录
    Login(code, rawData, signature, encryptedData, iv){
        util.request({
            url: `${url}/api/user/wxlogin`,
            data: {
                code,
                rawData,
                signature,
                encryptedData,
                iv
            }
        }).then(res => {
            console.log(res)
            let { session3rd } = res.result
            console.log(session3rd)
            if (!wx.getStorageSync('session3rd')) {
                wx.setStorageSync('session3rd', session3rd)

                // 登陸成功后調用首頁信息的接口
                this._indexInfo()

            }else {
                // 如果有值就覆盖吊之前的
                
                wx.setStorageSync('session3rd', session3rd)
                this._indexInfo()
            }
        })
    },
    // 按钮授权
    getuserinfo(res){
        // 如果授权成功
        if (res.detail.errMsg =='getUserInfo:ok'){
            wx.showToast({
                title: '授权成功',
                icon:'success'
            })
            let { encryptedData, iv, signature, rawData } = res.detail
            
            let code = app.globalData.code;

            // 授权成功后调用登录的接口
            this.Login(code, rawData, signature, encryptedData, iv)

            this.setData({
                hasUserInfo:false
            })
            
        }
    },
    // 首页的事件处理函数
    href() {
        wx.navigateTo({
            url: '/pages/sign/sign'
        })
    },
    smile() {
        wx.navigateTo({
            url: '/pages/smile/smile'
        })
    },
    balance() {
        wx.navigateTo({
            url: '/pages/recharge/recharge'
        })
    },
    score() {
        wx.navigateTo({
            url: '/pages/integral/integral'
        })
    },
})
