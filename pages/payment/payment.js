// pages/bill/bill.js
const app = getApp()
const url  =app.baseUrl;
const Dialog = require('../../lib/dist/dialog/dialog')

import util from '../../utils/index.js'

Page({
    data: {
        duration: 2000,
        $zanui: {
            toptips: {
                show: false
            }
        },
        items: [
            {
                padding: 2,
                value: '1',
                name: '优惠券名字',
            },
            {
                padding:2,
                value: '2',
                name: '优惠券',
            }
        ],
        checkedValue: '1',
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
            if(!this.data.result){
                this.customCallback()
            }
        })
    },
    pay(e){
        //确认支付的
        // console.log(e)
        // 订单的id
        let id  = e.currentTarget.dataset.id

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
            console.log('=== dialog with custom buttons ===', `type: ${type}`)

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
                pay_way
            }
        }).then(res=>{
            console.log(res)
        })
    }

})