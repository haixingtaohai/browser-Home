# browser-Home 浏览器主页

一个零依赖的浏览器起始页 / 新标签页导航，采用液态玻璃（毛玻璃）视觉风格，使用原生 HTML + CSS + JavaScript 实现，无需构建工具、不请求任何 CDN，双击即可离线运行。

## 功能特性

### 动态问候 & 实时时钟
- 根据当前小时显示问候语：夜深了（0–4 点）、上午好（5–11 点）、下午好（12–17 点）、晚上好（18 点以后），渲染为 `✨ {问候语}，探索者`。
- 时钟对齐到下一个整秒刷新（`setTimeout` 校正），避免累积漂移；跨小时时顺带刷新问候语，省掉一个独立的小时定时器。
- 页面切到后台时停表省电，回到前台立即校正时间。

### 搜索引擎切换
- 内置 7 个搜索引擎，点击胶囊按钮即切换，并同步更新搜索框占位提示。

| 键名 | 名称 | 搜索地址 |
| --- | --- | --- |
| `bing` | Bing（默认） | `https://www.bing.com/search?q=` |
| `google` | Google | `https://www.google.com/search?q=` |
| `baidu` | 百度 | `https://www.baidu.com/s?wd=` |
| `yandex` | Yandex | `https://yandex.com/search/?text=` |
| `sogou` | 搜狗 | `https://www.sogou.com/web?query=` |
| `so360` | 360 | `https://www.so.com/s?q=` |
| `github` | GitHub | `https://github.com/search?q=` |

- 选择会写入 `localStorage`（键名 `homepage-engine`），刷新后自动恢复；无记录或该引擎已删除时回落到默认的 Bing。

### 智能搜索框
提交内容时先判断是否为网址/地址，是则直接跳转，否则用当前引擎搜索：

- 以 `http://` / `https://` 开头 → 原样打开；
- IPv4（可带端口，如 `192.168.1.1:8080`）→ 补 `http://` 打开；
- `localhost`（可带端口）→ 补 `http://` 打开；
- 合法域名（可带端口）→ 补 `https://` 打开；
- 其余内容 → 走当前搜索引擎。搜索时使用 `location.href` 跳转，保留历史记录，可从结果页返回主页。

### 快捷导航网格
由 `SITES` 数组动态渲染（38 个站点），按用途分组：

- 社交娱乐：微信、QQ、微博、抖音、快手、bilibili、X
- 邮箱通讯：网易邮箱、QQ 邮箱
- 音乐：网易云音乐、QQ 音乐、酷狗音乐
- 购物：淘宝、京东、拼多多、闲鱼、藏宝阁
- AI 工具：ChatGPT、deepseek、豆包、Gemini、Grok
- 开发科技：GitHub、Gitee、Apple、iCloud、微软、晨钟酱工具
- 游戏相关：苦力怕论坛、手柄检测、网易游戏充值助手、极地游戏
- 实用工具：高德地图、蓝奏云、毒蘑菇性能测试、噼咔、思迅商云
- 其他：旧导航

每个卡片由一个 SVG 图标 + 名称组成，图标取 `icons/{icon}.svg`，用 `<img class="svg-icon">` 引入（`file://` 下 Chrome 会拦截 CSS mask 加载本地 SVG，因此不用 mask）。

### 局域网面板
固定在左下角，内置 3 个内网入口：

| 名称 | 地址 |
| --- | --- |
| 路由后台 | `http://192.168.100.1` |
| 光猫后台 | `http://192.168.1.1` |
| 飞牛NAS | `http://192.168.100.3` |

## 文件结构

```
browser-Home/
├── index.html      # 页面骨架：问候区、引擎切换、搜索框、导航网格、局域网面板
├── index_css.css   # 全部样式：毛玻璃卡片、网格布局、响应式与性能降级
├── index_js.js     # 全部逻辑：引擎配置、站点数据、搜索/时钟/渲染（IIFE，无依赖）
├── icons/          # 53 个 SVG 图标：站点图标 + 界面图标（ui-*，含搜索引擎图标）
└── README.md
```

