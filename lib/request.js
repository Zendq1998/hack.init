function wxPromisify(url, method, data) {
  let header = {}
  if (wx.getStorageSync('token')) {
    header = {
      token: wx.getStorageSync('token')
    }
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: "https://muxier.muxixyz.com/api" + url,
      data: data,
      header,
      method: method,
      success: res => {
        resolve(res)
      },
      fail: err => {
        console.log(err)
        reject(err)
      }
    })
  })
}

//get
export function getRequest(url, data) {
  return wxPromisify(url, 'GET', data)
}

//post
export function postRequest(url, data) {
  return wxPromisify(url, 'POST', data)
}