// pages/home/home.js
import { getCompetitionList, droploadCompetitionList, getSwiperActivity, selectCompetitionList } from '../../utils/api/competition.js'
import { getSwiperUrlsList } from '../../utils/api/swiperUrls.js'
let offset = 0
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    competitions: [],
    swiperUrls: [],
    types: [{
      img: '../../images/icon/match.png',
      name: '竞赛'
    }, {
      img: '../../images/icon/art.png',
      name: '艺术'
    }, {
      img: '../../images/icon/physical.png',
      name: '体育'
    }],
    nomore: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading...'
    })
    wx.showShareMenu();
    this.getCompetitionList()
    this.getSwiperUrlsList()
    wx.hideLoading()
    // 获取所有表演
    offset = 0
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.onLoad()
    this.setData({
      nomore: false
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let nomore = this.data.nomore
    if (!nomore) {
      wx.showLoading({
        title: '玩命加载中',
      })
      offset++
      droploadCompetitionList(offset, (nomore, competitions) => {
        console.log(nomore)
        if (nomore) {
          this.setData({
            nomore: nomore
          })
        } else {
          this.setData({
            competitions: competitions
          })
        }
        wx.hideLoading();
      })
    }
  },
  // 分享当前页
  onShareAppMessage: (res) => {
    return {
      title: '课外活动',
      desc: '校园活动，一键报名！',
      path: '/pages/home/home',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  goList() {
    console.log(this.data.competitions)
    wx.navigateTo({
      url: '../list/list',
    })
  },
  selectNav2(e) {
    var current = e.currentTarget.id
    app.globalData.currentTab = current
    wx.navigateTo({
      url: '../list/list',
    })
  },
  goActivity(e) {
    let competition = e.currentTarget.dataset.competition
    // 转化为json
    competition = JSON.stringify(competition);
    wx.navigateTo({
      url: '../activity/activity?competition=' + competition,
    })
  },
  // 遍历competition
  competition(competitions, id) {
    let competition = {}
    for (let i in competitions) {
      if (competitions[i].id == id) {
        competition = competitions[i]
      }
    }
    return competition
  },
  getCompetitionList() {
    getCompetitionList((competitions) => {
      this.setData({
        competitions: competitions,
        nomore: false
      })
    })
  },
  getSwiperUrlsList() {
    let swiperUrls = wx.getStorageSync('swiperUrls')
    if (!swiperUrls) {
      getSwiperUrlsList((swiperUrls) => {
        this.setData({
          swiperUrls: swiperUrls
        })
      })
    } else {
      this.setData({
        swiperUrls: swiperUrls
      })
    }
  },
  swiperActivity(e) {
    let competitionId = e.currentTarget.dataset.competitionid
    console.log(e.currentTarget.dataset)
    getSwiperActivity(competitionId, (competition) => {
      competition = JSON.stringify(competition);
      wx.navigateTo({
        url: '../activity/activity?competition=' + competition,
      })
    })
  },
  
})