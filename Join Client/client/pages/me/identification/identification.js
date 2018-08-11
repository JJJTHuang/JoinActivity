import { releaserIdentity, getReleaserInfo } from '../../../utils/api/addReleaser.js'

Page({
  data: {
    user: {}
  },
  submit(e) {
    // 子组件传递过来的表格元组数据
    let formData = e.detail

    wx.getStorage({
      key: 'user',
      success: function (res) {
        let id = res.data.id.toString()
        formData.user_id = id
        let rl = (formData) => releaserIdentity(formData)
        console.log(id,formData)
        getReleaserInfo(id, rl(formData))
      }
    })
    
  }
})