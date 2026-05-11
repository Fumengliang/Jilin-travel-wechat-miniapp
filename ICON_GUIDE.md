# TabBar 图标资源说明

## 需要准备的图标文件

在 `images/` 文件夹（需手动创建）中放置以下图标：

### 1. 首页图标
- `home.png` - 未选中状态
- `home-active.png` - 选中状态

### 2. 路线图标
- `route.png` - 未选中状态
- `route-active.png` - 选中状态

### 3. 行程图标
- `plan.png` - 未选中状态
- `plan-active.png` - 选中状态

### 4. 盲盒图标
- `box.png` - 未选中状态
- `box-active.png` - 选中状态

### 5. 我的图标
- `user.png` - 未选中状态
- `user-active.png` - 选中状态

### 6. 默认头像
- `default-avatar.png` - 用户未登录时的默认头像

## 图标规范

- **尺寸**: 81 x 81 px（微信官方推荐）
- **格式**: PNG
- **背景**: 透明
- **颜色**: 
  - 未选中：#999999（灰色）
  - 选中：#1a5f2a（吉林绿）

## 获取方式

1. **自己设计**: 使用 Figma / Sketch / AI 设计
2. **图标库**: 阿里巴巴矢量图标库 (iconfont.cn)
3. **AI生成**: 使用 Midjourney / Stable Diffusion 生成

## 路径配置

图标路径已在 `app.json` 中配置：
```json
"tabBar": {
  "list": [
    {
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "images/home.png",
      "selectedIconPath": "images/home-active.png"
    },
    ...
  ]
}
```

> ⚠️ 注意：如果不放图标，tabBar 会显示空白，但不影响功能使用。
