// pages/modifyTel/modifyTel.js
const app = getApp()
const url = app.baseUrl
const Toast = require('../../lib/dist/toast/toast')
var time = 60
const regTel = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
import util from '../../utils/index.js'
Page({
    data:{
        codeStatus:'获取验证码',
        telVal:'',
        get_code_status:true,//是否能够点击获得验证码
    },
    input_val(e){
        // 输入框获得手机号
        let currentVal = e.detail.value
        this.setData({
            telVal: currentVal
        })
    },
    getCode(){
        if(!this.data.get_code_status){
            wx.showToast({
                title: '正在获取',
                icon: 'loading',
                duration: 1000
            })
        }else{
            let code = true
           this._regTel(code)
        }
    },
    _regTel(val){
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
                if(val){
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
    _getCode(){
        var self = this
        const session3rd = wx.getStorageSync('session3rd')
        let mobile = this.data.telVal
        util.request({
            url: `${url}/api/user/bind_mobile_code`,
            data:{
                session3rd,
                mobile
            }
        }).then(res=>{
            let { code } =res 
            switch (code){
                case 201:
                    Toast({
                        title:'验证码发送成功',
                        type:'success',
                        timeout: 1500,
                        selector: '#zan-toast-test'
                    })
                    self._timer()//倒计时
                break;
                case 122:
                    Toast({
                        title: '验证码发送失败',
                        type: 'fail',
                        timeout: 1500,
                        selector: '#zan-toast-test'
                    })
                break;
            }
        })
    },
    _timer(){
        var self = this
        var timer  = setInterval(()=>{
            time = time-1
            console.log(time)
            if(time!=0){
                
                self.setData({
                    codeStatus:`${time-1} S`,
                    get_code_status: false
                })
            }else {
                clearInterval(timer)
                time = 60
                self.setData({
                    codeStatus: '获取验证码',
                    get_code_status: true
                })
            }
        },1000)
    },
    formSubmit(e) {
       
        let { tel,code} = e.detail.value
        if(tel.length==''||code.length==''){
            Toast({
                title: '选项不能为空',
                type: 'success',
                timeout: 1500,
                selector: '#zan-toast-test1'
            })
            return 
        }
        let iscode = false
        this._regTel(iscode)

    },
})