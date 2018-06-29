// pages/card/card.js
const app = getApp()
const url = app.baseUrl
import util from '../../utils/index.js'
Page({

    data: {
        currentIndex:0,//默认选中是哪一个
        unuse_coupon:[],//未使用
        used_coupon:[],//已使用
        swiperHeight:0,//动态设置swiper的高度
        tips:'',
        duration: 2500,
        $zanui: {
            toptips: {
                show: false
            }
        }
    },
    onLoad(){
        let userInfo = app.globalData.userInfo
        if(userInfo){
            this.setData({
                userInfo
            })
        } 
        this._initGetInfo()//
    },
    onReady(){
        // setTimeout(()=>{
        //     this._initSetHeight()
                      
        // },250)
    },
    _initGetInfo(){
        var self = this
        // 请求当前页面的数据
        util.request({
            url: `${url}/api/user/user_coupon`,
            data: {
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res => {
            console.log(res)

            let { unuse_coupon ,used_coupon } = res.result

            const UNUSE_TITLE  ='暂时没有未使用数据',
                USED_TITLE ='暂时没有已使用数据' ;

            self.setData({
                unuse_coupon,
                used_coupon
            })

            if (!unuse_coupon.length){
                self.customCallback(UNUSE_TITLE)
                return 
            }
            if (!used_coupon.length){
                self.customCallback(USED_TITLE)
                return 
            }
            
        })
    },
    customCallback(title){
        // 没有数据时候的显示
        this.setData({
            $zanui: {
                toptips: {
                    show: true
                }
            },
            tips:title
        });
        setTimeout(() => {
            this.setData({
                $zanui: {
                    toptips: {
                        show: false
                    }
                },
                tips: ""
            })
        }, this.data.duration);
    },
    // swiper容器左右切换
    switchTab(e){
        // 如果是用户滑动造成的改变才设置当前的索引
        if(e.detail.source==='touch'){
            this.setData({
                currentIndex:e.detail.current
            })
        }else if(e.type=='tap'){
            // 用户点击上面的tab切换
            let index = e.target.dataset.index
            this.setData({
                currentIndex:index
            })
        }
    },
    _initSetHeight(){
        // 动态给swiper设置高度
        // console.log(this.data.userItem.length)
        const CZ_Hg = 196
        // 先获取2个数组的长度进行比较
        let uesr_len = this.data.userItem.length,
            usered_len = this.data.useredItem.length;
        let max_ = this.max(uesr_len, usered_len),
            num = Math.round(max_ / 2);
            
        // console.log(num)
        let H = CZ_Hg * num 
        this.setData({
            swiperHeight:H
        })
    },
    // 比较2个数组的长度取最大的一个设置给swiper 高度
    max(first,second){
        return first > second ? first : second;
    }
   
})