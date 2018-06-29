// pages/bill/bill.js
const app = getApp()
const url = app.baseUrl

import util from '../../utils/index.js'
Page({
    data: {
        currentIndex: 0,//默认选中是哪一个
        consumeList:[],//消费的数组
        rechargeList:[],//充值的数组
        swiperHeight:0,//swiper默认的高度
    },
    onLoad(){
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
        this._initGetBillInfo()
    },
    onReady(){
        // this._initSetHeight()
    },
    switchTab(e) {
        // 如果是用户滑动造成的改变才设置当前的索引
        if (e.detail.source === 'touch') {
            this.setData({
                currentIndex: e.detail.current
            })
        } else if (e.type == 'tap') {
            // 用户点击上面的tab切换
            let index = e.target.dataset.index
            // console.log(index)
            this.setData({
                currentIndex: index
            })
        }
    },
    _initGetBillInfo(){
        // 初始化账单信息
        util.request({
            url: `${url}/api/bill/bill_list`,
            data:{
                session3rd: wx.getStorageSync('session3rd'),
                type:0,
                page:1
            }
        }).then(res=>{
            console.log(res)
        })
    },
    // 初始化设置高度
    _initSetHeight(){
        // console.log(1)
        // 获取消费数组和充值数组的长度
        let consumeListlen = this.data.consumeList.length,
            rechargeListLen = this.data.rechargeList ? this.data.rechargeList.length:0;
        const itemH = 496
        let titleNum = parseInt(consumeListlen) + parseInt(rechargeListLen),
            H        =  itemH * titleNum;
        console.log('充值和消费的总长度和高度是'+titleNum+'个和'+H+'rpx')

        this.setData({
            swiperHeight:H
        })   
    }
})