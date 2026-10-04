# Chrome-Home 浏览器主页

一个零依赖的浏览器起始页 / 新标签页导航，采用液态玻璃（毛玻璃）视觉风格，使用原生 HTML + CSS + JavaScript 实现，无需构建工具，双击即可运行。

## 功能特性

### 动态问候 & 实时时钟
- 根据当前小时显示问候语：夜深了（0–4 点）、上午好（5–11 点）、下午好（12–17 点）、晚上好（18 点以后）。
- 时钟对齐到下一个整秒刷新（`setTimeout` 校正），避免累积漂移；跨小时自动更新问候语。
- 页面切到后台时停表省电，回到前台立即校正时间。

### 搜索引擎切换
- 内置 7 个搜索引擎，点击胶囊按钮即切换，并同步更新搜索框占位提示。
- 选择会写入 `localStorage`（键名 `homepage-engine`），刷新后自动恢复；无记录时回落到默认的 Bing。

| 键名 | 名称 | 搜索地址 |
| --- | --- | --- |
| `bing` | Bing（默认） | `https://www.bing.com/search?q=` |
| `google` | Google | `https://www.google.com/search?q=` |
| `baidu` | 百度 | `https://www.baidu.com/s?wd=` |
| `yandex` | Yandex | `https://yandex.com/search/?text=` |
| `sogou` | 搜狗 | `https://www.sogou.com/web?query=` |
| `so360` | 360 | `https://www.so.com/s?q=` |
| `github` | GitHub | `https://github.com/search?q=` |

### 智能搜索框
提交内容时先判断是否为网址/地址，是则直接跳转，否则用当前引擎搜索：

- 以 `http://` / `https://` 开头 → 原样打开；
- IPv4（可带端口，如 `192.168.1.1:8080`）→ 补 `http://` 打开；
- `localhost`（可带端口）→ 补 `http://` 打开；
- 合法域名（可带端口）→ 补 `https://` 打开；
- 其余内容 → 走当前搜索引擎。搜索时使用 `location.href` 跳转，保留历史记录，可从结果页返回主页。

### 快捷导航网格
由 `SITES` 数组动态渲染（约 38 个站点），按用途分组：

- 社交娱乐：微信、QQ、微博、抖音、快手、bilibili、X
- 邮箱通讯：网易邮箱、QQ 邮箱
- 音乐：网易云音乐、QQ 音乐、酷狗音乐
- 购物：淘宝、京东、拼多多、闲鱼、藏宝阁
- AI 工具：ChatGPT、deepseek、豆包、Gemini、Grok
- 开发科技：GitHub、Gitee、Apple、iCloud、微软、晨钟酱工具
- 游戏相关：苦力怕论坛、手柄检测、网易游戏充值助手、极地游戏
- 实用工具：高德地图、蓝奏云、毒蘑菇性能测试、噼咔、思迅商云
- 其他：旧导航

图标使用 Font Awesome 6 免费版类名；当 `icon` 不是 FA 类名时（如 Gitee 的 `G`），自动按文字图标样式渲染。

### 局域网面板
固定在左下角，内置 3 个内网入口：

| 名称 | 地址 |
| --- | --- |
| 路由后台 | `http://192.168.100.1` |
| 光猫后台 | `http://192.168.1.1` |
| 飞牛 NAS | `http://192.168.100.3` |

## 文件结构

```
Chrome-Home/
├── index.html      # 页面骨架：问候区、引擎切换、搜索框、导航网格、局域网面板
├── index_css.css   # 全部样式：毛玻璃卡片、网格布局、响应式与性能降级
└── index_js.js     # 全部逻辑：引擎配置、站点数据、搜索/时钟/渲染（IIFE，无依赖）
```

## 使用方法

1. 直接用浏览器打开 `index.html`（或部署到任意静态服务器/Pages）。
2. 设为浏览器主页或新标签页：使用 "New Tab Redirect" 等扩展指向该页面地址即可。

### 引用的外部资源

| 资源 | 说明 |
| --- | --- |
| Font Awesome 6.7.2（CDN） | 全部站点图标 |
| `index-imgs/yjs.ico` | 站点 favicon |
| `index-imgs/yjs.png` | 页面背景图（配合渐变叠底） |
| `jiu.html` | "旧导航"卡片的跳转目标 |

> 注意：当前目录中未包含 `index-imgs/` 目录与 `jiu.html`，部署时需补齐，否则图标、背景图与"旧导航"链接不可用。

## 自定义指南

### 添加快捷导航站点
编辑 [index_js.js](index_js.js) 中的 `SITES` 数组，按模板追加：

```js
{ name: '名称', url: 'https://example.com', icon: 'fa-solid fa-star', color: '#4f46e5' },
```

- `icon` 为 Font Awesome 类名时渲染为图标；否则按纯文本渲染（如 `G`）。
- `color` 通过 CSS 变量 `--c` 注入，控制图标颜色。

### 添加搜索引擎
编辑 `ENGINES` 对象新增条目（`name` / `url` / `icon` / `placeholder`），并在 [index.html](index.html) 的 `.engine-switcher` 中加一个对应 `data-engine` 的按钮即可。

### 修改局域网入口
编辑 `LAN_SITES` 数组，格式与 `SITES` 相同。

## 视觉与性能细节

- **液态玻璃**：卡片使用多层渐变 + `backdrop-filter: blur(18px) saturate(200%)`，配合 `::before` 高光层与 `::after` 渐变描边；hover 时上浮放大并增强高光。
- **过渡优化**：只对 `transform` / `border-color` / `box-shadow` 做过渡，避免 `transition: all` 的开销。
- **响应式**：
  - ≤ 600px：卡片与按钮尺寸收紧，网格固定 4 列，局域网面板贴边；同时缩小或关闭部分 `backdrop-filter`、改用高强度纯色背景，降低移动端模糊开销。
  - ≤ 400px：网格改为 3 列。
- **桌面端自动聚焦搜索框**（`pointer: fine` 时），移动端不聚焦以避免弹出软键盘。

## 浏览器要求

- 需要支持 `backdrop-filter` 的现代浏览器（Chrome 76+、Edge 79+、Firefox 103+、Safari 9+），否则毛玻璃会退化为半透明背景，功能不受影响。
- `localStorage` 在隐私模式下不可用时，引擎记忆功能自动降级为默认值，不影响其他功能。