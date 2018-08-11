// pages/ticket/ticketMessage/ticketMessage.js
import { changeLove } from '../../../utils/api/user.js'
import { getJoined } from '../../../utils/api/Joined.js'
let _show = {}
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:[],
    loved:false,
    joined:false,
    login: false,
    show_show: true //是否显示抢票功能
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let show = JSON.parse(options.show)
    let joined = getJoined(show.userIds)
    let login = app.globalData.login
    _show = show
    this.setData({
      show: show,
      loved:show.loved,
      joined: joined,
      login: login
    })

    if (show.show === false) {
      this.setData({
        show_show: show.show
      })
    }

    // 显示分享按钮
    wx.showShareMenu(); 
  },
  onShareAppMessage: (res) => {
    // 转化为json   
    let show = JSON.stringify(_show);
    console.log(show)
    return {
      title: 'Join',
      desc: '校园活动，一键报名！',
      path: '/pages/ticket/ticketMessage/ticketMessage?show=' + show,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  changeLove() {
    if(app.globalData.login){
      let show = this.data.show
      let love = !this.data.loved
      this.setData({
        loved: love
      })
      let id = show.id
      changeLove(love, 'show', id)
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
    }
  },
  ticketFrom(){
    let type = 'ticket'
    let id = this.data.show.id
    wx.navigateTo({
      url: '../../applyForm/applyForm?type=' + type + '&id=' + id,
    })
  },
  goLogin () {
    wx.switchTab({
      url: '/pages/me/me'
    })
  }
})