//用于查看已收藏的比赛
function getLovedCompetitionList(fn) {
  let competition = wx.getStorageSync('competitions')
  let user = wx.getStorageSync('user')
  let attentedLove = user.attentedLove
  let LoveCompetitionList = []
  if (attentedLove) {
    if (attentedLove.length != 0) {
      for (let i in competition) {
        let exist = attentedLove.some((item, index) => {
          if (item === competition[i].id) { return true }
        })
        // 判断用户是否为存在该活动
        if (exist) {
          LoveCompetitionList.push(competition[i])
        }
      }
      if (fn) {
        fn(LoveCompetitionList)
      }
    } else fn(null)
  } else fn(null)
}
//用于查看已收藏的演出
function getLovedShowList(fn) {
  let show = wx.getStorageSync('shows')
  let user = wx.getStorageSync('user')
  let ticketLove = user.ticketLove
  let LoveShowList = []
  if (ticketLove) {
    if (ticketLove.length != 0) {
      for (let i in show) {
        let exist = ticketLove.some((item, index) => {
          if (item == show[i].id) { return true }
        })
        // 判断用户是否为存在该活动
        if (exist) {
          LoveShowList.push(show[i])
        }
      }
      if (fn) {
        fn(LoveShowList)
      }
    } else fn(null)
  } else fn(null)
}
//用于给比赛或表演查看是否有收藏
function getLove(type, typeId) {
  let user = wx.getStorageSync('user')
  if (type === 'competitions') {
    if (user.attentedLove) {
      let attentedLove = user.attentedLove
      let loved = attentedLove.some((item, index) => {
        if (item === typeId) { return true }
      })
      return loved
    }
    return false
  } else if (type === 'shows') {
    if (user.ticketLove) {
      let ticketLove = user.ticketLove
      let loved = ticketLove.some((item, index) => {
        if (item === typeId) { return true }
      })
      return loved
    }
    return false
  }
}


module.exports = {
  getLovedCompetitionList: getLovedCompetitionList,
  getLovedShowList: getLovedShowList,
  getLove: getLove
}