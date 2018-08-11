// pages/applyForm/applyForm.js
import { updateUserInfo, getUserInfo } from '../../utils/api/user.js'
let id = null
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
    id = options.id
    this.setData({
      type: options.type
    })
    this.getUserInfo()
  },
  getUserInfo() {
    let user = wx.getStorageSync('user')
    if (!user){
      getUserInfo(()=>{
        console.log(user)
        this.setData({
          student: user
        })
      })
    }
    console.log(user)
    this.setData({
      student: user
    })
  },
  submit(e) {
    let type = this.data.type
    console.log(e.detail)
    updateUserInfo(e.detail, type, id)
    setTimeout(() => {
      getUserInfo()      
      wx.navigateBack({
        delta: 1,
      })
    }, 1000)
  }
})