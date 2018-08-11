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
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    validate(){
      this.WxValidate = new wxValidate(
        {
          name: {
            required: true,
            name: true
          },
          stuNum: {
            required: true,
            digits: true,
            name: true
          },
          classNum: {
            required: true,
            digits: true,
            name: true
          },
          phoneNum: {
            required: true,
            tel: true,
          },
          email: {
            required: true,
            email: true
          },
          subject: {
          }
        }
        , {
          name: {
            required: '请填输入您的姓名',
            name: '姓名至少两个字'
          },
          stuNum: {
            required: '请输入学号',
            name: '学号至少两位数'
          },
          classNum: {
            required: '请输入班级号码',
            name: '班级号至少输入两位数'
          },
          phoneNum: {
            required: '请填输入手机号',
          },
          email: {
            required: '请输入邮箱',
          },
          subject: {
            required: '请输入学院专业',
          }
        }
      )

      // 自定义验证规则
      this.WxValidate.addMethod('name', (value, param) => {
        return (value.length >= 2)
      }, 'submit Fail.')
    },
    formSubmit: function (e) {
      this.validate()
      let student = e.detail.value;
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
      this.triggerEvent("action", student)
      // 返回上一层
    }
  }
})
