  
  
  
  
    // pages/bill/bill.js
const app = getApp()
Page({
    data: {
        consumeList: []
    },
    onLoad() {
        app.getUserInfo(this)
        this._initGetBillInfo()
    },
    _initGetBillInfo() {
        // 初始化账单信息
        app.util.request({
            url: 'entry/wxapp/MyOrder',
            data: {
                m: 'zh_vip',
                user_id: this.data.userInfo.id
            },
            success: res => {
                console.log(res.data)
                let [rechargeList, consumeList] = [res.data.chongzhi, res.data.xiaofei]
                this.setData({
                    consumeList: consumeList,
                    rechargeList: rechargeList
                })
            }
        })
    },
    pay(){
        // console.log(1)
        //确认支付的
        app.util.request({
            url:'entry/wxapp/',
            data: {
                m: 'zh_vip',
                user_id: this.data.userInfo.id
            },
            success:res=>{
                console.log(res)
            }
        })
    }
})