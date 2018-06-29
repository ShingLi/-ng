// pages/smile/smile.js
const app = getApp()
Page({

    data: {
        showCode:1,
        smile:[0,1,2,3,4,5,6,7,8,9],
        btn_color:['canchange','changeing','changeed'],//按钮的颜色
        smile_icon: ['smile_y',"smile_x",'smile_g'],//笑脸的颜色数组
    },
    onLoad: function (options) {
        app.getUserInfo(this)
    },
    exchange(){
        // 兑换
        app.util.request({
            url:'',
            data:{
                data:{
                    m: 'zh_vip'
                }
            },
            success:res=>{
                
            }
        })
    }
})