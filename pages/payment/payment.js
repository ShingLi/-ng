// pages/bill/bill.js
const app = getApp()
const url  =app.baseUrl;
const Dialog = require('../../lib/dist/dialog/dialog')
var mark = true
import util from '../../utils/index.js'

Page({
    data: {
        duration: 2000,
        zhen:0,
        checkedValue: '',
        activeColor: '#ff4443'
    },
    onLoad: function (options) {
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
        this._initGetPayInfo()
    },
    onUnload(){
        console.log('页面注销')
        mark =true
    },
    _initGetPayInfo() {
        // 初始化账单信息
        var self = this
        util.request({
            url: `${url}/api/bill/pay_bill`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            const { result } = res
            self.setData({
                result
            })

            const LEN = Object.keys(this.data.result.order_info).length

            if(!Object.keys(this.data.result.order_info).length){
                // 没有数据是加载toast 给用户提示没有数据
                // this.customCallback()
            }else{
                self.setData({
                    LEN
                })
            }
        })
    },
    switchChange(e){
        // console.log('switch发生 change 事件，携带值为', e.detail.value)
        let items = [],
            coupon_list = this.data.result.coupon_list;

        if (e.detail.value){
            
            if(mark){
                mark = false
                coupon_list.forEach((item) => {
                    item.value = item.coupon_sn;
                    item.name = `${item.amount}元优惠券`
                })
                console.log(coupon_list)
                this.setData({
                    coupon_list
                })
                
            }
            this.setData({
                zhen: 1,
                checkedValue: this.data.coupon_list[0].value
            })
            wx.pageScrollTo({
                scrollTop: 500,
                duration: 300
            })
        }else{
            this.setData({
                zhen: 0
            })
        }
       
    },
    pay(e){
        //确认支付的
        // console.log(e)
        // 订单的id
        let id  = e.currentTarget.dataset.id
        console.log("订单的id是"+id)
        this.handleClick(id)
       
    },
    // 没有数据的方法
    customCallback() {
        this.setData({
            $zanui: {
                toptips: {
                    show: true
                }
            }
        });

        setTimeout(() => {
            this.setData({
                $zanui: {
                    toptips: {
                        show: false
                    }
                }
            })
        }, this.data.duration);
    },
    // modal 弹出层
    handleClick(order_id){
        Dialog({
            message: '请选择支付方式',
            selector: '#zan-dialog',
            buttons: [{
        
                text: '余额支付',
                color: 'red',
                type: 'cash'
            }, {
                text: '微信支付',
                color: '#3CC51F',
                type: 'wechat'
            }, {
                text: '取消',
                type: 'cancel'
            }]
        }).then(({ type }) => {
            // type 可以用于判断具体是哪一个按钮被点击
            console.log( `type: ${type}`)

            this._switch(order_id,{ type })
        });
    },
    // 判断是余额支付还是微信支付
    _switch(order_id,{type}){

        let pay_way =`${type}`

        var self = this

        switch (pay_way){
            case 'cash':
                // 余额支付
                self._paying_bill(order_id, 1)
            break;
            case 'wechat':
                // 微信支付
                self._paying_bill(order_id, 2)
            break;
            default:
                // 取消了支付
                wx.showToast({
                    title: '本次支付被取消!',
                    icon:'loading',
                    duration:1200
                })
        }
    },
    handleSelectChange({ detail }) {
        console.log(detail);
        this.setData({
            checkedValue:detail.value
        })
    },
    // 支付付款账单
    _paying_bill(order_id, pay_way){
        var self = this
        util.request({
            url: `${url}/api/bill/paying_bill`,
            method:'POST',
            data:{
                session3rd: wx.getStorageSync('session3rd'),
                order_id,
                pay_way,
                use_coupon:this.data.zhen,
                coupon_sn: this.data.checkedValue
            }
        }).then(res=>{
            console.log(res)

            if(parseInt(pay_way)==1){

            }else{
                // 微信支付
                console.log('微信支付')
                const { appId, nonceStr , sign ,signType ,timeStamp } = res.result
                const _package = res.result.package;
                
                wx.requestPayment({
                    'timeStamp': timeStamp,
                    'nonceStr': nonceStr,
                    'package': _package,
                    'signType': signType,
                    'paySign': sign,
                    'success': function (res) {
                        if (err.errMsg == 'requestPayment:ok') {
                            wx.showToast({
                                title: '支付成功',
                                
                            })
                        }
                    },
                    'fail': function (err) {
                        console.log(err)
                        if (err.errMsg =='requestPayment:fail cancel'){
                            wx.showToast({
                                title: '支付取消',
                                icon:'loading'
                            })
                        }
                    }   
                })
            }
        })
    }

})