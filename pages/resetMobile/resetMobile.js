
const app = getApp()
const url = app.baseUrl
const Toast = require('../../lib/dist/toast/toast')
var time = 60
const regTel = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/ 


import util from '../../utils/index.js'
Page({
    data: {
        codeStatus: '获取验证码',
        telVal: '',
        get_code_status: true,//是否能够点击获得验证码
    },
    input_val(e) {
        // 输入框获得手机号
        let currentVal = e.detail.value
        this.setData({
            telVal: currentVal
        })
    },
    getCode() {
        if (!this.data.get_code_status) {
            wx.showToast({
                title: '正在获取',
                icon: 'loading',
                duration: 1000
            })
        } else {
            let code = true
            this._regTel(code)
        }
    },
    _regTel(val) {
        // 验证手机号
        let currentTel = this.data.telVal
        if (currentTel.length == 11) {

            if (!regTel.test(currentTel)) {
                Toast({
                    message: '手机号错误',
                    type: 'fail',
                    timeout: 1500,
                    selector: '#zan-toast-test'
                })
            } else {
                // 一切正常
                if (val) {
                    console.log(val)
                    this._getCode()
                }
            }
        } else {
            Toast({
                message: '号码不能为空',
                type: 'fail',
                timeout: 1500,
                selector: '#zan-toast-test'
            })
        }
    },
    _getCode() {
        var self = this
        const session3rd = wx.getStorageSync('session3rd')

        util.request({
            url: `${url}/api/user/change_oldmobile_code`,
            data: {
                session3rd
            }
        }).then(res => {
            let { code } = res
            switch (code) {
                case 201:
                    Toast({
                        message: '验证码发送成功',
                        type: 'success',
                        timeout: 1500,
                        selector: '#zan-toast-test'
                    })
                    self._timer()//倒计时
                    break;
                case 122:
                    Toast({
                        message: '验证码发送失败',
                        type: 'fail',
                        timeout: 1500,
                        selector: '#zan-toast-test'
                    })
                    break;
            }
        })
    },
    _timer() {
        var self = this
        var timer = setInterval(() => {
            time = time - 1
            // console.log(time)
            if (time != 0) {

                self.setData({
                    codeStatus: `${time - 1} S`,
                    get_code_status: false
                })
            } else {
                clearInterval(timer)
                time = 60
                self.setData({
                    codeStatus: '获取验证码',
                    get_code_status: true
                })
            }
        }, 1000)
    },
    // 验证验证码
    isCode(code) {
        var self = this
        const session3rd = wx.getStorageSync('session3rd')
        util.request({
            url: `${url}/api/user/verify_oldmobile_code`,
            method: 'POST',
            // header:{
            //     'Content-Type':'application/x-www-form-urlencoded'
            // },
            data: {
                code,
                session3rd
            }
        }).then(res => {
            let status = res.code
            switch (status) {
                case 123:
                    Toast({
                        message: '验证码过期',
                        type: 'fail',
                        timeout: 1500,
                        selector: '#toast'
                    })
                    break;
                case 122:
                    Toast({
                        message: '验证码错误',
                        type: 'fail',
                        timeout: 1500,
                        selector: '#toast'
                    })
                    break;
                case 201:
                    wx.showToast({
                        title: '验证成功',
                        duration: 1500
                    })
                    // 跳转到首页
                    // 当前是否已经绑定过了，这个后台传值，有is_mobile  是1
                    setTimeout(() => {
                        wx.navigateTo({
                            url: '/pages/modifyTel/modifyTel'
                        })
                    }, 1000)
                    break;
            }
        })
    },
    formSubmit(e) {

        let { tel, code } = e.detail.value
        if (tel.length == '' || code.length == '') {
            wx.showToast({
                title: '不能为空',
                icon: 'loading',
                duration: 1500
            })
            return
        }
        let iscode = false
        this._regTel(iscode)
        // 验证验证码是否正确
        this.isCode( code)
    },
})