Page({
  data: {
    userInfo: {
      nickName: '',
      avatarUrl: '',
      userId: ''
    },
    stats: {
      itineraryCount: 0,
      boxCount: 0,
      points: 0,
      couponCount: 2
    }
  },

  onShow() {
    this.loadUserInfo()
    this.loadStats()
  },

  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo })
    }
  },

  loadStats() {
    const itinerary = wx.getStorageSync('myItinerary') || []
    this.setData({
      'stats.itineraryCount': itinerary.length
    })
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const userInfo = { ...this.data.userInfo, avatarUrl }
    wx.setStorageSync('userInfo', userInfo)
    this.setData({ userInfo })
  },

  goToItinerary() {
    wx.switchTab({ url: '/pages/itinerary/itinerary' })
  },

  goToOrders() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  goToFavorites() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  goToReports() {
    wx.navigateTo({ url: '/pages/transparency/transparency' })
  },

  goToCoupons() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  contactService() {
    wx.showModal({
      title: '联系客服',
      content: '客服电话：18844283565
工作时间：9:00-21:00',
      confirmText: '拨打电话',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({ phoneNumber: '18844283565' })
        }
      }
    })
  },

  goToAbout() {
    wx.showModal({
      title: '关于吉林私旅管家',
      content: '吉林私旅管家是专为年轻人打造的免费智能旅行规划平台。

我们致力于解决年轻人来吉林旅游的三大痛点：不敢放心消费、不想费心规划、不知如何选择。

让每一次吉林之行，都不焦虑、不折腾、不踩坑！',
      showCancel: false
    })
  }
})
