Page({
  data: {
    currentFilter: 'all',
    routes: [],
    allRoutes: [],
    hasMore: true
  },

  onLoad() {
    this.loadRoutes()
  },

  loadRoutes() {
    const allRoutes = [
      {
        id: 1,
        name: '长白山深度游',
        desc: '3天2晚，玩转冰雪秘境，沉浸式感受北国风光。天池、长白瀑布、聚龙温泉、地下森林，每一处都是大自然的鬼斧神工。',
        cover: 'https://picsum.photos/400/300?random=21',
        duration: '3天2晚',
        theme: '冰雪秘境',
        photoRate: 95,
        foodCount: 12,
        category: 'nature',
        highlights: ['天池观景', '温泉体验', '雪地徒步', '雾凇摄影']
      },
      {
        id: 2,
        name: '延吉风情游',
        desc: '2天1晚，体验朝鲜族特色，打卡网红民俗园与水上市场早市，品尝正宗朝鲜族冷面、打糕、泡菜。',
        cover: 'https://picsum.photos/400/300?random=22',
        duration: '2天1晚',
        theme: '民俗体验',
        photoRate: 90,
        foodCount: 20,
        category: 'culture',
        highlights: ['民俗园打卡', '早市美食', '韩服体验', '边境风光']
      },
      {
        id: 3,
        name: '长春Citywalk',
        desc: '1-2天，打卡城市文艺地标，感受街头巷尾的人间烟火。伪满皇宫、长影世纪城、桂林路美食街、净月潭森林公园。',
        cover: 'https://picsum.photos/400/300?random=23',
        duration: '1-2天',
        theme: '城市漫步',
        photoRate: 85,
        foodCount: 15,
        category: 'city',
        highlights: ['伪满皇宫', '电影文化', '文艺街区', '免费路线']
      },
      {
        id: 4,
        name: '雾凇岛摄影之旅',
        desc: '2天1晚，中国四大奇观之一，清晨雾凇如诗如画。韩屯村原生态满族风情，松花江畔银装素裹。',
        cover: 'https://picsum.photos/400/300?random=24',
        duration: '2天1晚',
        theme: '摄影圣地',
        photoRate: 99,
        foodCount: 8,
        category: 'nature',
        highlights: ['雾凇奇观', '日出摄影', '满族风情', '冰雪娱乐']
      },
      {
        id: 5,
        name: '查干湖冬捕体验',
        desc: '1天，体验千年渔猎文化，见证冰湖腾鱼的壮观场面。品尝全鱼宴，感受蒙古族渔猎文明的传承。',
        cover: 'https://picsum.photos/400/300?random=25',
        duration: '1天',
        theme: '文化体验',
        photoRate: 88,
        foodCount: 6,
        category: 'culture',
        highlights: ['冬捕仪式', '全鱼宴', '冰雕观赏', '蒙古风情']
      },
      {
        id: 6,
        name: '吉林市美食探店',
        desc: '2天1晚，从煎粉、烧烤到满族八大碗，吃遍吉林地道风味。河南街、东市场老字号一网打尽。',
        cover: 'https://picsum.photos/400/300?random=26',
        duration: '2天1晚',
        theme: '美食之旅',
        photoRate: 82,
        foodCount: 25,
        category: 'food',
        highlights: ['煎粉烧烤', '满族八大碗', '夜市文化', '老字号探访']
      },
      {
        id: 7,
        name: '北大湖滑雪度假',
        desc: '3天2晚，亚洲顶级滑雪场，粉雪天堂。适合各级滑雪爱好者，配套温泉酒店，滑完雪泡温泉。',
        cover: 'https://picsum.photos/400/300?random=27',
        duration: '3天2晚',
        theme: '冰雪运动',
        photoRate: 92,
        foodCount: 10,
        category: 'winter',
        highlights: ['粉雪滑雪', '温泉酒店', '雪具租赁', '滑雪教学']
      },
      {
        id: 8,
        name: '集安高句丽遗迹',
        desc: '2天1晚，世界文化遗产，探索高句丽王朝的神秘遗迹。丸都山城、将军坟、好太王碑，历史爱好者的圣地。',
        cover: 'https://picsum.photos/400/300?random=28',
        duration: '2天1晚',
        theme: '历史探秘',
        photoRate: 80,
        foodCount: 8,
        category: 'culture',
        highlights: ['世界遗产', '古墓探秘', '边境风光', '历史讲解']
      }
    ]

    this.setData({ allRoutes, routes: allRoutes })
  },

  setFilter(e) {
    const filter = e.currentTarget.dataset.filter
    const { allRoutes } = this.data

    let filtered = allRoutes
    if (filter !== 'all') {
      filtered = allRoutes.filter(r => r.category === filter)
    }

    this.setData({
      currentFilter: filter,
      routes: filtered
    })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/route-detail/route-detail?id=${id}` })
  }
})
