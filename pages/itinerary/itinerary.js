Page({
  data: {
    itinerary: [],
    statusText: {
      planned: '计划中',
      ongoing: '进行中',
      completed: '已完成'
    }
  },

  onShow() {
    this.loadItinerary()
  },

  loadItinerary() {
    const itinerary = wx.getStorageSync('myItinerary') || []
    this.setData({ itinerary })
  },

  goToRoutes() {
    wx.switchTab({ url: '/pages/routes/routes' })
  },

  deleteItinerary(e) {
    const index = e.currentTarget.dataset.index
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个行程吗？',
      success: (res) => {
        if (res.confirm) {
          let itinerary = wx.getStorageSync('myItinerary') || []
          itinerary.splice(index, 1)
          wx.setStorageSync('myItinerary', itinerary)
          this.setData({ itinerary })
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  },

  postponeDay(e) {
    const { iti, day } = e.currentTarget.dataset
    wx.showToast({ 
      title: `Day ${day} 已推迟`, 
      icon: 'none' 
    })
    // 实际应更新数据并触发AI重规划
    this.simulateAIReplan(iti)
  },

  skipDay(e) {
    const { iti, day } = e.currentTarget.dataset
    wx.showToast({ 
      title: `Day ${day} 已跳过`, 
      icon: 'none' 
    })
    this.simulateAIReplan(iti)
  },

  simulateAIReplan(itiId) {
    // 模拟AI重新规划
    setTimeout(() => {
      let itinerary = wx.getStorageSync('myItinerary') || []
      const index = itinerary.findIndex(i => i.id === itiId)
      if (index > -1) {
        itinerary[index].hasChanges = true
        wx.setStorageSync('myItinerary', itinerary)
        this.setData({ itinerary })
      }
    }, 800)
  }
})
