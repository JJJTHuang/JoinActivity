//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

// import { getAllShowList } from './utils/api/show.js'
// import { getAllCompetitionList } from './utils/api/competition.js'
App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl),
    // 引入 SDK
    require('utils/sdk-v1.4.0.js')

    // 初始化 SDK
    let clientID = 'ec1a6e5149b73e1cb766'
    wx.BaaS.init(clientID)
    // 登录
    wx.BaaS.login(false).then(res => {
      // 登录成功
      console.log(res)
      this.globalData.userId = res.id
      // 获取所有比赛

    }, res => {
      // 登录失败
    })
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    //在这里运行一次getShowlist
    let user = wx.getStorageSync('user')
    if(user){
      this.globalData.login = true
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.login = true
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    currentTab: 0,
    userInfo: {},
    userId: null,
    login: false
  },
})