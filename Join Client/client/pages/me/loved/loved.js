// pages/me/loved/loved.js
import { getLovedCompetitionList, getLovedShowList } from '../../../utils/api/love.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [{
      name: '已收藏活动',
      type: 'lovedActivity'
    }, {
      name: '已收藏门票',
      type: 'lovedTicket'
    }],
    currentTab: 0,
    lovedCompetitions: [],
    lovedShows: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    getLovedCompetitionList((lovedCompetitions) => {
      if (lovedCompetitions) {
        this.setData({
          lovedCompetitions: lovedCompetitions
        })
      } else {
        this.setData({
          showCompetitionsNull: true
        })
      }
    })
    getLovedShowList((lovedShows) => {
      console.log(lovedShows)
      if (lovedShows) {
        this.setData({
          lovedShows: lovedShows
        })
      } else {
        this.setData({
          showShowsNull: true
        })
      }
    })
  },
  goActivity(e) {
    let competition = e.currentTarget.dataset.competition
    // 转化为json
    competition = JSON.stringify(competition);
    wx.navigateTo({
      url: '../../activity/activity?competition=' + competition,
    })
  },
  goMessage(e) {
    let show = e.currentTarget.dataset.show
    // 转化为json
    show = JSON.stringify(show);
    wx.navigateTo({
      url: '/pages/ticket/ticketMessage/ticketMessage?show=' + show,
    })
  },
})