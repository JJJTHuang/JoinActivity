let query = new wx.BaaS.Query()
let tableID = 39182
let Product = new wx.BaaS.TableObject(tableID)

// 获取轮播图数据
function getSwiperUrlsList(fn) {
  // 不设置查询条件
  Product.find().then(res => {
    // success
    let swiperUrls = res.data.objects
    if (fn) {
      fn(swiperUrls)
    }
    wx.setStorageSync('swiperUrls', swiperUrls)
  }, err => {
    // err
  })
}


module.exports = {
  getSwiperUrlsList: getSwiperUrlsList,
}
