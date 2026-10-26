# browser-Home 浏览器主页

一个零依赖的浏览器起始页 / 新标签页导航，采用液态玻璃（毛玻璃）视觉风格，使用原生 HTML + CSS + JavaScript 实现，无需构建工具、不请求任何 CDN，双击即可离线运行。页面带一段「罗盘启航」开屏动画。

## 功能特性

### 开屏动画（罗盘启航）
每次打开/刷新页面播放一次，约 0.9 秒完成主体动作、0.36 秒淡出，不拖慢进入主页的节奏：

1. 靛蓝色光环从 12 点方向顺时针扫出一整圈；
2. 毛玻璃球体弹入，罗盘指针从 -150° 回正并带一点回弹；
3. 一道镜面高光横掠球体；
4. 站名「凌ling妻」与副标题「探索 · 从这里开始」上浮浮现；
5. 开屏层淡出，主卡片与局域网面板轻微上浮入场。

- 全部动效由 CSS 关键帧完成，脚本只负责加播放态、控制淡出时机并在结束后 `remove()` 开屏节点——透明层不会残留参与合成或拦截点击。
- 纯白背景突出罗盘主视觉，元素颜色与主页同源（`#4f46e5` / `#c7d2fe` / `#a5b4fc`），衔接时靠淡出平滑过渡。
- 尊重系统「减弱动态效果」：`prefers-reduced-motion: reduce` 下动画瞬时完成，开屏层 120ms 后退场（脚本同步缩短等待）。
- 禁用 JavaScript 时由 `<noscript>` 样式直接隐藏开屏层，不会遮住页面。
- 想调快/调慢：同步修改 `index_css.css` 中 `.boot-splash.is-playing ...` 各条动画的时长与延迟，以及 `index_js.js` 里的 `INTRO_MS`（开始淡出的时间点）。
- 备选方案 B（液态汇聚）、C（搜索即达）保留在 `splash-preview.html` 中可对比，未接入正式页面。

### 动态问候 & 实时时钟
- 根据当前小时显示问候语：夜深了（0–4 点）、上午好（5–11 点）、下午好（12–17 点）、晚上好（18 点以后），渲染为 `✨ {问候语}，探索者`。
- 时钟对齐到下一个整秒刷新（`setTimeout` 校正），避免累积漂移；跨小时时顺带刷新问候语，省掉一个独立的小时定时器。
- 页面切到后台时停表省电，回到前台立即校正时间。

### 搜索引擎切换
- 内置 8 个搜索引擎，点击胶囊按钮即切换，并同步更新搜索框占位提示。

| 键名 | 名称 | 搜索地址 |
| --- | --- | --- |
| `bing` | Bing（默认） | `https://www.bing.com/search?q=` |
| `google` | Google | `https://www.google.com/search?q=` |
| `baidu` | 百度 | `https://www.baidu.com/s?wd=` |
| `yandex` | Yandex | `https://yandex.com/search/?text=` |
| `sogou` | 搜狗 | `https://www.sogou.com/web?query=` |
| `so360` | 360 | `https://www.so.com/s?q=` |
| `douyin` | 抖音 | `https://www.douyin.com/search/` |
| `github` | GitHub | `https://github.com/search?q=` |

- 抖音没有对外开放的搜索接口，官方规律是关键词直接拼在 `/search/` 路径里，因此该引擎配置了 `encode: false`，提交时用 `encodeURI` 而非 `encodeURIComponent` 编码（其余引擎均使用查询串 `?q=`，走 `encodeURIComponent`）。
- 选择会写入 `localStorage`（键名 `homepage-engine`），刷新后自动恢复；无记录或该引擎已删除时回落到默认的 Bing。

### 智能搜索框
提交内容时先判断是否为网址/地址，是则直接跳转，否则用当前引擎搜索：

