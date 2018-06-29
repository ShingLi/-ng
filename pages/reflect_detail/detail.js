// pages/recharge_detail/detail.js
const app = getApp()
Page({
    data: {

    },
    onLoad: function (options) {
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },
    // 提现
    reflectInfo(e){
       
        let [userName, tel, money] = [e.detail.value.userName, e.detail.value.tel, e.detail.value.money]
        console.log(userName,tel,money)

        let regTel = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            regNum = /^\d+$/;

        if(userName.length==''||tel.length==''||money.length==''){
            wx.showToast({
                title: '请填写内容',
            })
            return false
        }
        if(!regTel.test(tel)){
            wx.showToast({
                title: '手机号不正确',
            })
            return false
        }
        if(!regNum.test(money)){
            wx.showToast({
                title: '金额只能是数字',
            })
            return false
        }
    }
})