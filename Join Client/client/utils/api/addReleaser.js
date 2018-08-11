// 参考 https://doc.minapp.com/js-sdk/schema/create-record.html#%E6%B7%BB%E5%8A%A0%E6%99%AE%E9%80%9A%E6%95%B0%E6%8D%AE
let query = new wx.BaaS.Query()
let tableID = 39554
let Product = new wx.BaaS.TableObject(tableID)
let product = Product.create()

function releaserIdentity (data) {
  let that = this
  product.set(data).save().then(res=>{
    console.log(res)
    wx.showToast({
      title: '提交成功。',
      duration: 1000,
      success () {
        wx.navigateBack({
          detal: 1
        })
      }
    })
  },err => {
    wx.showToast({
      title: '提交失败',
      icon: 'none',
      duration: 500
    })
  })
}

// ---------------------------------------
// ----------- 此函数未写好 ——--------------
// ---------------------------------------
function getReleaserInfo(user_id,fn,fn2) {
    // 此处created_by字段对应该用户的唯一id
  Product.setQuery(query.contains('user_id', user_id)).find().then(res => {
    // success
    let flag = (res.data.objects.length > 0)
    if(!flag){
      fn()
    }else{
      fn2()
    }
  }, err => {
    // err
    console.log(err,'查询失败。')
  })
}

module.exports = {
  releaserIdentity,
  getReleaserInfo
}