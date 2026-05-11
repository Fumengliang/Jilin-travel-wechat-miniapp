// 所有旅游路线数据
const routes = [
  // 1. 长白山深度游------你们就照着这个语法写
  {
    id: 1,
    name: "长白山深度游",
    desc: "3天2晚，玩转冰雪秘境，沉浸式感受北国风光。天池、长白瀑布、聚龙温泉、地下森林，每一处都是大自然的鬼斧神工。",
    cover: "/images/changbaishan/beijing.jpg",
    images: [
      "/images/changbaishan/beijing.jpg",
      "/images/changbaishan/tianchi.jpg",
      "/images/changbaishan/paibu.jpg",
      "/images/changbaishan/wenquan.jpg",
      "/images/changbaishan/xipo.jpg",
      "/images/changbaishan/huaxue.jpg",
      "/images/changbaishan/senlin.jpg",
      "/images/changbaishan/town.jpg"
    ],
    duration: "3天2晚",
    theme: "冰雪秘境",
    hotels: 5,
    foodCount: 12,
    transport: "大巴+包车",
    spots: 8,
    schedule: [
      {
        dayNum: 1, title: "抵达长白山 · 北坡探秘", nodes: [
          { time: "08:00", name: "长白山北景区", desc: "乘坐环保车进入景区", image: "/images/changbaishan/beijing.jpg", skipped: false },
          { time: "10:30", name: "天池", desc: "中国最高火山湖", image: "/images/changbaishan/tianchi.jpg", skipped: false },
          { time: "14:00", name: "长白瀑布", desc: "68米高差冰瀑", image: "/images/changbaishan/paibu.jpg", skipped: false },
          { time: "16:30", name: "聚龙温泉", desc: "雪中泡汤", image: "/images/changbaishan/wenquan.jpg", skipped: false }
        ]
      },
      { 
        dayNum: 2, title: "西坡揽胜 · 滑雪体验", nodes: [
          { time: "09:00", name: "长白山西坡", desc: "1442级台阶", image: "/images/changbaishan/xipo.jpg", skipped: false },
          { time: "13:00", name: "万达滑雪场", desc: "粉雪天堂", image: "/images/changbaishan/huaxue.jpg", skipped: false }
        ]
      },
      {
        dayNum: 3, title: "地下森林 · 返程", nodes: [
          { time: "09:00", name: "地下森林", desc: "火山口原始森林", image: "/images/changbaishan/senlin.jpg", skipped: false },
          { time: "12:00", name: "二道白河镇", desc: "朝鲜族美食", image: "/images/changbaishan/town.jpg", skipped: false }
        ]
      }
    ],
    foods: [
      { name: "朝鲜族冷面", desc: "荞麦面配牛肉汤", price: "¥25", image: "/images/changbaishan/food1.jpg" },
      { name: "人参鸡", desc: "滋补养生", price: "¥128", image: "/images/changbaishan/food2.jpg" },
      { name: "温泉蛋", desc: "聚龙温泉煮蛋", price: "¥10/3个", image: "/images/changbaishan/food3.jpg" }
    ]
  },

  // 2. 延吉风情游
  {
    id: 2,
    name: "延吉风情游",
    desc: "2天1晚，体验朝鲜族民俗、网红美食、延边大学网红墙、参花街、西市场，感受边境城市独特风情。",
    images: [
      "/images/yanji/cover1.jpg",
      "/images/yanji/cover2.jpg",
      "/images/yanji/cover3.jpg"
    ],
    duration: "2天1晚",
    theme: "朝鲜族风情",
    hotels: 2,
    foodCount: 15,
    transport: "步行/打车",
    spots: 6,
    schedule: [
      {
        dayNum: 1, title: "延吉市区深度体验", nodes: [
          { time: "10:00", name: "延边大学网红墙", desc: "网红打卡", image: "/images/yanji/univ.jpg", skipped: false },
          { time: "12:00", name: "参花街", desc: "韩式街道", image: "/images/yanji/shenhua.jpg", skipped: false },
          { time: "14:00", name: "延吉西市场", desc: "特色小吃", image: "/images/yanji/market.jpg", skipped: false },
          { time: "18:00", name: "韩式烤肉", desc: "晚餐", image: "/images/yanji/bbq.jpg", skipped: false }
        ]
      },
      {
        dayNum: 2, title: "民俗文化体验", nodes: [
          { time: "09:00", name: "朝鲜族民俗园", desc: "韩服拍照", image: "/images/yanji/folk.jpg", skipped: false },
          { time: "13:00", name: "延吉公园", desc: "休闲散步", image: "/images/yanji/park.jpg", skipped: false }
        ]
      }
    ],
    foods: [
      { name: "韩式拌饭", desc: "经典延吉美食", price: "¥20", image: "/images/yanji/food1.jpg" },
      { name: "烤冷面", desc: "街头小吃", price: "¥8", image: "/images/yanji/food2.jpg" },
      { name: "米酒", desc: "朝鲜族米酒", price: "¥15", image: "/images/yanji/jiu.jpg" }
    ]
  }
];

// 导出
module.exports = routes;