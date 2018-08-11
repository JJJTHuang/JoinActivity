// components/addForm/addForm.js
import wxValidate from '../../utils/WxValidate.js'

const ctableID = 39079 // 比赛数据表ID
const stableID = 39080 // 表演数据表ID
let flag = 0
let submitFlag = 0
let app = getApp()
let start,end
Component({
  /**
   * 组件的属性列表
   */
  behaviors: ['wx://form-field'],
  properties: {
    choose:String,
    passData: Object,
    modify: Boolean,
    passDataimg: Array,
    pshowTime: String,
    pshowTime_time: String,
    psaletime: String,
    psaletime_time: String,
    pstartdate: String,
    pdeadline: String,
    type: Number
  },
  /**
   * 组件的初始数据
   */
  data: {
    title: '',
    startdate: '2018-06-01',
    showTime: '2018-06-01',
    showTime_time: '09:00',
    deadline: '2018-06-02',
    saletime: '2018-06-01',
    saletime_time: '09:00',
    cPhone: '',
    description: '详情',
    sponsor:  '',
    totalNum:100,
    array: ['竞赛类', '艺术类', '体育类'],
    objectArray: [
      {
        id: 0,
        name: '竞赛类'
      },
      {
        id: 1,
        name: '艺术类'
      },
      {
        id: 2,
        name: '体育类'
      }
    ],
    index: 0,
    imageSrc: [], // 选取图片的数组
    imageShow: [], // 图片显示判断数组
    imgPath: [],
    passDataimgSrc: [],
    add: false //
  },
  /**
   * 组件的方法列表
   */
  methods: {
    validateActivity() {
      const rules = {
        title: {
          required: true,
          title: true
        },
        startdate: {
          required: true,
          date: true
        },
        deadline: {
          required: true,
          date: true
        },
        sponsor: {
          required: true,
          title: true
        },
        cPhone: {
          required: true,
          digits: true,
          tel: true
        },
        totalNum: {
          required: true,
          digits: true
        },
        description: {
          required: true,
          title: true
        }
      }

      const messages = {
        title: {
          required: '请输入活动名称',
          title: '活动名称至少2个字'
        },
        startdate: {
          required: '请选择活动起始日期'
        },
        deadline: {
          required: '请选择活动截止日期'
        },
        sponsor: {
          required: '请输入主办方',
          title: '主办方名称至少两个字'
        },
        cPhone: {
          required: '请输入联系人电话'
        },
        totalNum: {
          required: '请输入最大活动参与人数'
        },
        description: {
          required: '请输入活动详情',
          title: '活动详情需至少2个字'
        }
      }

      this.WxValidate = new wxValidate(rules, messages)

      this.WxValidate.addMethod('title', (value, param) => {
        return value.length > 2
      }, '输入不规范')
    },
    validateShow () {
      this.WxValidate = new wxValidate(
        {
          title: {
            required: true,
            title: true
          },
          cPhone: {
            required: true,
            digits: true,
            tel: true
          },
          totalNum: {
            required: true,
            digits: true
          },
          description: {
            required: true,
            title: true
          }
        }
        , {
          title: {
            required: '请输入活动名称',
            title: '活动名称至少2个字'
          },
          cPhone: {
            required: '请输入联系人电话',
            cPhone: '请输入正确的电话号码'
          },
          totalNum: {
            required: '请输入最大活动参与人数'
          },
          description: {
            required: '请输入活动详情',
            title: '活动详情需至少2个字描述'
          }
        }
      )

      this.WxValidate.addMethod('title', (value, param) => {
        return value.length > 2
      }, '输入不规范')
    },
    bindPickerChange (e) {

      this.data.modify ? this.setData({
        type: e.detail.value
      }) : this.setData({
        index: e.detail.value
      })
      console.log(this.data)
    },
    bindstartDateChange (e) {
      let that = this
      start = new Date(e.detail.value).getTime()
      end = new Date(that.data.pdeadline || that.data.deadline).getTime()
      this.checkDate(start, end, '截止日期需大于起始日期', () => {
        if (this.data.modify) {
          this.setData({
            pstartdate: e.detail.value
          })
        } else {
          this.setData({
            startdate: e.detail.value
          })
        }
      })
    },
    binddeadlineChange (e) {
      let that = this
      start = new Date(that.data.pstartdate || that.data.startdate).getTime()
      end = new Date(e.detail.value).getTime()
      this.checkDate(start, end, '截止日期需大于起始日期', () => {
        if (this.data.modify) {
          this.setData({
            pdeadline: e.detail.value
          })
        } else {
          this.setData({
            deadline: e.detail.value
          })
        }
      })
    },
    bindshowTimeChange (e) {
      let that = this
      start = new Date(that.data.psaletime || that.data.saletime).getTime()
      end = new Date(e.detail.value).getTime()

      this.checkDate(start, end, '演出时间需大于抢票时间', () => {
        this.data.modify ? this.setData({
          pshowTime: e.detail.value
        }) : this.setData({
          showTime: e.detail.value
        })
      })
    },
    bindsaletimeChange (e) {
      let that = this
      start = new Date(e.detail.value).getTime()
      end = new Date(that.data.pshowTime || that.data.showTime).getTime()

      this.checkDate(start, end, '抢票时间需大于演出时间', () => {
        this.data.modify ? this.setData({
          psaletime: e.detail.value
        }) : this.setData({
          saletime: e.detail.value
        })
      })
    },
    bindsaletime_timeChange (e) {
      this.data.modify ? this.setData({
        psaletime_time: e.detail.value
      }) : this.setData({
        saletime_time: e.detail.value
      })
    },
    bindshowtime_timeChange (e) {
      this.data.modify ? this.setData({
        pshowTime_time: e.detail.value
      }) : this.setData({
        showTime_time: e.detail.value
      })
    },
    formSubmit (e) {

      this.data.choose === 'activity' ? this.validateActivity() : this.validateShow()

      let that = this

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
      }else{
        wx.showToast({
          title: '后台奋力提交中...',
          icon: 'loading',
          duration: 2000
        })
        wx.getStorage({
          key: 'user',
          success: function (res) {
            if (that.data.modify && that.properties.choose === 'activity'){
              console.log(that.data.passDataimg, that.data.passDataimgSrc)
              if (that.data.passDataimg.length > 0 && that.data.add){
                that.data.passDataimg.forEach((item, index) => {
                  that.uploadImgs(item, () => { that.modifyData(ctableID, res.data, e.detail.value) })
                })
              }else{
                that.modifyData(ctableID, res.data, e.detail.value)
              }
            } else if (that.data.modify && that.properties.choose === 'show') {
              if (that.data.passDataimg.length > 0 && that.data.add) {
                that.data.passDataimg.forEach((item, index) => {
                  that.uploadImgs(item, () => { that.modifyData(stableID, res.data, e.detail.value) })
                })
              }else{
                that.modifyData(stableID, res.data, e.detail.value)
              }
            }else if (that.properties.choose === 'activity') {
              console.log(that.data)
              if (that.data.imageSrc.length > 0){
                that.data.imageSrc.forEach((item, index) => {
                  that.uploadImgs(item, () => { that.addData(ctableID, res.data, e.detail.value) })
                })
              }else{
                that.addData(ctableID, res.data, e.detail.value)
              }
            } else {
              if (that.data.imageSrc.length > 0) {
                that.data.imageSrc.forEach((item, index) => {
                  that.uploadImgs(item, () => { that.addData(stableID, res.data, e.detail.value) })
                })
              }else{
                that.addData(ctableID, res.data, e.detail.value)
              }
            }
          }
        })
      }
    },
    showImgs () {
      if(!this.data.modify){
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: this.data.imageSrc // 需要预览的图片http链接列表
        })
      }else{
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: this.data.passDataimg // 需要预览的图片http链接列表
        })
      }
    },
    chooseImgs () {

      let that = this

      if (!this.data.modify){
        wx.chooseImage({
          count: 5, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            let imgShow = []
            for (let i = 0; i < tempFilePaths.length; i++) {
              imgShow.push(true)
            }
            that.setData({
              imageSrc: tempFilePaths,
              imageShow: imgShow
            })
            submitFlag = that.data.imageSrc.length
          },
          fail () {
            console.log('选取失败.')
          }
        })
      }else{
        wx.chooseImage({
          count: 5, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
              passDataimg: []
            })

            console.log(res)

            var tempFilePaths = res.tempFilePaths

            let imgShow = []
            for (let i = 0; i < tempFilePaths.length; i++) {
              imgShow.push(true)
            }

            let files

            if(tempFilePaths.length>0){
              files = tempFilePaths
            }else{
              files = that.data.passDataimg
            }

            that.setData({
              passDataimg: files,
              imageShow: imgShow,
              add: true
            })

            submitFlag = files.length

          }
        })
      }
    },
    uploadImgs (imgPath,fn) {
      let that = this
      let MyFile = new wx.BaaS.File()
      let fileParams = { filePath: imgPath }

      MyFile.upload(fileParams).then(res => {

        /*
         * 注: 只要是服务器有响应的情况都会进入 success, 即便是 4xx，5xx 都会进入这里
         * 如果上传成功则会返回资源远程地址,如果上传失败则会返回失败信息
         */

        let data = res.data  // res.data 为 Object 类型

        if (!that.data.modify){
          that.data.imgPath.push(data.path)
        }else{
          that.data.passDataimgSrc.push(data.path)
        }

        flag++

        if(flag === submitFlag){
          fn()
        }
      }, err => {
        console.log(err)
      })

    },
    addData (tableID,userData,value) {

      console.log(1)

      let that = this
      let Product = new wx.BaaS.TableObject(tableID)
      let product = Product.create()
      let totalNum = parseInt(value.totalNum) || parseInt(this.data.totalNum)
      let insertData = {
        title: value.title,
        cPhone: value.cPhone,
        detail: value.description,
        builderOpenId: userData.openid,
        builderName: userData.name,
        totalPeople: totalNum,
        type: parseInt(that.data.index),
        posters: that.data.imgPath
      }

      if (tableID === ctableID) {
        insertData.startDate = value.startdate
        insertData.deadline = value.deadline
        insertData.sponser = value.sponsor
      } else {
        let showTime_time = `${parseInt(value.showTime_time.split(':')[0]) - 8}:${value.showTime_time.split(':')[1]}`
        let saletime_time = `${parseInt(value.saletime_time.split(':')[0]) - 8}:${value.saletime_time.split(':')[1]}`
        insertData.showTime = value.showTime + 'T' + showTime_time
        insertData.saletime = value.saletime + 'T' + saletime_time
      }

      product.set(insertData).save().then(res => {
        // success
        flag = 0
        submitFlag = 0

        wx.showToast({
          title: '提交成功,请耐心等待管理员审核',
          icon: 'none',
          duration: 1500,
          success() {
            wx.navigateTo({
              url: '../active/active'
            })
          }
        })

      }, err => {
        // err
      })      
      
    },
    // 修改函数写的比较粗糙,后面再改(加次数限制,每天只可修改两次)
    modifyData (tableID, userData, value) {

      let that = this

      let Product = new wx.BaaS.TableObject(tableID)
      let product = Product.getWithoutData(this.data.passData.id)
      // 设置查询条件（比较、字符串包含、组合等）

      let totalNum = parseInt(value.totalNum) || parseInt(this.data.totalNum)
      let type = this.data.type || this.data.index
      
      product.set('title', value.title)
      product.set('cPhone', value.cPhone)
      product.set('detail', value.description)
      product.set('builderName', userData.name)
      product.set('totalPeople', totalNum)

      if (that.data.passDataimgSrc.length > 0){
        let posters = that.data.passDataimgSrc
        product.set('posters', posters)
      }


      if(tableID === ctableID){
        product.set('startDate', value.startdate)
        product.set('deadline', value.deadline)
        product.set('sponser', value.sponsor)
        product.set('type', type)
      }else{
        let showTime_time = `${parseInt(value.showTime_time.split(':')[0]) - 8}:${value.showTime_time.split(':')[1]}`
        let saletime_time = `${parseInt(value.saletime_time.split(':')[0]) - 8}:${value.saletime_time.split(':')[1]}`
        product.set('showTime', value.showTime + 'T' + showTime_time)
        product.set('saletime', value.saletime + 'T' + saletime_time)
      }

      product.update().then(res => {
        flag = 0
        submitFlag = 0
        // success
        wx.showToast({
          title: '提交成功,请耐心等待管理员审核',
          icon: 'none',
          duration: 1500,
          success() {
            wx.navigateTo({
              url: '../active/active'
            })
          }
        })
      }, err => {
        // err
      })

      // wx.hideToast()
    },
    // 时间检测工具
    checkDate (start,end,tips,fn) {
      if(end-start<0){
        wx.showToast({
          title: tips,
          icon: 'none',
          duration: 1500
        })
      }else{
        fn()
      }
    }
  }
})
