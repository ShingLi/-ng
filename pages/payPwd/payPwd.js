// pages/payPwd/payPwd.js
const app = getApp()
const url = app.baseUrl
const Toast = require('../../lib/dist/toast/toast')
import util from '../../utils/index.js'
var timer 
Page({

    data:{
        flag1:true,
        flag2:true,
        open_eye:'../../images/paypwd/open.png',
        close_eye:'../../images/paypwd/close.png'
    },
    onLoad(){
        // this._initGetPayPwd()
    },
    onHide(){
        clearTimeout(timer)
    },
    _initRequest(pay_pwd, re_pay_pwd) {
        util.request({
            url: `${url}/api/user/setting_pay_pwd`,
            method:'POST',
            data: {
                session3rd: wx.getStorageSync('session3rd'),
                pay_pwd,
                re_pay_pwd
            }
        }).then(res => {
            let code = res.code
            if(code==201){
                wx.showToast({
                    title: '设置成功',
                    duration:1500
                })
                timer = setTimeout(()=>{
                    wx.navigateBack({
                        delta: 2
                    })
                },1200)
            }
            
        })
    },
    formSubmit(e){
        console.log(e)
        var self = this 
        let { pwd ,checkPwd } = e.detail.value
        if(pwd.length==6||checkPwd.length==6){
            let regNum = /^\d{6}$/ ;
            if(!regNum.test(pwd)){
                Toast({
                    message: '密码不能为空且为数字',
                    type: 'fail',
                    timeout: 1500,
                    selector: '#toast'
                })
                return 
            }
            if(!regNum.test(checkPwd)){
                Toast({
                    message: '密码不能为空或少于6位',
                    type: 'fail',
                    timeout: 1500,
                    selector: '#toast'
                })
                return 
            } 
            if(pwd==checkPwd){
                self._initRequest(pwd,checkPwd)
            }else{
                Toast({
                    message: '二次密码不一致',
                    type: 'fail',
                    timeout: 1500,
                    selector: '#toast'
                })
            } 
        }else{
            Toast({
                message:'密码不能为空或少于6位',
                type:'fail',
                timeout:1500,
                selector: '#toast'
            })
        }
    },
    //处理眼睛
    handle(){
        this.setData({
            flag1:!this.data.flag1
        })
    },
    handle2() {
        this.setData({
            flag2: !this.data.flag2
        })
    },
    currentVal(e){
        let val = e.detail.value
        // console.log(val)
        this.setData({
            val
        })
    },
    z(e) {
        let val2 = e.detail.value
        // console.log(val)
        this.setData({
            val2
        })
    }
})