- 以 `http://` / `https://` 开头 → 原样打开；
- IPv4（可带端口，如 `192.168.1.1:8080`）→ 补 `http://` 打开；
- `localhost`（可带端口）→ 补 `http://` 打开；
- 合法域名（可带端口）→ 补 `https://` 打开；
- 其余内容 → 走当前搜索引擎。搜索时使用 `location.href` 跳转，保留历史记录，可从结果页返回主页。

### 快捷导航网格
由 `SITES` 数组动态渲染（40 个站点），按用途分组：

- 社交娱乐：微信、QQ、微博、抖音、快手、bilibili、X
- 邮箱通讯：网易邮箱、QQ 邮箱
- 音乐：网易云音乐、QQ 音乐、酷狗音乐
- 购物：淘宝、京东、拼多多、闲鱼、藏宝阁
- AI 工具：ChatGPT、deepseek、豆包、Gemini、Grok
- 开发科技：GitHub、Gitee、Apple、iCloud、微软、晨钟酱工具
- 游戏相关：苦力怕论坛、手柄检测、网易游戏充值助手、极地游戏
- 实用工具：高德地图、百度地图、腾讯地图、蓝奏云、毒蘑菇性能测试、噼咔、思迅商云
- 其他：旧导航

每个卡片由一个 SVG 图标 + 名称组成，图标取 `icons/{icon}.svg`，用 `<img class="svg-icon">` 引入（`file://` 下 Chrome 会拦截 CSS mask 加载本地 SVG，因此不用 mask）。

其中 **deepseek** 卡片带子入口，见下方「子入口气泡」。

### 局域网面板
固定在左下角，内置 3 个内网入口：

| 名称 | 地址 |
| --- | --- |
| 路由后台 | `http://192.168.100.1` |
| 光猫后台 | `http://192.168.1.1` |
| 飞牛NAS | `http://192.168.100.3` |

飞牛NAS 带两个子入口（飞牛音乐、飞牛相册），悬停卡片即展开。

### 子入口气泡（悬停展开）
站点数据里带 `sub` 数组的卡片，鼠标悬停后会在卡片正上方弹出一个玻璃气泡，里面是该站点的子入口：

| 卡片 | 子入口 |
| --- | --- |
| deepseek | 网页对话、API 开放平台 |
| 飞牛NAS | 飞牛音乐、飞牛相册 |

- 悬停 500ms 后展开，移开后 500ms 收起；两个计时器互相独立 —— 弹出前移开会取消弹出，收起前移回去会取消收起，鼠标轻微偏移不会立刻关掉。
- 键盘 Tab 到卡片时立即展开、移开立即收起（没有手抖问题，所以不延时）。
- 触摸设备不绑定该交互（`hover: none` 时直接跳过）：点按会触发收不掉的伪悬停，反而碍事；卡片本身的链接不受影响，照常可点。
- 每条子入口显示"名称 + 主机名"两行，主机名由 `new URL(url).host` 解析并去掉开头的 `www.`，解析失败时原样显示 —— 所以局域网服务的端口（`:5666`）也能直接看到。
- 子入口是纯文字的，不需要额外准备 SVG 图标。

## 文件结构

```
browser-Home/
├── index.html            # 页面骨架：开屏层、问候区、引擎切换、搜索框、导航网格、局域网面板
├── index_css.css         # 全部样式：开屏动画、毛玻璃卡片、网格布局、响应式与性能降级
├── index_js.js           # 全部逻辑：引擎配置、站点数据、搜索/时钟/渲染、开屏播放（IIFE，无依赖）
├── splash-preview.html   # 开屏动画预览页：A / B / C 三方案可切换重播（当前接入 A）
├── icons/                # 56 个 SVG 图标：站点图标 + 界面图标（ui-*，含搜索引擎图标）
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
// 基础卡片
{ name: '名称', url: 'https://example.com', icon: 'example' },

// 需要子入口时再加一个 sub（可选），悬停卡片后弹出气泡
{ name: '名称', url: 'https://example.com', icon: 'example',
  sub: [
    { name: '子入口一', url: 'https://a.example.com' },
    { name: '子入口二', url: 'https://b.example.com' },
  ] },
```

