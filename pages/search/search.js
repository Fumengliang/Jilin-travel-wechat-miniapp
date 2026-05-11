Page({
  data: {
    keyword: '',
    isSearching: false,
    hasSearched: false,
    results: [],
    hotKeywords: ['长白山', '延吉', '长春', '雾凇岛', '查干湖', '伪满皇宫', '净月潭', '朝鲜族民俗园'],
    history: []
  },

  onLoad() {
    const history = wx.getStorageSync('searchHistory') || []
    this.setData({ history })
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  clearInput() {
    this.setData({ keyword: '', hasSearched: false, results: [] })
  },

  goBack() {
    wx.navigateBack()
  },

  quickSearch(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ keyword }, () => {
      this.doSearch()
    })
  },

  doSearch() {
    const { keyword } = this.data
    if (!keyword.trim()) {
      wx.showToast({ title: '请输入搜索内容', icon: 'none' })
      return
    }

    // 保存搜索历史
    this.saveHistory(keyword)

    this.setData({ isSearching: true, hasSearched: false })

    // 模拟AI搜索
    setTimeout(() => {
      const mockResults = this.getMockResults(keyword)
      this.setData({
        isSearching: false,
        hasSearched: true,
        results: mockResults
      })
    }, 1500)
  },

  getMockResults(keyword) {
    const allRoutes = [
      {
        id: 1,
        name: '长白山深度游',
        desc: '3天2晚，玩转冰雪秘境，沉浸式感受北国风光。天池、瀑布、温泉一网打尽。',
        cover: 'https://picsum.photos/400/300?random=10',
        duration: '3天2晚',
        price: 899,
        match: 98,
        tags: ['冰雪', '温泉', '摄影']
      },
      {
        id: 2,
        name: '延吉风情游',
        desc: '2天1晚，体验朝鲜族特色，打卡网红民俗园与早市，品尝正宗朝鲜族美食。',
        cover: 'https://picsum.photos/400/300?random=11',
        duration: '2天1晚',
        price: 599,
        match: 95,
        tags: ['民俗', '美食', '打卡']
      },
      {
        id: 3,
        name: '长春Citywalk',
        desc: '1-2天，打卡城市文艺地标，感受街头巷尾的人间烟火。',
        cover: 'https://picsum.photos/400/300?random=12',
        duration: '1-2天',
        price: 0,
        match: 88,
        tags: ['城市', '文艺', '免费']
      },
      {
        id: 4,
        name: '雾凇岛摄影之旅',
        desc: '2天1晚，中国四大奇观之一，清晨雾凇如诗如画。',
        cover: 'https://picsum.photos/400/300?random=13',
        duration: '2天1晚',
        price: 499,
        match: 92,
        tags: ['摄影', '自然', '冬季']
      },
      {
        id: 5,
        name: '查干湖冬捕体验',
        desc: '1天，体验千年渔猎文化，见证冰湖腾鱼的壮观场面。',
        cover: 'https://picsum.photos/400/300?random=14',
        duration: '1天',
        price: 299,
        match: 85,
        tags: ['文化', '体验', '冬季']
      }
    ]

    // 简单匹配逻辑
    return allRoutes.filter(r => 
      r.name.includes(keyword) || 
      r.desc.includes(keyword) ||
      r.tags.some(t => t.includes(keyword))
    ).map(r => ({...r, match: Math.floor(Math.random() * 15) + 85}))
  },

  saveHistory(keyword) {
    let history = wx.getStorageSync('searchHistory') || []
    history = history.filter(h => h !== keyword)
    history.unshift(keyword)
    if (history.length > 10) history = history.slice(0, 10)
    wx.setStorageSync('searchHistory', history)
    this.setData({ history })
  },

  clearHistory() {
    wx.removeStorageSync('searchHistory')
    this.setData({ history: [] })
  },

  goRouteDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/route-detail/route-detail?id=${id}` })
  }
})
