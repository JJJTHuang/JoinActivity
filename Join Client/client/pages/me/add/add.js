// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:'',
    passData: {},
    passDataimg: [],
    pshowTime: '',
    pshowTime_time: '',
    psaletime: '',
    psaletime_time: '',
    pstartdate: '',
    pdeadline: '',
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data)
    let data
    this.setData({
      choose: options.type
    })
    if(this.data.choose === 'activity'){
      
      let data = JSON.parse(options.activity)
      let pstartdate = data.startDate
      let pdeadline = data.deadline
      let type = data.type

      this.setData({
        passData: JSON.parse(options.activity),
        passDataimg: JSON.parse(options.passDataimg),
        pstartdate: pstartdate,
        pdeadline: pdeadline,
        type: type
      })
      console.log(this.data)
    }else{
      data = JSON.parse(options.show)
      let pshowTime = data.showTime.split(' ')[0],
          pshowTime_time = data.showTime.split(' ')[1],
          psaletime = data.saletime.split(' ')[0],
          psaletime_time = data.saletime.split(' ')[1]

      this.setData({
        passData: JSON.parse(options.show),
        passDataimg: JSON.parse(options.passDataimg),
        pshowTime: pshowTime,
        pshowTime_time: pshowTime_time,
        psaletime: psaletime,
        psaletime_time: psaletime_time
      })

      console.log(this.data)
    }
  },
  chooseType(e){
    let type = e.target.dataset.type
    this.setData({
      choose : type
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})