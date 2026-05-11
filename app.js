App({
  globalData: {
    userInfo: null,
    currentItinerary: null,
    systemInfo: null
  },

  onLaunch() {
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res
      }
    })

    // 检查更新
    this.checkUpdate()

    // 初始化本地存储的行程数据
    this.initItineraryStorage()
  },

  checkUpdate() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示',
              content: '新版本已准备好，是否重启应用？',
              success: (res) => {
                if (res.confirm) updateManager.applyUpdate()
              }
            })
          })
        }
      })
    }
  },

  initItineraryStorage() {
    const stored = wx.getStorageSync('myItinerary')
    if (!stored) {
      wx.setStorageSync('myItinerary', [])
    }
  },

  // 全局提示封装
  toast(title, icon = 'none') {
    wx.showToast({ title, icon, duration: 2000 })
  }
})
