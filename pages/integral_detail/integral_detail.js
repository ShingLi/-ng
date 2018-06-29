// pages/integral_detail/integral_detail.js
const app = getApp()
Page({
    data:{
        integral_detail:[]
    },
    onLoad(){
        app.getUserInfo(this)
        // 
        app.util.request({
            url:'entry/wxapp/Jfmx',
            data:{
                m:"zh_vip",
                user_id:this.data.userInfo.id
            },
            success:res=>{
                this.setData({
                    integral_detail:res.data
                })
            }
        })
    }
})