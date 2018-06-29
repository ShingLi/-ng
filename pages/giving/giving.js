// pages/giving/giving.js
const app = getApp()
const url = app.baseUrl

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
    onLoad(){
        let userInfo = app.globalData.userInfo
        if (userInfo){
            this.setData({
                userInfo
            })
        }
        this._initGetInfo()
    },
    _initGetInfo(){
        var self = this 
        util.request({
            url: `${url}/api/user/recharge_discount`,
            session3rd:wx.getStorageSync('session3rd')
        }).then(res=>{
            console.log(res)
            let  result  = res.result
            self.setData({
                result
            })
            // 没有数据时候显示
            if(!result.length){
                self.customCallback()
                return 
            }
        })
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