// components/searchBar/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    cancel: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    clear: false,
    content: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searching(e) {
      let searchName
      if (e) {
        searchName = e.detail.value;
      }
      if (searchName) {
        this.setData({
          clear: true
        })
      } else {
        this.setData({
          clear: false
        })
      }
      // 把表单数据返回到组件外部
      this.triggerEvent("action", searchName)
    },
    backHome() {
      wx.navigateBack({
        delta: 1,
      })
    },
    clearInput() {
      console.log('hello')
      this.setData({
        content: ''
      })
      this.searching()
    }
  }
})
