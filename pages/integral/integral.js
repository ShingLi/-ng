// pages/integral/integral.js
const app = getApp();
Page({
    data:{
        integral_list:[]
    },
    onLoad(){
        app.getUserInfo(this)
    },
    onReady(){
        app.util.request({
            url:'entry/wxapp/Coupons',
            data:{
                m: 'zh_vip',
                user_id:this.data.userInfo.id
            },
            success:res=>{
                // console.log(res.data)
                this.setData({
                    integral_list:res.data.coupons_list
                })
            }
        })
    },
    // 兑换
    exchange(e){
        let item_id = e.currentTarget.dataset.id //当前item 的id
        app.util.request({
            url:'entry/wxapp/AddCoupons',
            data:{
                m: 'zh_vip',
                user_id: this.data.userInfo.id,
                coupons_id:item_id
            },
            success:res=>{
                let code = res.data.errok
                switch(code){
                    case 0:
                        wx.showToast({
                            title: '兑换成功',
                        })
                        break;
                    case 1:
                        wx.showToast({
                            title: '积分不足',
                            image:'../../images/close.png'
                        })
                        break;
                }
            }
        })
        
    }
})