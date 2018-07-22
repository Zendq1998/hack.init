// page/group/newGroup/index.js
import { uploadData } from '../../../lib/upload.js'
import { postRequest } from '../../../lib/request.js'

let postData = {
  user_id: wx.getStorageSync('openid'),
  username: "",
  chatimage: ""
}

let postImg = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImg: "",
    groupName: ""
  },

  /**
   * 选择头像
   */
  chooseImage: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          tempImg: tempFilePaths
        })
        var myDate = new Date()
        var ossPath = 'WXUploadImage/' + myDate.getFullYear()
        for (var i = 0; i < tempFilePaths.length; i++) {
          // 获取文件后缀
          var pathArr = tempFilePaths[i].split('.')
          //  随机生成文件名称
          var fileRandName = Date.now() + "" + parseInt(Math.random() * 1000)
          var fileName = fileRandName + '.' + pathArr[1]
          // 要提交的key
          var fileKey = ossPath + '/' + fileName
          wx.uploadFile({
            url: uploadData.host,
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              name: tempFilePaths[i],
              key: fileKey,
              policy: uploadData.message,
              OSSAccessKeyId: uploadData.accessid,
              signature: uploadData.signature,
              success_action_status: "200"
            },
            success: function (res) {
              var data = res.data
              var url = uploadData.host + '/' + fileKey
              postImg = url
            }
          })
        }
      }
    })
  },

  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.tempImg
    })
  },

  inputGroupName: function (e) {
    const that = this
    that.setData({
      groupName: e.detail.value
    })
  },

  // 创建群
  newGroup: function () {
    const that = this
    postData.chatimage = postImg
    postData.username = that.data.groupName
    postRequest('/chat/group/',postData)
    .then(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})