// page/index/index.js
import { getRequest, postRequest} from '../../lib/request.js'

let myBillList = []

const classDetail = [
  {
    url: ['../../img/icon/happy.png', '../../img/icon/happy_l.png'],
    dis: "娱乐"
  },
  {
    url: ['../../img/icon/food.png', '../../img/icon/food_l.png'],
    dis: "吃喝"
  },
  {
    url: ['../../img/icon/live.png', '../../img/icon/live_l.png'],
    dis: "住宿"
  },
  {
    url: ['../../img/icon/meirong.png', '../../img/icon/meirong_l.png'],
    dis: "美容"
  },
  {
    url: ['../../img/icon/shopping.png', '../../img/icon/shopping_l.png'],
    dis: "购物"
  },
  {
    url: ['../../img/icon/sport.png', '../../img/icon/sport_l.png'],
    dis: "运动"
  },
  {
    url: ['../../img/icon/transport.png', '../../img/icon/transport_l.png'],
    dis: "交通"
  },
  {
    url: ['../../img/icon/other.png', '../../img/icon/other_l.png'],
    dis: "其它"
  },
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskStatus: "hide",
    myBillList: [],
    classDetail,
    page: 1,
    hasMore: true,
    showLoad: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断缓存中是否存在用户信息
    wx.setStorageSync('fresh', false)
    const that = this
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/page/authorize/index',
      })
    }
    else {
      // 如果存在用户信息
      if (!wx.getStorageSync('openid')) {
        // 如果缓存中没有openid
        // 获取用户的openid
        that.showLoading()
        wx.login({
          success: function (res) {
            wx.request({
              url: 'https://muxier.muxixyz.com/api/openid/',
              header: {
                code: res.code
              },
              success: (res) => {
                // 获取到openid
                that.hideLoading()
                wx.setStorageSync('openid', res.data.openid)
                // 去登录
                that.signin()
              }
            })
          }
        })
      }
      else {
        // 如果缓存存在openid
        that.signin()
      }
    }
    // 判断缓存中是否存在openid
  },


  /**
   * 登录
   */
  signin: function () {
    const that = this
    if (wx.getStorageSync('openid')) {
      that.showLoading()
      wx.request({
        url: 'https://muxier.muxixyz.com/api/customer/signin/',
        method: 'POST',
        header: {
          openid: wx.getStorageSync('openid')
        },
        complete: (res) => {
          if (res.statusCode == 401) {
            // 还没有注册过
            that.hideLoading()
            that.signup()
          }
          if (res.statusCode == 200) {
            // 登录成功
            wx.setStorageSync('token', res.data.token)
            that.hideLoading()
            that.getMyBill()
          }
        }
      })
    }
  },

  /**
   * 注册
   */
  signup: function () {
    const that = this
    that.showLoading()
    wx.request({
      url: 'https://muxier.muxixyz.com/api/customer/signup/',
      method: 'POST',
      header: {
        openid: wx.getStorageSync('openid')
      },
      data: {
        username: wx.getStorageSync('userInfo').nickName,
        headimage: wx.getStorageSync('userInfo').avatarUrl
      },
      success: (res) => {
        if (res.statusCode == 201) {
          that.hideLoading()
          that.signin()
        }
      }
    })
  },
  // 去创建账单
  toNewBill: function () {
    wx.navigateTo({
      url: '/page/group/newBill/index',
    })
  },
  // 获取我的账单
  getMyBill: function () {
    const that = this
    that.showLoading()
    postRequest('/customer/main/',{
      id: wx.getStorageSync('openid'),
      pagenumber: 1
    }).then(res => {
      myBillList = res.data.relist
      that.setData({
        myBillList
      })
      postRequest('/chat/main/', {
        id: wx.getStorageSync('openid')
      }).then(res => {
        let myGroup = res.data.chatlist
        wx.setStorageSync('myGroup', myGroup)
        that.hideLoading()
      })
    })
  },
  // 获取更多账单
  getMoreBill: function () {
    const that = this
    if (that.data.hasMore) {
      that.setData({
        page: that.data.page + 1
      })
      postRequest('/customer/main/', {
        id: wx.getStorageSync('openid'),
        pagenumber: that.data.page
      }).then(res => {
        if (res.data.relist.length) {
          myBillList = myBillList.concat(res.data.relist)
          that.setData({
            myBillList
          })
        }
        else {
          that.setData({
            hasMore: false
          })
        }
      })
    }
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
    if (wx.getStorageSync('fresh')) {
      that.onLoad()
    }
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
    const that = this
    that.setData({
      showLoad: true
    })
    that.getMoreBill()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  showLoading: function () {
    this.setData({
      maskStatus: "show"
    })
    wx.showLoading({
      title: '正在加载',
      mask: true,
    })
  },

  hideLoading: function () {
    this.setData({
      maskStatus: "hide"
    })
    wx.hideLoading()
  }
})