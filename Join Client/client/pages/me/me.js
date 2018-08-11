// pages/me/me.js
var app = getApp();
import { getUserInfo } from '../../utils/api/user.js'
import { getReleaserInfo } from '../../utils/api/addReleaser.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    couponsCount: 0,
    hasUserInfo: false,
    identify: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 微信用户登录小程序
    let _this = this
    wx.BaaS.login(false).then(res => {
      // 登录成功
    }, res => {
      // 登录失败
    })
    let hasUserInfo = app.globalData.login
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: hasUserInfo
    })
    if (hasUserInfo){
      getUserInfo()
    }

    // me页面初始化,判断是否提交过身份认真申请。
    wx.getStorage({
      key: 'user',
      success(res) {
        _this.setData({
          identify: res.data.publishing_right
        })
      }
    })
  },
  userInfoHandler(data) {
    let _this = this
    wx.BaaS.handleUserInfo(data).then(res => {
      _this.setData({
        userInfo:res,
        hasUserInfo:true
      })
      app.globalData.userInfo = res
      app.globalData.login = true
      getUserInfo()
      // res 包含用户完整信息，详见下方描述
    }, res => {
      
    })
  },
  changeMessage(){
    app.globalData.login ? wx.navigateTo({
      url: './changeMessage/changeMessage',
    }) : wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1000
    })
  },
  goJoined(e){
    let currentTab = e.currentTarget.id
    // console.log(e.currentTarget)
    wx.navigateTo({
      url: './joined/joined?currentTab=' + currentTab,
    })
  },
  goLove() {
    wx.navigateTo({
      url: './loved/loved'
    })
  },
  // 跳转发布活动/演出页
  publish() {
    let name
    wx.getStorage({
      key: 'user',
      success (res) {
        name = res.data.name
        console.log(!name)
        if (!name) {
          wx.showToast({
            title: '请先完善个人信息',
            icon: 'none',
            duration: 1000
          })
        }else if (app.globalData.login) {
          if (res.data.publishing_right) {
            wx.navigateTo({
              url: './active/active'
            })
          } else {
            let MyUser = new wx.BaaS.User()
            MyUser.get(app.globalData.userId).then(res => {
              // success
              console.log(res.data)
              wx.setStorageSync('user', res.data)
              if (res.data.publishing_right) {
                wx.navigateTo({
                  url: './active/active'
                })
              } else {
                wx.showToast({
                  title: '你暂无此权利',
                  icon: 'none',
                  duration: 1000
                })
              }
            }, err => {
              wx.showToast({
                title: '你暂无此权利',
                icon: 'none',
                duration: 1000
              })
              // err
            })
          }
        }else{
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail () {
        wx.showToast({
          title:'请先登录.',
          icon: 'none',
          duration: 500
        })
      }
    })

    // if (app.globalData.login) {
    //   wx.getStorage({
    //     key: 'user',
    //     success(res) {
    //       if (res.data.publishing_right) {
    //         wx.navigateTo({
    //           url: './active/active'
    //         })
    //       } else {
    //         let MyUser = new wx.BaaS.User()
    //         MyUser.get(app.globalData.userId).then(res => {
    //           // success
    //           console.log(res.data)
    //           wx.setStorageSync('user', res.data)
    //           if (res.data.publishing_right){
    //             wx.navigateTo({
    //               url: './active/active'
    //             })
    //           }else{
    //             wx.showToast({
    //               title: '你暂无此权利',
    //               icon: 'none',
    //               duration: 1000
    //             })
    //           }
    //         }, err => {
    //           wx.showToast({
    //             title: '你暂无此权利',
    //             icon: 'none',
    //             duration: 1000
    //           })
    //           // err
    //         })
    //       }
    //     },
    //     fail () {
    //       wx.showToast({
    //         title: '请先登录',
    //         icon: 'none',
    //         duration: 1000
    //       })
    //     }
    //   })
    // }else{
    //   wx.showToast({
    //     title: '请先登录',
    //     icon: 'none',
    //     duration: 1000
    //   })
    // }
  },
  identify() {
    let _this = this
    if(app.globalData.login){
      wx.getStorage({
        key: 'user',
        success: function (res) {

          let id = res.data.id.toString()

          let fn = () => {
            wx.navigateTo({
              url: './identification/identification'
            })
          }

          let fn2 = () => {

            _this.setData({
              identify: true
            })

            wx.showToast({
              title: '您已提交认证申请。',
              icon: 'none',
              duration: 1500
            })
          }

          getReleaserInfo(id, fn, fn2)
        },
        fail() {
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000
      })
    }
  },
  tips(){
    wx.showToast({
      title: `本功能暂未开放，敬请期待！`,
      icon: 'none',
      duration: 1000
    })
  }
})