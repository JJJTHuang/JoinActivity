// components/form/form.js
import wxValidate from '../../utils/WxValidate.js'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: ['wx://form-field'],
  properties: {
    student: Object,
    buttonName: String
  },
  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    validate() {
      const rules = {
        identity: {
          required: true
        },
        idcard: {
          required: true,
          idcard: true
        }
      }
      const messages = {
        identity: {
          required: '请输入所属社团/组织的身份(例如:信息部部长)'
        },
        idcard: {
          required: '请输入18位身份证号码',
          idcard: '请输入正确的18位身份证号码'
        }
      }
      this.WxValidate = new wxValidate(rules, messages)
    },
    formSubmit: function (e) {

      this.validate()

      // 表单参数
      let params = e.detail.value;

      console.log(params)

      if (!this.WxValidate.checkForm(e)) {

        const error = this.WxValidate.errorList[0]
        //提示信息  
        console.log(error)
        
        wx.showModal({
          title: '提示',
          content: error.msg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })

        return false
      }

      // 把表单数据返回到组件外部
      this.triggerEvent("action", params)
      // 返回上一层
    }
  }
})
