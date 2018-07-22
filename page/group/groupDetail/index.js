// page/group/groupDetail/index.js
import { postRequest } from '../../../lib/request.js'

let id

Page({

  /**
   * 页面的初始数据
   */
  data: {
    billList: [],
    memberList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    id = parseInt(options.id)
    Promise.all([
      postRequest('/chat/water/', {
        chat_id: id,
        id: wx.getStorageSync('openid')
      }),
      postRequest('/chat/member/', {
        chat_id: id,
        id: wx.getStorageSync('openid')
      }),
      postRequest('/chat/image/', {
        chat_id: id
      })
    ]).then(res => {
      console.log(res[1].data.list)
      that.setData({
        billList: res[0].data.chatlist,
        memberList: res[1].data.list,
        groupName: res[2].data.chatname,
        groupImg: res[2].data.chatimage
      })
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
    let openid = wx.getStorageSync('openid')
    
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
    const that = this;
    return {
      title: wx.getStorageSync('userInfo').nickName + '邀请你进入' + that.data.groupName + '哦', // 转发后 所显示的title
      desc: '分享页面的内容',
      path: '/pages/index/index?groupId=' + id, // 相对的路径
      success: function (res) { // 成功后要做的事情
        wx.showToast({
          title: '分享成功～',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '分享失败～',
        })
      }
    }
  }
})