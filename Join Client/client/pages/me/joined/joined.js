// pages/joined/joined.js
import { getJoinedCompetitionList, getJoinedShowList } from '../../../utils/api/Joined.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [{
      name: '已参与活动',
      type: 'joinedActivity'
    }, {
      name: '已获取门票',
      type: 'joinedTicket'
    }],
    currentTab: 0,
    joinedCompetitions: [],
    joinedShows: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      let current = options.currentTab
      this.setData({
        currentTab: current
      })
    }
    getJoinedCompetitionList((joinedCompetitions) => {
      if (joinedCompetitions) {
        this.setData({
          joinedCompetitions: joinedCompetitions
        })
      } else {
        this.setData({
          showCompetitionsNull: true
        })
      }
    })
    getJoinedShowList((joinedShows) => {
      if (joinedShows) {
        this.setData({
          joinedShows: joinedShows
        })
      } else {
        this.setData({
          showShowsNull: true
        })
      }
    })
  },
  onShow: function () {
    // var current = options.currentTab
    // this.setData({
    //   currentTab: current
    // })
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
    console.log(show)
    show = JSON.stringify(show);
    wx.navigateTo({
      url: '/pages/ticket/ticketMessage/ticketMessage?show=' + show,
    })
  },
})