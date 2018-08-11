// 实例化查询对象
import { getDate, getShowTime, getState } from './Date.js'
import { getLove } from './love.js'
let query = new wx.BaaS.Query()
query.compare('pass', '=', true)
let tableID = 39080
let Product = new wx.BaaS.TableObject(tableID)
let limit = 5

// 获取showList后对其信息进行计算
function showMsgChange(show) {
  show.state = getState(show.saletime, show.showTime)
  // 日期只取前5-9位
  show.showTime = getShowTime(show.showTime)
  show.saletime = getDate(show.saletime)
  show.loved = getLove('shows', show.id)
  show.full = show.totalPeople - show.userIds.length === 0 ? true : false
  return show
}

// 获取showList
function getShowList(fn) {
  let query = new wx.BaaS.Query()
  query.compare('pass', '=', true)
  Product.setQuery(query).limit(limit).find().then(res => {
    // success
    let shows = res.data.objects
    for (let i in shows) {
      shows[i] = showMsgChange(shows[i])
    }
    wx.setStorageSync('shows', shows)
    if (fn) {
      fn(shows)
    }
    return shows
  }, err => {
    // err
    console.log('error')
  })
}

// showList的下拉刷新
function droploadShowList(offset, fn) {
  let query = new wx.BaaS.Query()
  query.compare('pass', '=', true)
  offset = offset * limit
  console.log(offset)
  Product.setQuery(query).limit(limit).offset(offset).find().then(res => {
    // success
    let moreShows = res.data.objects
    console.log(moreShows)
    if (moreShows.length != 0) {
      for (let i in moreShows) {
        moreShows[i] = showMsgChange(moreShows[i])
      }
      let shows = wx.getStorageSync('shows')
      shows = shows.concat(moreShows)
      console.log(shows)
      wx.setStorageSync('shows', shows)
      if (fn) {
        let nomore = false
        fn(nomore, shows)
      }
    } else {
      if (fn) {
        let nomore = true
        fn(nomore)
      }
    }
  }, err => {
    // err
  })
}

// 获取热门表演
function getHotList(fn) {
  query.compare('hot', '=', true)
  Product.setQuery(query).find().then(res => {
    // success
    let hotList = res.data.objects
    for (let i in hotList) {
      hotList[i] = showMsgChange(hotList[i])
    }
    if (fn) {
      fn(hotList)
    }
  }, err => {
    // err
  })

}

// 提交表演参加表单后调用的函数，用于刷新show中的userList
function updateShow(showId, userID) {
  let product = Product.getWithoutData(showId)
  let shows = wx.getStorageSync('shows')
  let show
  for (let i in shows) {
    if (shows[i]._id == showId) {
      show = shows[i]
      break;
    }
  }
  let userIds = []
  if (show.userIds) {
    userIds = show.userIds
  }
  userIds.push(userID)
  product.set('userIds', userIds)
  product.update().then(res => {
    // success
    getShowList()
  }, err => {
    // err
  })
}

function searchShowsList(search, fn) {
  let query = new wx.BaaS.Query()
  // 用于校验pass是否为true
  query.compare('pass', '=', true)
  query.contains('title', search)
  Product.setQuery(query).find().then(res => {
    // success
    let shows = res.data.objects
    for (let i in shows) {
      shows[i] = showMsgChange(shows[i])
    }
    if (fn) {
      fn(shows)
    }
    return shows
  }, err => {
    // err
    console.log('error')
  })
}

module.exports = {
  getShowList: getShowList,
  getHotList: getHotList,
  updateShow: updateShow,
  droploadShowList: droploadShowList,
  searchShowsList: searchShowsList
}
