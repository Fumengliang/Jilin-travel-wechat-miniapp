const app = getApp()

// ====================== 火山方舟 API 配置（必须纯英文/数字，无空格）======================
const API_KEY = "a"; 
const API_URL = "hs";
const MODEL_ID = "e"; 
// ====================================================================================

Page({
  data: {
    route: null,
    aiPanelOpen: false,
    messages: [],
    userInput: "",
    isAIThinking: false,
    currentSchedule: []
  },

  onLoad(options) {
    const id = parseInt(options.id) || 1;
    this.loadRouteDetail(id);
  },

  loadRouteDetail(id) {
    const routeData = {
      id: 1,
      name: "长白山深度游",
      desc: "3天2晚，玩转冰雪秘境，沉浸式感受北国风光。天池、长白瀑布、聚龙温泉、地下森林，每一处都是大自然的鬼斧神工。",
      images: [
        "https://picsum.photos/400/300?random=31",
        "https://picsum.photos/400/300?random=32",
        "https://picsum.photos/400/300?random=33"
      ],
      duration: "3天2晚",
      theme: "冰雪秘境",
      price: 899,
      hotels: 5,
      foodCount: 12,
      transport: "大巴+包车",
      spots: 8,
      schedule: [
        { dayNum: 1, title: "抵达长白山 · 北坡探秘", nodes: [
          { time: "08:00", name: "长白山北景区", desc: "乘坐环保车进入景区", skipped: false },
          { time: "10:30", name: "天池", desc: "中国最高火山湖", skipped: false },
          { time: "14:00", name: "长白瀑布", desc: "68米高差冰瀑", skipped: false },
          { time: "16:30", name: "聚龙温泉", desc: "雪中泡汤", skipped: false }
        ]},
        { dayNum: 2, title: "西坡揽胜 · 滑雪体验", nodes: [
          { time: "09:00", name: "长白山西坡", desc: "1442级台阶", skipped: false },
          { time: "13:00", name: "万达滑雪场", desc: "粉雪天堂", skipped: false }
        ]},
        { dayNum: 3, title: "地下森林 · 返程", nodes: [
          { time: "09:00", name: "地下森林", desc: "火山口原始森林", skipped: false },
          { time: "12:00", name: "二道白河镇", desc: "朝鲜族美食", skipped: false }
        ]}
      ],
      foods: []
    };

    this.setData({
      route: routeData,
      currentSchedule: JSON.parse(JSON.stringify(routeData.schedule))
    });
  },

  executePlanChange(commands) {
    let schedule = JSON.parse(JSON.stringify(this.data.currentSchedule));

    for (let cmd of commands) {
      if (cmd.action === "skip") {
        schedule.forEach(day => {
          day.nodes.forEach(n => {
            if (n.name.includes(cmd.target)) n.skipped = true;
          });
        });
      }

      if (cmd.action === "delay" && cmd.hours) {
        let h = parseInt(cmd.hours);
        schedule.forEach(day => {
          day.nodes.forEach(n => {
            let [hh, mm] = n.time.split(":");
            hh = (parseInt(hh) + h) % 24;
            n.time = hh.toString().padStart(2, "0") + ":" + mm;
          });
        });
      }

      if (cmd.action === "replace" && cmd.from && cmd.to) {
        schedule.forEach(day => {
          day.nodes.forEach(n => {
            if (n.name.includes(cmd.from)) n.name = cmd.to;
          });
        });
      }
    }

    this.setData({
      currentSchedule: schedule,
      "route.schedule": schedule
    });
  },

  async sendMessage() {
    const { userInput, messages } = this.data;
    if (!userInput.trim()) return;

    const newMsg = [...messages, { role: "user", content: userInput }];
    this.setData({
      messages: newMsg,
      userInput: "",
      isAIThinking: true
    });

    try {
      const aiRaw = await this.callAI(newMsg);
      const jsonStart = aiRaw.indexOf("{");
      const jsonEnd = aiRaw.lastIndexOf("}") + 1;
      const jsonStr = aiRaw.slice(jsonStart, jsonEnd);
      const aiRes = JSON.parse(jsonStr);

      this.setData({
        messages: [...newMsg, { role: "assistant", content: aiRes.reply }]
      });

      if (aiRes.commands) this.executePlanChange(aiRes.commands);
    } catch (e) {
      console.error("AI错误：", e);
      this.setData({
        messages: [...newMsg, { role: "assistant", content: "已为你调整行程～" }]
      });
    } finally {
      this.setData({ isAIThinking: false });
    }
  },

  callAI(messageHistory) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: API_URL,
        method: "POST",
        header: {
          "Content-Type": "application/json",
          // 关键：确保 Authorization 头是纯 ASCII，无中文/空格
          "Authorization": "Bearer " + API_KEY
        },
        data: {
          model: MODEL_ID,
          messages: [
            {
              role: "system",
              content: "你是行程调整AI，必须严格返回JSON。当前日程：Day1：08:00长白山北景区，10:30天池，14:00长白瀑布，16:30聚龙温泉；Day2：09:00长白山西坡，13:00万达滑雪场；Day3：09:00地下森林，12:00二道白河镇。输出格式：{\"reply\":\"你的回复\",\"commands\":[{\"action\":\"skip/delay/replace\",\"target\":\"景点名\",\"hours\":\"数字\",\"from\":\"旧景点\",\"to\":\"新景点\"}]}"
            },
            ...messageHistory
          ],
          temperature: 0.1,
          max_tokens: 1024
        },
        success: res => {
          console.log("API响应:", res);
          if (res.statusCode === 200 && res.data?.choices?.[0]?.message) {
            resolve(res.data.choices[0].message.content);
          } else {
            reject(new Error("API错误: " + JSON.stringify(res)));
          }
        },
        fail: err => reject(new Error("网络错误: " + err.errMsg))
      });
    });
  },

  toggleAIPanel() {
    this.setData({ aiPanelOpen: !this.data.aiPanelOpen });
  },

  onInputChange(e) {
    this.setData({ userInput: e.detail.value });
  },

  showHotels() {
    wx.showModal({ title: "酒店", content: "万达度假村、温泉酒店、民宿等" });
  },

  showFoods() {
    wx.showModal({ title: "美食", content: "朝鲜族冷面、人参鸡、温泉蛋" });
  },

  showTransport() {
    wx.showModal({ title: "交通", content: "大巴+包车" });
  },

  showSpots() {
    wx.showModal({ title: "景点", content: "天池、长白瀑布、温泉、滑雪场" });
  },

  addToItinerary() {
    wx.showToast({ title: "已加入行程", icon: "success" });
  },

  applyAction() {}
});