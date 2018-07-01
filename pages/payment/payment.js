// pages/bill/bill.js
const app = getApp()
const url  =app.baseUrl;

import util from '../../utils/index.js'

Page({
    data: {
        duration: 2000,
        $zanui: {
            toptips: {
                show: false
            }
        }
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
            if(!this.data.order_info){
                this.customCallback()
            }
        })
    },
    pay(){
        // console.log(1)
        //确认支付的
       
    },
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
    }
})