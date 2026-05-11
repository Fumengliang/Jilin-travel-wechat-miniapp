// utils/ai.js
const CONFIG = require('./config.js');

/**
 * 调用 DeepSeek AI 生成旅行规划
 * @param {string} destination - 目的地，如"长白山"
 * @param {number} days - 天数
 * @param {string} budget - 预算档次：经济/舒适/豪华
 * @param {string} style - 旅行风格：自然/人文/美食/冒险
 */
async function generateItinerary(destination, days, budget, style) {
  const prompt = `你是"吉林私旅管家"的AI旅行规划师。请为前往${destination}的${days}天${budget}预算、偏好${style}风格的旅行者，生成一份详细的行程规划。

要求：
1. 每天安排3-4个景点或活动
2. 包含具体的交通建议
3. 推荐当地特色美食
4. 给出实用的避坑提示
5. 用轻松友好的语气

请用JSON格式返回，结构如下：
{
  "title": "行程标题",
  "summary": "行程概要",
  "days": [
    {
      "day": 1,
      "theme": "当日主题",
      "spots": [
        {"name": "景点名", "time": "建议时长", "tips": "小贴士"}
      ],
      "meals": ["早餐推荐", "午餐推荐", "晚餐推荐"],
      "transport": "交通建议"
    }
  ],
  "budget": {"accommodation": "住宿预算", "food": "餐饮预算", "transport": "交通预算", "tickets": "门票预算"},
  "warnings": ["注意事项1", "注意事项2"]
}`;

  try {
    wx.showLoading({ title: 'AI规划中...' });
    
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `${CONFIG.DEEPSEEK_BASE_URL}/chat/completions`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONFIG.DEEPSEEK_API_KEY}`
        },
        data: {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: '你是一个专业的吉林旅行规划师，熟悉吉林省所有景点。' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        },
        success: resolve,
        fail: reject
      });
    });

    wx.hideLoading();

    if (res.statusCode === 200 && res.data.choices) {
      const content = res.data.choices[0].message.content;
      // 提取 JSON 部分
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { raw: content };
    } else {
      throw new Error(res.data?.error?.message || 'AI服务异常');
    }
  } catch (err) {
    wx.hideLoading();
    console.error('AI规划失败:', err);
    // 返回模拟数据，确保页面不崩溃
    return getMockItinerary(destination, days);
  }
}

// 模拟数据（AI 未配置或网络异常时使用）
function getMockItinerary(destination, days) {
  return {
    title: `${destination}${days}日游`,
    summary: `体验${destination}的自然风光与人文魅力`,
    days: Array.from({length: days}, (_, i) => ({
      day: i + 1,
      theme: i === 0 ? '初识' + destination : '深度探索',
      spots: [
        { name: destination + '核心景区', time: '3小时', tips: '建议早上去，人少景美' },
        { name: '当地特色村落', time: '2小时', tips: '可以品尝地道美食' }
      ],
      meals: ['东北大拉皮', '锅包肉', '朝鲜冷面'],
      transport: '建议包车或自驾'
    })),
    budget: { accommodation: '200-400元/晚', food: '100-150元/天', transport: '150元/天', tickets: '约300元' },
    warnings: ['注意保暖', '提前预订住宿']
  };
}

module.exports = {
  generateItinerary,
  getMockItinerary
};