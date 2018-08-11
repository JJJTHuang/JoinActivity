// pages/list/list.js
import { getTypeList, getCompetitionList, droploadtypeList, searchCompetitionList } from '../../utils/api/competition.js'
let offset = 0
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [{
      name: '竞赛',
      type: 'science'
    }, {
      name: '艺术',
      type: 'art'
    }, {
      name: '体育',
      type: 'physical'
    }],
    currentTabShow: true,
    currentTab: 0,
    science: [],
    art: [],
    physical: [],
    nomore0: false,
    nomore1: false,
    nomore2: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    let current = app.globalData.currentTab
    this.setData({
      currentTab: current
    })
    this.getList()
  },
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中',
    })
    let type = this.data.currentTab
    offset++
    droploadtypeList(offset, type, (nomore, competitions) => {
      console.log(nomore)
      if (type === 0) {
        if (nomore) {
          this.setData({
            nomore0: nomore
          })
        } else {
          this.setData({
            science: competitions
          })
        }
      } else if (type === 1) {
        if (nomore) {
          this.setData({
            nomore1: nomore
          })
        } else {
          this.setData({
            art: competitions
          })
        }
      } else {
        if (nomore) {
          this.setData({
            nomore2: nomore
          })
        } else {
          this.setData({
            physical: competitions
          })
        }
      }

      wx.hideLoading();
    })
  },

  getList() {
    getTypeList(0, (science) => {
      this.setData({
        science: science
      })
    })
    getTypeList(1, (art) => {
      console.log(art)
      this.setData({
        art: art
      })
    })
    getTypeList(2, (physical) => {
      this.setData({
        physical: physical
      })
    })
  },
  switchNav(e) {
    console.log(e.detail + "本函数在list")
    let current = e.detail
    this.setData({
      currentTab: current
    })
    // getTypeList(current, this.setCompetition)
    offset = 0
  },
  goActivity(e) {
    // 把当前current保存下来
    app.globalData.currentTab = this.data.currentTab
    let competition = e.currentTarget.dataset.competition
    // 转化为json
    competition = JSON.stringify(competition);
    wx.navigateTo({
      url: '../activity/activity?competition=' + competition,
    })
  },
  searchActivity(e) {
    if (e.detail) {
      this.setData({
        currentTabShow: false,
      })
      searchCompetitionList(e.detail, (arr) => {
        if (arr) {
          if (arr.length != 0) {
            this.setData({ competitions: arr,showNull: false });
          } else {
            this.setData({ competitions: arr,showNull: true });
          }
        } else{
          this.setData({ competitions: arr,showNull: true });
        }
      })
    } else {
      this.setData({
        currentTabShow: true,
      })
    }
  }
})