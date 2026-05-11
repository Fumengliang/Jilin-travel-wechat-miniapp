Page({
  data: {
    hotRoutes: [
      {
        id: 1,
        name: '长白山深度游',
        desc: '3天2晚，玩转冰雪秘境，沉浸式感受北国风光。天池、瀑布、温泉一网打尽。',
        cover: '/images/changbaishan/beijing.jpg',
        duration: '3天2晚',
        theme: '冰雪秘境'
      },
      {
        id: 2,
        name: '延吉风情游',
        desc: '2天1晚，体验朝鲜族特色，打卡网红民俗园与早市，品尝正宗朝鲜族美食。',
        cover: '/images/changbaishan/senlin.jpg',
        duration: '2天1晚',
        theme: '民俗体验'
      },
      {
        id: 3,
        name: '长春Citywalk',
        desc: '1-2天，打卡城市文艺地标，感受街头巷尾的人间烟火，探索伪满皇宫与电影城。',
        cover: '/images/changbaishan/town.jpg',
        duration: '1-2天',
        theme: '城市漫步'
      }
    ]
  },

  onLoad() {
    // 页面加载时可以做数据请求
  },

  goToSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },

  goToPage(e) {
    const page = e.currentTarget.dataset.page
    const urlMap = {
      search: '/pages/search/search',
      routes: '/pages/routes/routes',
      itinerary: '/pages/itinerary/itinerary',
      blindbox: '/pages/blindbox/blindbox',
      transparency: '/pages/transparency/transparency'
    }
    if (urlMap[page]) {
      wx.switchTab({ url: urlMap[page] })
    }
  },

  goRouteDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/route-detail/route-detail?id=${id}` })
  }
})