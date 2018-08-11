// 用于计算日期
function getDate(mydate) {
  let dt = new Date(mydate)
  let month = dt.getMonth() + 1
  let date = dt.getDate();
  return `${month}.${date}`
}
// 计算showTime
function getShowTime(mydate) {
  let dt = new Date(mydate)
  let month = dt.getMonth() + 1
  let date = dt.getDate()
  let hour = dt.getHours()
  let minute = dt.getMinutes()
  return `${month}.${date} ${hour}:${minute}`
}
// 计算时间进行的状态，（未开始、已结束那些）
function getState(startDate, deadDate) {
  let now = new Date().getTime()
  let start = new Date(startDate).getTime()
  let dead = new Date(deadDate).getTime()
  let state = 0
  if (now < start) {
    state = 0
  } else if (now >= start && now <= dead) {
    state = 1
  } else {
    state = 2
  }
  return state
}

function getTime(mydate) {
  let dt = new Date(mydate)
  let year = dt.getFullYear()
  let month = dt.getMonth() + 1 > 10 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)
  let date = dt.getDate() > 10 ? dt.getDate() : '0' + dt.getDate()
  let hour = dt.getHours()
  let minute = dt.getMinutes() > 10 ? dt.getMinutes() : dt.getMinutes() + '0'
  return `${year}-${month}-${date} ${hour}:${minute}`
}

module.exports = {
  getDate,
  getShowTime,
  getState,
  getTime
}
