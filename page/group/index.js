// page/group/index.js
import { postRequest } from '../../lib/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myGroup:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    that.getMyGroup()
  },
  // 获取我的群列表
  getMyGroup: function () {
    const that = this
    postRequest('/chat/main/',{
      id: wx.getStorageSync('openid')
    }).then(res => {
      that.setData({
        myGroup: res.data.chatlist
      })
      console.log(that.data.myGroup)
    })
  },
// 去创建我的群
  toNewGroup: function () {
    wx.navigateTo({
      url: '/page/group/newGroup/index',
    })
  },
  // 查看我的群详情
  toGroupDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/page/group/groupDetail/index?id=' + id,
    })
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