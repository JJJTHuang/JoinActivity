// pages/ticket/ticket.js
import { getShowList, getHotList, droploadShowList, searchShowsList } from '../../utils/api/show.js'
let offset = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],
    shows: [],
    show: true,
    searchShows: [],
    nomore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 显示分享按钮
    wx.showShareMenu();
    this.getShowList()
    offset = 0
  },
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    this.setData({
      nomore: false
    })
    this.onLoad()
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
      console.log(offset)
      droploadShowList(offset, (nomore, shows) => {
        console.log(nomore)
        if (nomore) {
          console.log('here')
          this.setData({
            nomore: nomore
          })
        } else {
          this.setData({
            shows: shows
          })
        }
        wx.hideLoading();
      })
    }
  },
  onShareAppMessage: (res) => {
    return {
      title: 'Join',
      desc: '校园活动，一键报名！',
      path: '/pages/ticket/ticket',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  getShowList() {
    getShowList((shows) => {
      this.setData({
        shows: shows,
        nomore: false
      })
      this.getHotList()
    })
  },
  getHotList() {
    getHotList((hots) => {
      this.setData({
        hots: hots
      })
    })
  },
  goMessage(e) {
    let show = e.currentTarget.dataset.show
    // 转化为json
    show = JSON.stringify(show)
    console.log(show)
    wx.navigateTo({
      url: './ticketMessage/ticketMessage?show=' + show,
    })
  },
  searchTicket(e) {
    if (e.detail) {
      this.setData({
        show: false,
      })
      searchShowsList(e.detail, (arr) => {
        if (arr) {
          if (arr.length != 0) {
            this.setData({ searchShows: arr, showNull: false });
          } else {
            this.setData({ searchShows: arr, showNull: true });
          }
        } else {
          this.setData({ searchShows: arr, showNull: true });
        }
      })
    } else {
      this.setData({
        show: true,
      })
    }
  }
})