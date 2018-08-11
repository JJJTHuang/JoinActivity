// pages/home/home.js
import { getDate, getShowTime, getTime } from '../../../utils/api/Date'

let app = getApp()
const ctableID = 39079
const stableID = 39080
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navs: [
      {
        name: '活动',
        type: 'activities'
      }, {
        name: '表演',
        type: 'show'
      }
    ],
    activities: [],
    show: [],
    arr: ['竞赛类', '艺术类', '体育类']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.showLoading({
      title: '加载中'
    })
    let MyUser = new wx.BaaS.User()
    MyUser.get(app.globalData.userId).then(res => {
      // success
      this.getCompetedata(res.data.openid)

    }, err => {
      // err
    })
  },
  add() {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  getCompetedata(userId) {
    // 查询比赛表获取该用户发布的比赛
    let that = this
    let MyTableObject = new wx.BaaS.TableObject(ctableID)
    let MyTableObject2 = new wx.BaaS.TableObject(stableID)

    let query = new wx.BaaS.Query()
    MyTableObject.setQuery(query.contains('builderOpenId', userId)).find().then(res=>{
      let objects = res.data.objects
      console.log(objects)
      let len = objects.length
      for(let i=0;i<len;i++){
        let obj = { pass: false }

        let { id , builderName, title, pass, cPhone, startDate, deadline, detail, sponser, type} = objects[i]
        let userIds = objects[i].userIds || []
        let posters = objects[i].posters || []
        let totalNum = objects[i].totalPeople
        obj.id = id
        obj.title = title
        obj.startDate = getTime(startDate).split(' ')[0]
        obj.deadline = getTime(deadline).split(' ')[0]
        obj.sponser = sponser
        obj.builderName = builderName
        obj.joined = userIds.length
        obj.pass = pass
        obj.cPhone = cPhone
        obj.posters = posters
        obj.detail = detail
        obj.totalNum = totalNum
        obj.type = type
        obj.show = false

        console.log(obj)

        this.data.activities[i] = obj
        
        console.log(this.data.activities)
      }

      this.setData({
        activities: this.data.activities
      })

      wx.hideLoading()

    },err=>{
      console.log(err)
    })

    MyTableObject2.setQuery(query.contains('builderOpenId', userId)).find().then(res => {
      let objects = res.data.objects
      console.log(objects.length)
      for (let i = 0; i < objects.length; i++) {
        let obj = { pass: false }

        let { id, builderName, title, pass, cPhone, showTime, saletime, detail } = objects[i]
        let userIds = objects[i].userIds || []
        let posters = objects[i].posters || []
        let totalNum = objects[i].totalPeople
        obj.id = id
        obj.title = title
        obj.showTime = getTime(showTime)
        obj.saletime = getTime(saletime)
        obj.builderName = builderName
        obj.title = title
        obj.joined = userIds.length
        obj.pass = pass
        obj.cPhone = cPhone
        obj.posters = posters
        obj.detail = detail
        obj.totalNum = totalNum
        obj.show = false
        
        this.data.show[i] = obj

        console.log(this.data.show)
      }

      this.setData({
        show: this.data.show
      })

    }, err => {
      console.log(err)
    })

    wx.setStorage({
      key: 'activities',
      value: that.data.activities
    })

    wx.setStorage({
      key: 'show',
      value: that.data.show
    })
  },
  goActivity(e) {
    let competition = e.currentTarget.dataset.competition
    // 转化为json
    competition = JSON.stringify(competition)
    wx.navigateTo({
      url: '../../activity/activity?competition=' + competition
    })
  },
  goMessage(e) {
    let show = e.currentTarget.dataset.show
    // 转化为json
    show = JSON.stringify(show)
    wx.navigateTo({
      url: '../../ticket/ticketMessage/ticketMessage?show=' + show,
    })
  },
  goActiModify (e) {

    let data = e.currentTarget.dataset
    let type = 'activity'
    data.competition.modify = true
    console.log(data)

    wx.navigateTo({
      url: '../add/add?type=' + type + '&activity=' + JSON.stringify(data.competition) + '&passDataimg=' + JSON.stringify(data.competition.posters)
    })
  },
  goShowModify (e) {
    let data = e.currentTarget.dataset
    let type = 'show'
    data.show.modify = true
    console.log(data)

    wx.navigateTo({
      url: '../add/add?type=' + type + '&show=' + JSON.stringify(data.show) + '&passDataimg=' + JSON.stringify(data.show.posters)
    })

  },
  tips() {
    wx.showToast({
      title: '持续完善中...',
      icon: 'none',
      duration: 1000
    })
  }
})