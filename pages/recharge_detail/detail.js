// pages/recharge_detail/detail.js
const app = getApp()
Page({
    data:{

    },
    onLoad: function (options) {
        this.setData({
            userInfo:app.globalData.userInfo
        })
    },
    formSubmit(e){
        console.log(e)
        let  money =e.detail.value.number;
        
        if(money.length==0){
            wx.showToast({
                title: '请填写金额'
            })
            return false
        }else if(Number(money)<=0){
            wx.showToast({
                title: '金额请大于0'
            })
        }
    }
})