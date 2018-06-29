// pages/message/message.js
const app = getApp()
const url = app.baseUrl

import util from '../../utils/index.js'
Page({

    data: {
        
    },
    onLoad: function (options) {
        let userInfo = app.globalData.userInfo
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
        this._initGetInfo()
    },
    _initGetInfo(){
        var self = this 
        util.request({
            url: `${url}/api/user/user_message`,
            data:{
                session3rd: wx.getStorageSync('session3rd')
            }
        }).then(res=>{
            // console.log(res)
            let result = res.result
            self.setData({
                result
            })
        })
    },
    showDetail(e){
        // console.log(e)
        let [index, id, notread] = [e.currentTarget.dataset.index, e.currentTarget.dataset.id, this.data.result.unread_message ]

        notread[index].show = !notread[index].show 

        if(notread[index].show){
            // 
            this.packUp(notread, index);
        }
        let up = "result.unread_message"
        this.setData({
            [up]:notread
        })
        // 将当前消息的id传到后台
        this.readedMsg(id)
    },
    packUp(data,index){
        
        // 点击当前项关闭其他的选项
        for (let i = 0, len = data.length; i < len; i++) {
            if(index!=i){ 
                data[i].show = false    
            } 
        }     
    },
    readMsg(e){
        let [index, read] = [e.currentTarget.dataset.index, this.data.result.ready_message];

        read[index].show = !read[index].show
        if (read[index].show) {
            this.packUp(read, index);
        }

        let up = "result.ready_message" //赋值给data对象里面的某一个数组
        this.setData({
            [up]: read
        })
    },
    readedMsg(id){
        console.log('当前未读消息id是'+id)
        var self = this
        util.request({
            url: `${url}/api/user/user_read_message`,
            method:'POST',
            data:{
                session3rd: wx.getStorageSync('session3rd'),
                message_id:id
            }
        }).then(res=>{
            console.log(res)
            if(res.message=="ok"){
                
            }
        })
    }
})