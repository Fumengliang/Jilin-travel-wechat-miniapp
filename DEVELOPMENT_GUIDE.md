# 吉林私旅管家 - 开发指南

## 一、环境准备

### 1. 安装微信开发者工具
- 下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
- 安装稳定版即可

### 2. 注册小程序账号
- 访问：https://mp.weixin.qq.com
- 注册并获取 AppID
- 将 AppID 填入 `project.config.json`

## 二、项目导入

1. 打开微信开发者工具
2. 选择「导入项目」
3. 选择项目文件夹 `jilin-travel-miniapp`
4. 填写 AppID
5. 点击「导入」

## 三、页面说明

### 首页 (pages/index)
- 顶部品牌展示
- 五大核心功能入口
- 痛点数据展示（基于113份问卷）

### 随心搜 (pages/search)
- 搜索框 + 热门关键词
- AI搜索动画效果
- 搜索结果列表（含匹配度）

### 精品路线 (pages/routes)
- 分类筛选（自然风光/人文历史/美食探店/城市漫步/冰雪主题）
- 路线卡片（含出片率、美食覆盖数）
- 点击进入详情

### 路线详情 (pages/route-detail)
- 顶部轮播图
- 路线信息统计
- 时间轴行程节点
- 美食推荐
- 底部加入行程按钮

### 动态行程 (pages/itinerary)
- 已添加的行程列表
- 推迟/跳过操作
- AI重规划提示

### 惊喜盲盒 (pages/blindbox)
- 分类：饰品/美食/非遗/门票
- 盲盒卡片展示
- 价格对比（原价vs现价）

### 透明消费 (pages/transparency)
- 三大保障说明
- 认证商家列表
- 消费举报表单
- 赔付基金数据

### 个人中心 (pages/profile)
- 用户信息
- 统计数据
- 功能菜单
- 客服入口

## 四、关键代码说明

### 全局样式变量 (app.wxss)
```css
--primary: #1a5f2a;      /* 吉林绿 */
--accent: #e8b923;       /* 金色点缀 */
--bg: #f5f7f4;           /* 背景色 */
```

### 数据存储
- 行程数据：`wx.getStorageSync('myItinerary')`
- 搜索历史：`wx.getStorageSync('searchHistory')`
- 用户信息：`wx.getStorageSync('userInfo')`

### API封装 (utils/api.js)
已预留所有接口，只需替换 BASE_URL 即可对接后端。

## 五、待办清单

### 高优先级
- [ ] 替换所有占位图片为实际景点照片
- [ ] 准备 tabBar 图标（5组，每组含普通/选中状态）
- [ ] 对接后端 API（替换 utils/api.js 中的 BASE_URL）
- [ ] 配置微信小程序 AppID

### 中优先级
- [ ] 接入微信支付（盲盒购买）
- [ ] 接入微信登录获取用户信息
- [ ] 接入地图导航功能
- [ ] 增加分享功能

### 低优先级
- [ ] 增加加载骨架屏
- [ ] 增加下拉刷新/上拉加载
- [ ] 增加页面转场动画
- [ ] 适配深色模式

## 六、图片资源清单

需要准备的图片（建议尺寸）：

| 位置 | 文件名 | 尺寸建议 | 说明 |
|------|--------|----------|------|
| tabBar | home.png / home-active.png | 81x81px | 首页图标 |
| tabBar | route.png / route-active.png | 81x81px | 路线图标 |
| tabBar | plan.png / plan-active.png | 81x81px | 行程图标 |
| tabBar | box.png / box-active.png | 81x81px | 盲盒图标 |
| tabBar | user.png / user-active.png | 81x81px | 我的图标 |
| 默认头像 | default-avatar.png | 200x200px | 未登录头像 |
| 景点图片 | 多张 | 800x600px | 各景点高清图 |
| 美食图片 | 多张 | 400x400px | 各美食图片 |
| 商家Logo | 多张 | 200x200px | 商家头像 |

图片存放路径：`images/` 文件夹（需手动创建）

## 七、配色方案

```
主色：#1a5f2a（吉林绿）
辅色：#2d8a3e（浅绿）
点缀：#e8b923（金色）
背景：#f5f7f4（米白）
卡片：#ffffff（纯白）
文字：#333333（深灰）
次要文字：#666666（中灰）
提示文字：#999999（浅灰）
价格：#e64340（红色）
成功：#07c160（绿色）
```

## 八、常见问题

**Q: 为什么图片显示不出来？**
A: 当前使用 picsum.photos 占位图，需替换为实际图片或上传到腾讯云COS。

**Q: 如何对接后端？**
A: 修改 `utils/api.js` 中的 BASE_URL，并实现对应接口即可。

**Q: 如何发布上线？**
A: 在微信开发者工具中点击「上传」，然后在微信公众平台提交审核。

## 九、联系方式

- 负责人：胡栩萌
- 学校：吉林警察学院
- 电话：18844283565