## 使用方法

1. 直接用浏览器打开 `index.html`（或部署到任意静态服务器/Pages）。
2. 设为浏览器主页或新标签页：使用 "New Tab Redirect" 等扩展指向该页面地址即可。

### 依赖的资源

| 资源 | 说明 |
| --- | --- |
| `icons/*.svg` | 全部图标：站点图标、搜索引擎图标、界面图标（`ui-compass` / `ui-search` / `ui-star` / `ui-heart` / `ui-lan`） |
| `index-imgs/yjs.ico` | 站点 favicon（`index.html` 中引用） |
| `index-imgs/yjs.png` | 页面背景图（`index_css.css` 中引用，配合靛蓝径向渐变叠底） |
| `jiu.html` | "旧导航"卡片的跳转目标 |

> 注意：当前目录中未包含 `index-imgs/` 目录与 `jiu.html`，部署时需补齐，否则 favicon、背景图与"旧导航"链接不可用（背景会退化为纯渐变，不影响其他功能）。

### 更换图标颜色
图标颜色已写在各 SVG 文件内部，改色直接编辑 `icons/` 中对应的那个文件即可，CSS 不参与着色。唯一的例外是搜索引擎按钮的选中态：图片图标无法用 CSS 改色，因此用 `filter: brightness(0) invert(1)` 把图标刷成纯白。

## 自定义指南

### 添加快捷导航站点
1. 把图标放到 `icons/` 下（例如 `icons/example.svg`）。
2. 编辑 [index_js.js](index_js.js) 中的 `SITES` 数组，按模板追加：

```js
{ name: '名称', url: 'https://example.com', icon: 'example' },
```

- `icon` 写 `icons/` 下的文件名（不带 `.svg` 扩展名）。

### 添加搜索引擎
编辑 `ENGINES` 对象新增条目（`name` / `url` / `icon` / `placeholder`），并在 [index.html](index.html) 的 `.engine-switcher` 中加一个对应 `data-engine` 的按钮（图标同样指向 `icons/` 下的 SVG）即可。

### 修改局域网入口
编辑 `LAN_SITES` 数组，格式与 `SITES` 相同。

## 视觉与性能细节

- **液态玻璃**：`.glass-card` 半透明白底 + `backdrop-filter: blur(20px) saturate(180%)`；卡片与局域网按钮共用的 `.glass-tile` 使用多层渐变 + `blur(18px) saturate(200%)`，配合 `::before` 高光层与 `::after` 渐变描边（`mask-composite` 挖空成 1px 边框），hover 时上浮放大并增强高光。
- **过渡优化**：只对真正变化的 `transform` / `border-color` / `box-shadow` 等属性做过渡，避免 `transition: all` 的开销。
- **图标尺寸**：`.svg-icon` 统一 `1em × 1em`，跟随所在元素的 `font-size` 缩放，无需为每个图标单独写尺寸。
- **响应式**：
  - 主卡片 `max-width: 1100px`，网格为 `repeat(auto-fill, minmax(100px, 1fr))` 自适应列数；局域网面板 `position: fixed` 固定在左下角。
  - ≤ 600px：卡片与按钮尺寸收紧，网格固定 4 列，局域网面板贴边；同时缩小主卡片模糊、关闭小卡片与面板的 `backdrop-filter` 并改用高强度纯色背景，降低移动端模糊开销。
  - ≤ 400px：网格改为 3 列。
- **桌面端自动聚焦搜索框**（`pointer: fine` 时），移动端不聚焦以避免弹出软键盘。

## 浏览器要求

- 需要支持 `backdrop-filter` 的现代浏览器（Chrome 76+、Edge 79+、Firefox 103+、Safari 9+），否则毛玻璃会退化为半透明背景，功能不受影响。
- 需要支持 ES6（`const` / 箭头函数 / 模板字符串）与 `localStorage`；`localStorage` 在隐私模式下不可用时，引擎记忆功能自动降级为默认值，不影响其他功能。
- 全程无网络请求（除站点跳转本身），可完全离线使用。
