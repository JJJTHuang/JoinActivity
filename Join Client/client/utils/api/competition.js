// 实例化查询对象
import { getDate, getState } from './Date.js'
import { getLove } from './love.js'
let query = new wx.BaaS.Query()
// 用于校验pass是否为true
query.compare('pass', '=', true)
let tableID = 39079
let Product = new wx.BaaS.TableObject(tableID)
// limit设置一次加载多少个数据
let limit = 5

// 获取competitionList后对其信息进行计算
function competitionMsgChange(competition) {
  competition.state = getState(competition.startDate, competition.deadline)
  competition.startDate = getDate(competition.startDate)
  competition.deadline = getDate(competition.deadline)
  competition.loved = getLove('competitions', competition.id)
  competition.full = competition.totalPeople - competition.userIds.length === 0?true:false
  return competition
}

// 获取competitionList
function getCompetitionList(fn) {
  // 不设置查询条件
  Product.setQuery(query).limit(limit).find().then(res => {
    // success
    let competitions = res.data.objects
    for (let i in competitions) {
      competitions[i] = competitionMsgChange(competitions[i])
    }
    if (fn) {
      fn(competitions)
    }
    wx.setStorageSync('competitions', competitions)
    return competitions
  }, err => {
    // err
  })
}
// 首页中competition的上拉加载
function droploadCompetitionList(offset, fn) {
  offset = offset * limit
  Product.setQuery(query).limit(limit).offset(offset).find().then(res => {
    // success
    let moreCompetitions = res.data.objects
    if (moreCompetitions.length != 0) {
      for (let i in moreCompetitions) {
        moreCompetitions[i] = competitionMsgChange(moreCompetitions[i])
      }
      console.log(moreCompetitions)
      let competitions = wx.getStorageSync('competitions')
      competitions = competitions.concat(moreCompetitions)
      console.log(competitions)
      wx.setStorageSync('competitions', competitions)
      if (fn) {
        let nomore = false
        fn(nomore, competitions)
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

// 加载list界面中的数据
function getTypeList(type, fn) {
  let query = new wx.BaaS.Query()
  query.compare('pass', '=', true)
  query.compare('type', '=', type)
  Product.setQuery(query).limit(limit).find().then(res => {
    // success
    let typeList = res.data.objects
    for (let i in typeList) {
      typeList[i] = competitionMsgChange(typeList[i])
    }
    let typeName = ''
    if (type === 0) {
      typeName = 'science'
    } else if (type === 1) {
      typeName = 'art'
    } else {
      typeName = 'physical'
    }
    wx.setStorageSync(typeName, typeList)
    if (fn) {
      fn(typeList)
    }
  }, err => {
    // err
  })
}
// 在list界面中的上拉加载
function droploadtypeList(offset, type, fn) {
  let query = new wx.BaaS.Query()
  query.compare('pass', '=', true)
  query.compare('type', '=', type)
  offset = offset * limit
  Product.setQuery(query).limit(limit).offset(offset).find().then(res => {
    // success
    let moreTypes = res.data.objects
    if (moreTypes.length != 0) {
      for (let i in moreTypes) {
        moreTypes[i] = competitionMsgChange(moreTypes[i])
      }
      console.log(moreTypes)
      let typeName = ''
      if (type === 0) {
        typeName = 'science'
      } else if (type === 1) {
        typeName = 'art'
      } else {
        typeName = 'physical'
      }
      let typesList = wx.getStorageSync(typeName)
      typesList = typesList.concat(moreTypes)
      console.log(typesList)
      wx.setStorageSync(typeName, typesList)
      if (fn) {
        let nomore = false
        fn(nomore, typesList)
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
// 提交表演参加表单后调用的函数，用于刷新competition中的userList
function updateCompetition(competitionId, userID) {
  let product = Product.getWithoutData(competitionId)
  let competitions = wx.getStorageSync('competitions')
  let competition
  for (let i in competitions) {
    if (competitions[i]._id == competitionId) {
      console.log(competitions[i])
      competition = competitions[i]
      break;
    }
  }
  let userIds = []
  if (competition.userIds) {
    userIds = competition.userIds
  }
  userIds.push(userID)
  product.set('userIds', userIds)
  product.update().then(res => {
    // success
    getCompetitionList()
  }, err => {
    // err
  })
}

function getSwiperActivity(competitionId, fn) {
  Product.get(competitionId).then(res => {
    // success
    let competition = res.data  
    competition = competitionMsgChange(competition) 
    if (fn) {
      fn(competition)
    }
  }, err => {
    // err
  })
}
function searchCompetitionList(search,fn){
  let query = new wx.BaaS.Query()
  // 用于校验pass是否为true
  query.compare('pass', '=', true)
  query.contains('title', search)
  Product.setQuery(query).find().then(res => {
    // success
    console.log(res.data.objects)
    let competitions = res.data.objects
    for (let i in competitions) {
      competitions[i] = competitionMsgChange(competitions[i])
    }
    if (fn) {
      fn(competitions)
    }
    return competitions
  }, err => {
    // err
  })
}

module.exports = {
  getCompetitionList: getCompetitionList,
  getTypeList: getTypeList,
  updateCompetition: updateCompetition,
  droploadCompetitionList: droploadCompetitionList,
  droploadtypeList: droploadtypeList,
  getSwiperActivity: getSwiperActivity,
  searchCompetitionList: searchCompetitionList
}