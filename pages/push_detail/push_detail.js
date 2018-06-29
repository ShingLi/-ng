// pages/push_detail/push_detail.js
const app = getApp()
Page({
    data: {
  
    },
    onLoad(){
        app.getUserInfo(this)
    }
})