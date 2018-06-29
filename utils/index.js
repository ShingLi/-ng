const DEFAULT_REQUEST_OPTIONS = {
    url:'',
    data:{},
    header:{
        'Content-Type':'application/json'
    },
    method:'GET',
    dataType:'json'
}

let util ={
    request(opt){
        let options = Object.assign({},DEFAULT_REQUEST_OPTIONS,opt)
        let { url , data , header , method , dataType } = options

        return new Promise((resolve,reject)=>{
            wx.request({
                url,
                data,
                header,
                method,
                dataType,
                success(res){
                    resolve(res.data)
                },
                fail(res){
                    reject(res.data)
                }
            })
        })
    }
}

export default util