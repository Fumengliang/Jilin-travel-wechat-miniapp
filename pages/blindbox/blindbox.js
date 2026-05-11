Page({
  data: {
    currentCategory: 'all',
    blindboxes: [],
    allBlindboxes: []
  },

  onLoad() {
    this.loadBlindboxes()
  },

  loadBlindboxes() {
    const allBlindboxes = [
      {
        id: 1,
        name: '长白山特色饰品盲盒',
        desc: '随机款式，精致百搭，包含长白山主题胸针、手链、冰箱贴等，每一件都是旅途的纪念。',
        cover: 'https://picsum.photos/400/300?random=71',
        category: 'accessory',
        categoryName: '饰品',
        price: 9.9,
        originalPrice: 29.9,
        items: ['人参主题胸针', '天池冰箱贴', '满族纹样手链', '长白山徽章']
      },
      {
        id: 2,
        name: '延吉美食盲盒',
        desc: '精选延吉地道特色小吃，辣白菜、打糕、明太鱼干、米酒，一盒尝遍延吉风味。',
        cover: 'https://picsum.photos/400/300?random=72',
        category: 'food',
        categoryName: '美食',
        price: 19.9,
        originalPrice: 49.9,
        items: ['手工辣白菜', '朝鲜打糕', '明太鱼干', '延边米酒']
      },
      {
        id: 3,
        name: '满族非遗手作盲盒',
        desc: '包含满族剪纸、荷包、刺绣材料包与详细教程，沉浸式体验非遗文化魅力。',
        cover: 'https://picsum.photos/400/300?random=73',
        category: 'craft',
        categoryName: '非遗',
        price: 29.9,
        originalPrice: 69.9,
        items: ['满族剪纸材料', '传统荷包', '刺绣教程', '非遗证书']
      },
      {
        id: 4,
        name: '朝鲜族韩服体验盲盒',
        desc: '随机款式朝鲜族传统韩服租赁1天，含头饰配饰，适合民俗园拍照打卡。',
        cover: 'https://picsum.photos/400/300?random=74',
        category: 'craft',
        categoryName: '非遗',
        price: 39.9,
        originalPrice: 99.9,
        items: ['传统韩服', '精美头饰', '配饰手包', '拍照攻略']
      },
      {
        id: 5,
        name: '吉林冰雪门票盲盒',
        desc: '随机包含北大湖、松花湖、长白山万达等滑雪场门票或温泉票，超值惊喜。',
        cover: 'https://picsum.photos/400/300?random=75',
        category: 'ticket',
        categoryName: '门票',
        price: 59.9,
        originalPrice: 199.9,
        items: ['北大湖雪票', '松花湖雪票', '万达雪票', '温泉票']
      },
      {
        id: 6,
        name: '长春文创盲盒',
        desc: '长春电影制片厂、伪满皇宫等主题文创产品，冰箱贴、明信片、帆布袋等。',
        cover: 'https://picsum.photos/400/300?random=76',
        category: 'accessory',
        categoryName: '饰品',
        price: 15.9,
        originalPrice: 39.9,
        items: ['电影主题冰箱贴', '伪满皇宫明信片', '长春帆布袋', '城市徽章']
      }
    ]

    this.setData({ allBlindboxes, blindboxes: allBlindboxes })
  },

  setCategory(e) {
    const category = e.currentTarget.dataset.category
    const { allBlindboxes } = this.data

    let filtered = allBlindboxes
    if (category !== 'all') {
      filtered = allBlindboxes.filter(b => b.category === category)
    }

    this.setData({
      currentCategory: category,
      blindboxes: filtered
    })
  },

  buyBlindbox(e) {
    const id = e.currentTarget.dataset.id
    const item = this.data.blindboxes.find(b => b.id === id)

    wx.showModal({
      title: '确认购买',
      content: `确定要购买「${item.name}」吗？
价格：¥${item.price}`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '购买成功！',
            icon: 'success'
          })
          // 实际应调用支付接口
        }
      }
    })
  }
})