- `icon` 写 `icons/` 下的文件名（不带 `.svg` 扩展名）。
- `sub` 里只写 `name` + `url`，不配图标。
- 带 `sub` 的卡片会被 `.link-wrap` 多包一层，气泡是卡片的**兄弟节点**而不是子节点 —— HTML 里 `<a>` 不能嵌套 `<a>`，而气泡里的子入口本身也是链接。

### 添加搜索引擎
编辑 `ENGINES` 对象新增条目（`name` / `url` / `icon` / `placeholder`，可选 `encode`），并在 [index.html](index.html) 的 `.engine-switcher` 中加一个对应 `data-engine` 的按钮（图标同样指向 `icons/` 下的 SVG）即可。`encode` 默认按 `encodeURIComponent` 编码关键词，像抖音这类把关键词拼进路径的引擎需设为 `false`（改用 `encodeURI`）。

### 修改局域网入口
编辑 `LAN_SITES` 数组，格式与 `SITES` 完全相同（同样支持 `sub`）。

## 视觉与性能细节

- **开屏动画**：固定层 `z-index: 9999`，纯白背景；层次由环形扫光、球体投影与镜面高光提供；动作只用 `transform` / `opacity` / `stroke-dashoffset`，不触发布局与重绘；结束后节点被移除，不影响主页合成。
- **液态玻璃**：`.glass-card` 半透明白底 + `backdrop-filter: blur(20px) saturate(180%)`；卡片与局域网按钮共用的 `.glass-tile` 使用多层渐变 + `blur(18px) saturate(200%)`，配合 `::before` 高光层与 `::after` 渐变描边（`mask-composite` 挖空成 1px 边框），hover 时上浮放大并增强高光。
- **过渡优化**：只对真正变化的 `transform` / `border-color` / `box-shadow` 等属性做过渡，避免 `transition: all` 的开销。
- **图标尺寸**：`.svg-icon` 统一 `1em × 1em`，跟随所在元素的 `font-size` 缩放，无需为每个图标单独写尺寸。
- **子入口气泡**：`.sub-bubble` 绝对定位在卡片正上方（`bottom: calc(100% + 12px)`），半透明渐变底 + `backdrop-filter: blur(22px) saturate(190%) brightness(1.06)`，`::before` 做顶部镜面高光、`::after` 做指向卡片的尖角；默认 `opacity: 0` / `visibility: hidden`，加上 `.show-sub` 才淡入上浮，过渡 0.18s。网址网格与局域网面板共用同一套（`buildTile` 按类名区分卡片样式）。
- **响应式**：
  - 主卡片 `max-width: 1100px`，网格为 `repeat(auto-fill, minmax(100px, 1fr))` 自适应列数；局域网面板 `position: fixed` 固定在左下角。
  - ≤ 600px：卡片与按钮尺寸收紧，网格固定 4 列，局域网面板贴边；同时缩小主卡片模糊、关闭小卡片与面板的 `backdrop-filter` 并改用高强度纯色背景，降低移动端模糊开销。
  - ≤ 400px：网格改为 3 列。
- **桌面端自动聚焦搜索框**（`pointer: fine` 时），移动端不聚焦以避免弹出软键盘。

## 浏览器要求

- 需要支持 `backdrop-filter` 的现代浏览器（Chrome 76+、Edge 79+、Firefox 103+、Safari 9+），否则毛玻璃会退化为半透明背景，功能不受影响。
- 需要支持 ES6（`const` / 箭头函数 / 模板字符串 / `URL`）与 `localStorage`；`localStorage` 在隐私模式下不可用时，引擎记忆功能自动降级为默认值，不影响其他功能。
- 子入口气泡依赖 `hover` / `pointer` 媒体查询：触摸设备不绑定悬停展开，桌面端才自动聚焦搜索框。
- 全程无网络请求（除站点跳转本身），可完全离线使用。
