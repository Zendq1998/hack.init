// page/group/newBill/index.js

import {getRequest,postRequest} from '../../../lib/request.js'

const classDetail = [
  {
    url: ['../../../img/icon/happy.png', '../../../img/icon/happy_l.png'],
    dis: "娱乐"
  },
  {
    url: ['../../../img/icon/food.png', '../../../img/icon/food_l.png'],
    dis: "吃喝"
  },
  {
    url: ['../../../img/icon/live.png', '../../../img/icon/live_l.png'],
    dis: "住宿"
  },
  {
    url: ['../../../img/icon/meirong.png', '../../../img/icon/meirong_l.png'],
    dis: "美容"
  },
  {
    url: ['../../../img/icon/shopping.png', '../../../img/icon/shopping_l.png'],
    dis: "购物"
  },
  {
    url: ['../../../img/icon/sport.png', '../../../img/icon/sport_l.png'],
    dis: "运动"
  },
  {
    url: ['../../../img/icon/transport.png', '../../../img/icon/transport_l.png'],
    dis: "交通"
  },
  {
    url: ['../../../img/icon/other.png', '../../../img/icon/other_l.png'],
    dis: "其它"
  },
]
let classChoose = [0,0,0,0,0,0,0,0]

let myGroup = []

let postData = {
  id: wx.getStorageSync('openid'),
  price: 0,
  chat_id: 0,
  myclass: "1",
  time: "",
  ps: ""
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    billNum: null,
    payer: "",
    date: "",
    active: "",
    classDetail,
    classChoose,
    myGroup,
    myGroupHidden: true
  },
  // 输入金额
  inputBill: function (e) {
    const that = this
    that.setData({
      billNum: e.detail.value
    })
    postData.price = e.detail.value 
  },
  // 输入支付人
  inputPayer: function (e) {
    const that = this
    that.setData({
      myGroupHidden: false
    })
  },
  relationSheetChange: function () {
    const that = this
    that.setData({
      myGroupHidden: true
    })
  },
  // 选择时间
  birthPick: function (e) {
    this.setData({
      date: e.detail.value
    })
    postData.time = e.detail.value
  },
  // 输入活动
  inputActive: function (e) {
    const that = this
    that.setData({
      active: e.detail.value,
    })
    postData.ps = e.detail.value
  },
// 选择类型
  chooseClass: function (e) {
    const that = this
    let index = e.currentTarget.dataset.index
    classChoose = [0,0,0,0,0,0,0,0]
    classChoose[index] = 1
    that.setData({
      classChoose
    })
    postData.myclass = "" + index
  },
  chooseGroup: function (e) {
    const that = this
    let groupChoosed = e.target.dataset.value
    console.log(groupChoosed)
    that.setData({
      myGroupHidden: true,
      payer: groupChoosed.chatname,
    })
    postData.chat_id = groupChoosed.id
  },
  // 提交
  newBill: function () {
    postRequest('/chat/recoder/',postData).then(res => {
      if (res.statusCode == 200) {
        wx.showToast({
          title: '创建成功～',
          success: function () {
            wx.setStorageSync('fresh', true)
            wx.navigateBack({
              
            })
          }
        })
      }
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
    const that = this
    myGroup = []
    if (wx.getStorageSync('myGroup')) {
      myGroup = wx.getStorageSync('myGroup')
    }
    myGroup.push({
      id: 0,
      chatname: "我自己"
    })
    that.setData({
      myGroup
    })
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