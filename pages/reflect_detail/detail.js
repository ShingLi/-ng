// pages/recharge_detail/detail.js
const app = getApp()
const url = app.baseUrl;
const Dialog = require('../../lib/dist/dialog/dialog')

import util from '../../utils/index.js'

Page({
    data: {
        disabled: true,
        allinputF1: false,
        inputArr: [],
        inputStr: '',
        focusF: [],
        allinput: '',
    },
    onLoad: function (options) {
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
    },
    inputChange(e) {
        // console.log(e)
        if (e.detail.value.length > 0) {
            this.setData({
                disabled: false
            })
        } else {
            this.setData({
                disabled: true
            })
        }
    },
    formSubmit(e) {
        console.log(e)
        let money = e.detail.value.number;
        let wx_form_id = e.detail.formId
        console.log(money)
        if (money.length == 0) {
            wx.showToast({
                title: '请填写金额'
            })
            return
        } else if (Number(money) <= 0) {
            this.handleClick()
        } else {
            this.setData({
                money,
                wx_form_id,
                allinputF1: true
            })
        }
    },
    handleClick() {
        Dialog({
            title: '输入金额错误',
            selector: '#zan-dialog'
        }).then((res) => {
            console.log(res);
        })
    },
    //  验证支付密码是否正确
    _user_pay_pwd_check() {
        let pay_pwd = this.data.allinput
        util.request({
            url: `${url}/api/balance/user_pay_pwd_check`,
            data: {
                session3rd: wx.getStorageSync('session3rd'),
                pay_pwd
            }
        }).then(res => {
            let code = parseInt(res.code)
            switch (code) {
                case 121:
                    wx.showToast({
                        title: '密码错误！',
                        icon: 'loading',
                        duration: 1200
                    })
                    break;
                case 201:
                    wx.showToast({
                        title: '密码正确',
                        icon: 'success',
                        duration: 1200
                    })
                    // 调用充值的接口
                    this.withdraw_cash()
                    break;
            }
        })
    },
    withdraw_cash() {
        // 充值成功的页面
        var self = this
        let withdraw_cash_amount = this.data.money
        let wx_form_id = this.data.wx_form_id
        util.request({
            url: `${url}/api/balance/withdraw_cash`,
            methed:'POST',
            data: {
                session3rd: wx.getStorageSync('session3rd'),
                withdraw_cash_amount,
                wx_form_id
            }
        }).then(res => {
            console.log(res)
            // 获取成功后调用微信支付
            let result = res.result
            if (res.code == 201) {
                // let { appId , noncsStr ,package ,sign,signType ,timeStamp } = result 
                let appId = result.appId,
                    noncsStr = result.nonceStr,
                    _package = result.package,
                    sign = result.sign,
                    signType = result.signType,
                    timeStamp = result.timeStamp

                wx.requestPayment({
                    'timeStamp': timeStamp,
                    'nonceStr': noncsStr,
                    'package': _package,
                    'signType': signType,
                    'paySign': sign,
                    'success': function (res) {
                        if (res.errMsg == 'requestPayment:ok') {
                            wx.showToast({
                                title: '充值成功',
                                duration: 1200
                            }),
                                setTimeout(() => {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }, 1100)
                        }
                    },
                    'fail': function (err) {
                        console.log(err)
                        if (err.errMsg == 'requestPayment:fail cancel') {
                            wx.showToast({
                                title: '提现取消',
                                icon:'loading'
                            })
                            self.setData({
                                allinputF1: false,
                                inputArr: [],
                                inputStr: '',
                                focusF: [],
                                allinput: ''
                            })
                        }
                    }
                })

            } else if (res.code == 121){
                var that = this
                setTimeout(()=>{
                    wx.showModal({
                        title: '提现失败',
                        content: '提现金额不能小于100',
                        complete:function(){
                            that.hideBox()
                        }
                    },2000)
                })
            }
        })
    },
    // 6位输入密码框
    passInput(e) {
        var that = this;
        var value = e.detail.value;
        var num = e.detail.cursor - 1;
        this.triggerEvent("passInput")
        var inputArr = [];
        for (let i = 0; i <= num; i++) {
            inputArr.push(value.substring(i, i + 1))
        }
        if (inputArr.length >= 6) {
            that.setData({
                inputSrr: value,
                inputArr: inputArr,
                allinput: value,
            })
            console.log('密码输入完成 ' + inputArr)
            // 调用验证的接口
            this._user_pay_pwd_check()
        } else {
            that.setData({
                inputSrr: value,
                inputArr: inputArr,
                allinput: ''
            })
        }
    },
    allInputBtn(e) {
        var that = this;
        var index = e.target.dataset.index;
        var focusF = http.forC(that.data.focusF);
        var inputArr = that.data.inputArr;
        var value = e.detail.value
        if (inputArr[index]) {
            inputArr[index] = '';
            focusF[index] = '1';
        } else {
            inputArr[index] = value;
            focusF[index + 1] = '1';
        }
        that.setData({ focusF: focusF, inputArr: inputArr })
    },
    // 点击关闭密码框
    hideBox() {
        this.setData({ 
            allinputF1: false,
            inputArr: [],
            inputStr: '',
            focusF: [],
            allinput: '',

        })
    },
    show() {
        this.setData({ allinputF1: true })
    },
    focusInput() {
        console.log(this.data.inputStr)
        this.setData({ allinputF1: true })
    }
})