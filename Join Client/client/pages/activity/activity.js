// pages/activity/activity.js
import { changeLove } from '../../utils/api/user.js'
import { getJoined } from '../../utils/api/Joined.js'
let _competition = {}
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    competition: {},
    loved: false,
    joined:false,
    show: true,
    login: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(app.globalData.login){
    
    let competition = JSON.parse(options.competition)
    let joined = getJoined(competition.userIds)
    let login = app.globalData.login

    this.setData({
      competition: competition,
      loved: competition.loved,
      joined: joined,
      login: login
    })

    console.log(this.data)

    if(competition.show === false){
      this.setData({
        show: competition.show
      })
    }

    wx.showShareMenu()
    // }
  },
  onShareAppMessage: (res) => {
    // 转化为json   
    let competition = JSON.stringify(_competition);
    return {
      title: 'Join',
      desc: '校园活动，一键报名！',
      path: '/pages/activity/activity?competition=' + competition,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  changeLove() {
    if (app.globalData.login){
      let competition = this.data.competition
      let love = !this.data.loved
      this.setData({
        loved: love
      })
      let id = competition.id
      changeLove(love, 'competition', id)
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
    }
  },
  applyFrom() {
    let type = 'activity'
    let id = this.data.competition.id
    wx.navigateTo({
      url: '../applyForm/applyForm?type=' + type + '&id=' + id,
    })
  },
  goLogin () {
    wx.switchTab({
      url: '/pages/me/me'
    })
  }
})