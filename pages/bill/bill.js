// pages/bill/bill.js
const app = getApp()
const url = app.baseUrl
var page;
import util from '../../utils/index.js'
Page({
    data: {
        currentIndex: 0,//默认选中是哪一个
        allList:[],//全部的
        swiperHeight:0,//swiper默认的高度
        defaultPage:1,
        consumePage:1,//消费的分页
        reChargePage:1
    },
    onLoad(){
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
        if(true){
            const defaultArr =[0 ,1 ,'allList' ,true]
            // 传到方法里面
            this._initGetBillInfo(...defaultArr)
        }
    },
    onReady(){
        
    },
    switchTab(e) {
        // 如果是用户滑动造成的改变才设置当前的索引
        if (e.detail.source === 'touch') {
            let currentIndex = e.detail.current

            this.setData({
                currentIndex
            })
            this._switch(currentIndex)
            
        } else if (e.type == 'tap') {
            // 用户点击上面的tab切换
            let currentIndex = e.target.dataset.index
            // console.log(index)
            this.setData({
                currentIndex
            })
            this._switch(currentIndex)
        }
    },
    _switch(currentIndex){
        // 调用消费和充值的数据
        // 这里有一个坑 索引取得是字符串
        currentIndex = parseInt(currentIndex)
        switch (currentIndex) {
            case 1:
                console.log(111)
                if (!this.data.consume) {
                    
                    this._initGetConsume()
                }
                break;
            case 2:
                if (!this.data.reCharge) {
                    this._initGetReCharge()
                }
                break;
        }
    },
    _initGetConsume(){
        //获取消费的账单 
        const ConsumeArr = [1 ,this.data.consumePage ,'consume' ,false]

        this._initGetBillInfo(...ConsumeArr)
    },
    _initGetReCharge(){
        // 获取充值的账单
        const reChargeArr = [2, this.data.reChargePage, 'reCharge', false]

        this._initGetBillInfo(...reChargeArr)
    },

    _initGetBillInfo( type , page , name , isSet){
        // 获取账单信息抽成函数共用
        var self = this
        util.request({
            url: `${url}/api/bill/bill_list`,
            data:{
                session3rd: wx.getStorageSync('session3rd'),
                type,//获得默认全部账单信息
                page//分页信息
            }
        }).then(res=>{
            let { result } = res
            
            if(res.code==201){
                self.setData({
                    [name]:result
                })
                if(isSet){
                    self._initSetHeight()
                }
            }else{
                wx.showToast({
                    title: '获取失败',
                    icon:'loading'
                })
            }
        })
    },
    // 初始化设置高度
    _initSetHeight(){
        // console.log(1)
        // 获取消费数组和充值数组的长度
        const LEN = this.data.allList.length,
             itemH = 468 ;
        let titleNum = parseInt(LEN),
            H        =  itemH * titleNum;
        console.log('充值和消费的总长度和高度是'+titleNum+'个和'+H+'rpx')

        this.setData({
            swiperHeight:H
        })   
    }
})