// utils/config.js
// 所有 API 密钥集中管理，方便切换环境

const CONFIG = {
  // 高德地图
  AMAP_KEY: '你的高德Key',           // 从 https://lbs.amap.com 申请
  
  // AI 平台（推荐 DeepSeek，便宜好用）
  DEEPSEEK_API_KEY: '你的DeepSeek Key',  // 从 https://platform.deepseek.com 申请
  DEEPSEEK_BASE_URL: 'https://api.deepseek.com',
  
  // 后端地址（暂时用空字符串，后续接入）
  BASE_URL: '',
  
  // 调试模式
  DEBUG: true
};

module.exports = CONFIG;