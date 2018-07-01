// pages/sign/sign.js
var app = getApp();

var   date;//当前是多少号
var   desc;//签到描述的天数
var   mydate = new Date();
var   year = mydate.getFullYear();
var   month = mydate.getMonth() + 1;
var monthDaySize;
var nbsp;
import util from '../../utils/index.js'
const url = app.baseUrl
Page({

    data: {
        desc:''
    },
    onLoad(){
        
        this.setData({
            userInfo:app.globalData.userInfo
        })

        date = mydate.getDate();
        console.log("date" + date)
        var day = mydate.getDay();
        console.log(day)
        nbsp = 7 - ((date - day) % 7);
        //console.log("nbsp" + nbsp);
        
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            monthDaySize = 31;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            monthDaySize = 30;
        } else if (month == 2) {
            // 计算是否是闰年,如果是二月份则是29天
            if ((year - 2000) % 4 == 0) {
                monthDaySize = 29;
            } else {
                monthDaySize = 28;
            }
        };
        this._initGetInfo()
        
    },
    // 获得当前页的数据
    _initGetInfo(){

        var self = this
        util.request({
            url: `${url}/api/user/user_sign`,
            data: {
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res => {
            console.log(res)

            let toDayList = res.result.this_month_sign

            // 过滤数组 判断今天签到的状态
            let flag = toDayList.filter(item => {
                return item == date
            })
            let arr = new Array(monthDaySize)
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < toDayList.length; j++) {
                    if (i == toDayList[j]) {
                        arr[i - 1] = toDayList[j]

                    }
                }
            }
            console.log(arr)

            if (flag.length) {
                this.setData({
                    desc: '今日已签到'
                })
            } else {
                this.setData({
                    desc: '今日未签到'
                })
            }
            self.setData({
                year,
                month,
                date,
                nbsp,
                monthDaySize,
                result: res.result,
                arr
            })
        }) 
    },
    // 签到的函数
    calendarSign(){
        util.request({
            url: `${url}/api/user/user_signing`,
            data:{
                session3rd: wx.getStorageSync('session3rd') 
            }
        }).then(res=>{
            console.log(res)
            let code = res.code
            this.showToast(code)
        })
    },
    // 签到显示
    showToast(code){
        switch (code){
            case 201 :
                wx.showToast({
                    title: '签到成功',
                    icon: 'success'
                })
                // 重新拉去签到后的信息
                this._initGetInfo()

                this.setData({
                    desc:'今日已签到'
                })
                
            break ;
            case 121 :
                wx.showToast({
                    title: '今日已签到',
                    icon:'none'
                })
                this.setData({
                    desc: '今日已签到'
                })
            break;
            
        }
    }
})