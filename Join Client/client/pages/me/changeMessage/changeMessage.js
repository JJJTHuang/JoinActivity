// pages/me/changeMessage/changeMessage.js
import { updateUser, getUserInfo} from '../../../utils/api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  getUserInfo() {
    let user = wx.getStorageSync('user')
    console.log(user)
    this.setData({
      student: user
    })
  },
  submit(e) {
    let student = e.detail
    updateUser(student)
    setTimeout(() => {
      getUserInfo()
      wx.navigateBack({
        delta: 1,
      })
    }, 1000)
  }
})