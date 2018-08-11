import { updateShow, getShowList } from './show.js'
import { updateCompetition, getCompetitionList } from './competition.js'
let MyUser = new wx.BaaS.User()
let app = getApp();

// 获取用户数据
function getUserInfo(fn) {
  let userID = app.globalData.userId
  MyUser.get(userID).then(res => {
    // success
    console.log(res.data)
    wx.setStorageSync('user', res.data)
    if(fn){
      fn()
    }
  }, err => {
    console.log('无法获取用户信息')
    // err
  })
}

// 提交表单时更新用户数据到后台
function updateUser(student) {
  student.stuNum = Number(student.stuNum)
  console.log(student)
  student.classNum = Number(student.classNum)
  console.log('here2')
  let currentUser = MyUser.getCurrentUserWithoutData()
  // age 为自定义字段
  currentUser.set(student).update().then(res => {
    // success
    getUserInfo(()=>{
      //刷新比赛内容
      getCompetitionList()
      //刷新演出内容
      getShowList()
    })
    updatePrevPageJoined()
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
    })
  }, err => {
    // err
    console.log('内容更新失败')
  })
}

// 用于更前前一页的数据，updateUser中使用
function updatePrevPageJoined(){
  let pages = getCurrentPages()
  let prevPage = pages[pages.length - 2]  //上一个页面
  prevPage.setData({
    joined: !prevPage.data.joined
  })
  prevPage = pages[pages.length - 3]
  prevPage.onLoad()
}
// 刷新上个页面，updateUserLove(中使用
function updatePrevPage() {
  let pages = getCurrentPages()
  let prevPage = pages[pages.length - 2]  //上一个页面
  console.log(prevPage)
  if (prevPage.route === 'pages/list/list' || prevPage.route === 'pages/me/loved/loved') {
    getCompetitionList() //为了list返回时界面刷新数据
  }
  prevPage.onLoad()//为了home、ticket返回时界面刷新

}
// 收藏时更新数据
function updateUserLove(loveList) {
  let currentUser = MyUser.getCurrentUserWithoutData()
  // age 为自定义字段
  currentUser.set(loveList).update().then(res => {
    // success
    getUserInfo(() => {
      //刷新比赛内容
      getCompetitionList()
      //刷新演出内容
      getShowList()
    })
    updatePrevPage()
  }, err => {
    // err
    wx.showToast({
      title: '提交失败',
      icon: 'none',
      duration: 1000
    })
  })
}
// 提交表单时更新数据前对各项内容进行判断，连接后台的在上面的updateUser
function updateUserInfo(student, type, id) {
  let userID = app.globalData.userId
  let user = wx.getStorageSync('user')
  if (type === 'ticket') {
    // 判断用户该夹是否为空
    console.log(user.ticketIds)
    if (!user.ticketIds) {
      console.log('here')
      let ticketIds = [id]
      student.ticketIds = ticketIds
      updateUser(student)
      // 更新show中的userIds，在show.js
      updateShow(id, userID)
    } else {
      let exist = user.ticketIds.some((item, index) => {
        if (item === id) { return true }
      })
      // 判断用户是否为存在该活动
      if (!exist) {
        student.ticketIds = user.ticketIds
        student.ticketIds.push(id)
        updateUser(student)
      // 更新show中的userIds，在show.js
        updateShow(id, userID)
      } else {
        wx.showToast({
          title: '你已参加过本活动',
          icon: 'none',
          duration: 1000
        })
      }
    }
  } else if (type === 'activity') {
    // 判断用户该夹是否为空
    if (!user.attentedIds) {
      let attentedIds = [id]
      student.attentedIds = attentedIds
      updateUser(student)
      // 更新competition中的userIds，在competition.js
      updateCompetition(id, userID)
    } else {
      let exist = user.attentedIds.some((item, index) => {
        if (item === id) { return true }
      })
      // 判断用户是否为存在该活动
      if (!exist) {
        student.attentedIds = user.attentedIds
        student.attentedIds.push(id)
        updateUser(student)
      // 更新competition中的userIds，在competition.js
        updateCompetition(id, userID)
      } else {
        wx.showToast({
          title: '你已参加过本活动',
          icon: 'none',
          duration: 1000
        })
      }
    }
  }
}
// 更新收藏数据前的信息判断，真正连接后台的在上面的updateUserLove
function changeLove(love, type, id) {
  let user = wx.getStorageSync('user')
  if (type === 'show') {
    if (love) {
      let ticketLove = user.ticketLove
      if (!ticketLove) {
        ticketLove = []
      }
      ticketLove.push(id)
      let loveList = { ticketLove: ticketLove }
      updateUserLove(loveList)
    } else {
      let ticketLoveList = user.ticketLove
      let ticketLove = ticketLoveList.filter((item, index) => {
        if (item != id) { return true }
      })
      let loveList = { ticketLove: ticketLove }
      updateUserLove(loveList)
    }
  } else if (type === 'competition') {
    // 判断用户该夹是否为空
    if (love) {
      let attentedLove = user.attentedLove
      if (!attentedLove) {
        attentedLove = []
      }
      attentedLove.push(id)
      let loveList = { attentedLove: attentedLove }
      updateUserLove(loveList)
    } else {
      let attentedLoveList = user.attentedLove
      let attentedLove = attentedLoveList.filter((item, index) => {
        if (item != id) { return true }
      })
      let loveList = { attentedLove: attentedLove }
      updateUserLove(loveList)
    }
  }
}

module.exports = {
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo,
  updateUser: updateUser,
  changeLove: changeLove
}