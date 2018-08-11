let app = getApp()

// 计算我的/已参与的比赛
function getJoinedCompetitionList(fn) {
  let competition = wx.getStorageSync('competitions')
  let user = wx.getStorageSync('user')
  let attentedIds = user.attentedIds
  let joinedCompetitionList = []
  if (attentedIds) {
    if (attentedIds.length != 0) {
      for (let i in competition) {
        let exist = attentedIds.some((item, index) => {
          if (item === competition[i].id) { return true }
        })
        // 判断用户是否为存在该活动
        if (exist) {
          console.log(competition[i])
          joinedCompetitionList.push(competition[i])
        }
      }
      if (fn) {
        fn(joinedCompetitionList)
      }
    } else fn(null)
  } else fn(null)

}
// 计算我的/已参与的表演
function getJoinedShowList(fn) {
  let show = wx.getStorageSync('shows')
  let user = wx.getStorageSync('user')
  let ticketIds = user.ticketIds
  let joinedShowList = []
  if (ticketIds) {
    if (ticketIds.length != 0) {
      for (let i in show) {
        let exist = ticketIds.some((item, index) => {
          if (item === show[i].id) { return true }
        })
        // 判断用户是否为存在该活动
        if (exist) {
          joinedShowList.push(show[i])
        }
      }
      if (fn) {
        fn(joinedShowList)
      }
    } else fn(null)
  } else fn(null)
}

//计算是否有参加该比赛/表演返回到competition.js/show.js
function getJoined(userIds) {
  let userID = app.globalData.userId
  if (userIds) {
    let exist = userIds.some((item, index) => {
      if (item === userID) {
        return true
      }
    })
    if (exist) {
      return true
    } else {
      return false
    }
  }
  return false
}

module.exports = {
  getJoinedCompetitionList: getJoinedCompetitionList,
  getJoinedShowList: getJoinedShowList,
  getJoined: getJoined
}