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

  // ✅ 真·推迟一天（时间+1小时，视觉生效）
  postponeDay(e) {
    const { iti, day } = e.currentTarget.dataset
    let list = wx.getStorageSync('myItinerary') || []
    const index = list.findIndex(item => item.id == iti)
    if (index === -1) return

    const dayIndex = list[index].schedule.findIndex(d => d.dayNum == day)
    if (dayIndex === -1) return

    list[index].schedule[dayIndex].nodes.forEach(node => {
      let [h, m] = node.time.split(':')
      h = (Number(h) + 1) % 24
      node.time = h.toString().padStart(2, '0') + ':' + m
    })

    wx.setStorageSync('myItinerary', list)
    this.setData({ itinerary: list })
    wx.showToast({ title: `Day ${day} 已推迟1小时`, icon: 'success' })
  },

  // ✅ 真·跳过（置灰 + 文字标记）
  skipDay(e) {
    const { iti, day } = e.currentTarget.dataset
    let list = wx.getStorageSync('myItinerary') || []
    const index = list.findIndex(item => item.id == iti)
    if (index === -1) return

    const dayIndex = list[index].schedule.findIndex(d => d.dayNum == day)
    if (dayIndex === -1) return

    list[index].schedule[dayIndex].status = 'skipped'
    list[index].schedule[dayIndex].title = '[已跳过] ' + list[index].schedule[dayIndex].title

    wx.setStorageSync('myItinerary', list)
    this.setData({ itinerary: list })
    wx.showToast({ title: `Day ${day} 已跳过`, icon: 'success' })
  },

  // 点击标题进入详情（真）
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/route-detail/route-detail?id=' + id
    })
  }
})