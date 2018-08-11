// components/currentTab/currentTab.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    class:String,
    currentTab:Number,
    navs:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchNav(e) {
      var page = this;
      let current = e.target.dataset.current
      if (this.data.currentTab == current) {
        return false;
      } else {
        page.setData({ currentTab: current })
        // this.triggerEvent("action", current)
      }
      // this.triggerEvent('action', this.data.currentTab)
    },
    currentChange(e) {
      let current = e.detail.current
      this.setData({
        currentTab: current
      });
      this.triggerEvent("action", current)
    },
  }
})
