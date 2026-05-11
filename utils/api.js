// API 封装模块
const BASE_URL = 'https://your-api-domain.com/api'

const request = (url, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wx.getStorageSync('token') || ''}`
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: reject
    })
  })
}

module.exports = {
  // 用户相关
  login: (code) => request('/user/login', 'POST', { code }),
  getUserInfo: () => request('/user/info'),

  // 路线相关
  getRoutes: (params) => request('/routes', 'GET', params),
  getRouteDetail: (id) => request(`/routes/${id}`),
  searchRoutes: (keyword) => request('/routes/search', 'GET', { keyword }),

  // 行程相关
  getItinerary: () => request('/itinerary'),
  addItinerary: (data) => request('/itinerary', 'POST', data),
  updateItinerary: (id, data) => request(`/itinerary/${id}`, 'PUT', data),
  deleteItinerary: (id) => request(`/itinerary/${id}`, 'DELETE'),

  // 盲盒相关
  getBlindboxes: (category) => request('/blindboxes', 'GET', { category }),
  buyBlindbox: (id) => request(`/blindboxes/${id}/buy`, 'POST'),

  // 透明保
  getMerchants: () => request('/merchants'),
  submitReport: (data) => request('/reports', 'POST', data),

  // 通用请求
  request
}
