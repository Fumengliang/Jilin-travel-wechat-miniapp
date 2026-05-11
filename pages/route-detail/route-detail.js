const routes = require('../../data/routes.js');
const app = getApp()

// ====================== 火山方舟 API 配置（上我寝室来拿这三个字段！）======================
const API_KEY = "ark"; 
const API_URL = "http";
const MODEL_ID = "ep"; 
// ==============================================================

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
    const routeData = routes.find(item => item.id == id) || routes[0];
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
            hh = parseInt(hh) + h;
            hh = hh % 24;
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
    const userInput = this.data.userInput || "";
    const oldMessages = this.data.messages || [];

    if (!userInput.trim()) return;

    const tempMessages = JSON.parse(JSON.stringify(oldMessages));
    tempMessages.push({
      role: "user",
      content: userInput.trim()
    });

    this.setData({
      messages: tempMessages,
      userInput: "",
      isAIThinking: true
    });

    try {
      const aiRaw = await this.callAI(tempMessages);
      let aiRes;
      try {
        aiRes = JSON.parse(aiRaw);
      } catch (e) {
        aiRes = { reply: "收到，我帮你调整行程～" };
      }

      const finalMessages = JSON.parse(JSON.stringify(tempMessages));
      finalMessages.push({
        role: "assistant",
        content: aiRes.reply || "好的～"
      });

      this.setData({
        messages: finalMessages,
        isAIThinking: false
      });

      if (aiRes.commands) {
        this.executePlanChange(aiRes.commands);
      }

    } catch (e) {
      const finalMessages = JSON.parse(JSON.stringify(tempMessages));
      finalMessages.push({
        role: "assistant",
        content: "网络有点波动，你再发一次就行～"
      });
      this.setData({
        messages: finalMessages,
        isAIThinking: false
      });
    }

    // --------------------------
    // ✅ 修复：滚动放到正确位置
    // --------------------------
    setTimeout(() => {
      wx.createSelectorQuery().select('.ai-messages').node((res) => {
        if (res.node) {
          res.node.scrollTop = 99999;
        }
      }).exec();
    }, 300);
  },

  callAI(messageHistory) {
    const route = this.data.route;
    const currentSchedule = this.data.currentSchedule;

    const routeIdentity = `当前路线ID：${route.id}，路线名称：${route.name}`;

    let scheduleText = "当日行程：\n";
    currentSchedule.forEach(day => {
      scheduleText += `第${day.dayNum}天：`;
      day.nodes.forEach(item => {
        scheduleText += `${item.time} ${item.name}；`;
      });
      scheduleText += "\n";
    });

    const systemPrompt = `
你是专属行程调整助手，只输出严格JSON，不要多余解释、不要废话。
${routeIdentity}
${scheduleText}

支持三种指令：
1. skip：跳过指定景点
2. delay：给指定景点往后推迟N小时，必须精确计算，如09:00推迟1小时=10:00，不能乱改时间
3. replace：把原有景点替换成新景点

固定输出格式：
{"reply":"简短口语回复","commands":[{"action":"skip/delay/replace","target":"景点名","hours":"数字","from":"原景点","to":"替换景点"}]}
仅输出JSON，无其他文字。
    `.trim();

    return new Promise((resolve, reject) => {
      wx.request({
        url: API_URL,
        method: "POST",
        header: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        data: {
          model: MODEL_ID,
          messages: [
            { role: "system", content: systemPrompt },
            ...messageHistory
          ],
          temperature: 0.05,
          max_tokens: 1024
        },
        success: res => {
          if (res.statusCode === 200 && res.data?.choices?.[0]?.message) {
            resolve(res.data.choices[0].message.content.trim());
          } else {
            reject("AI返回格式异常");
          }
        },
        fail: err => reject(err)
      });
    });
  },

  toggleAIPanel() {
    this.setData({ aiPanelOpen: !this.data.aiPanelOpen });
  },

  onInputChange(e) {
    this.setData({ userInput: e.detail.value });
  },

  showHotels() { wx.showModal({ title: "酒店", content: "万达、温泉酒店、民宿" }) },
  showFoods() { wx.showModal({ title: "美食", content: "冷面、人参鸡、温泉蛋" }) },
  showTransport() { wx.showModal({ title: "交通", content: "大巴+包车" }) },
  showSpots() { wx.showModal({ title: "景点", content: "天池、瀑布、温泉、滑雪" }) },
  addToItinerary() {
    // 拿到当前路线
    const currentRoute = this.data.route;
  
    // 从本地拿已保存的行程
    let savedList = wx.getStorageSync('myItinerary') || [];
  
    // 防重复添加
    const exists = savedList.some(item => item.id === currentRoute.id);
    if (exists) {
      wx.showToast({ title: "已经在行程里啦", icon: "none" });
      return;
    }
  
    // 加入
    savedList.push(currentRoute);
  
    // 存回本地
    wx.setStorageSync('myItinerary', savedList);
  
    // 提示成功
    wx.showToast({ title: "已加入我的行程", icon: "success" });
  },
  applyAction() { }
});