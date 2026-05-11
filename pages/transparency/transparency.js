Page({
  data: {
    merchants: [
      {
        id: 1,
        name: '延吉丰茂烤串',
        type: '朝鲜族烤串',
        logo: 'https://picsum.photos/200/200?random=81',
        score: 4.9,
        avgPrice: 68,
        tags: ['明码标价', '网红店', '本地推荐']
      },
      {
        id: 2,
        name: '长白山温泉酒店',
        type: '度假酒店',
        logo: 'https://picsum.photos/200/200?random=82',
        score: 4.8,
        avgPrice: 388,
        tags: ['价格透明', '含温泉', '好评如潮']
      },
      {
        id: 3,
        name: '雾凇岛农家院',
        type: '特色民宿',
        logo: 'https://picsum.photos/200/200?random=83',
        score: 4.7,
        avgPrice: 128,
        tags: ['无隐形消费', '含早餐', '接送服务']
      },
      {
        id: 4,
        name: '长春桂林路小吃街',
        type: '美食街区',
        logo: 'https://picsum.photos/200/200?random=84',
        score: 4.6,
        avgPrice: 35,
        tags: ['统一标价', '多种选择', '夜市文化']
      }
    ],
    reportTypes: ['隐性消费', '价格欺诈', '虚假宣传', '强制消费', '服务态度差', '其他'],
    reportTypeIndex: 0,
    reportForm: {
      merchant: '',
      type: '',
      desc: ''
    }
  },

  inputMerchant(e) {
    this.setData({ 'reportForm.merchant': e.detail.value })
  },

  selectType(e) {
    const index = parseInt(e.detail.value)
    this.setData({
      reportTypeIndex: index,
      'reportForm.type': this.data.reportTypes[index]
    })
  },

  inputDesc(e) {
    this.setData({ 'reportForm.desc': e.detail.value })
  },

  submitReport() {
    const { reportForm, reportTypes, reportTypeIndex } = this.data

    if (!reportForm.merchant.trim()) {
      wx.showToast({ title: '请输入商家名称', icon: 'none' })
      return
    }
    if (!reportForm.desc.trim()) {
      wx.showToast({ title: '请输入问题描述', icon: 'none' })
      return
    }

    wx.showLoading({ title: '提交中...' })

    // 模拟提交
    setTimeout(() => {
      wx.hideLoading()
      wx.showModal({
        title: '提交成功',
        content: '您的举报已收到，平台将在24小时内核实处理。如涉及消费损失，赔付基金将为您兜底。',
        showCancel: false,
        success: () => {
          this.setData({
            reportForm: { merchant: '', type: '', desc: '' },
            reportTypeIndex: 0
          })
        }
      })
    }, 1500)
  }
})
