(function() {
  // ----- 搜索引擎配置 -----
  const ENGINE_STORAGE_KEY = 'homepage-engine'; // 记住上次使用的搜索引擎
  const ENGINES = {
    google: {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
      icon: 'fab fa-google',
      placeholder: 'Google 搜索'
    },
    bing: {
      name: 'Bing',
      url: 'https://www.bing.com/search?q=',
      icon: 'fab fa-microsoft',
      placeholder: 'Bing 搜索'
    },
    baidu: {
      name: '百度',
      url: 'https://www.baidu.com/s?wd=',
      icon: 'fa-solid fa-paw',
      placeholder: '百度搜索'
    },
    yandex: {
      name: 'Yandex',
      url: 'https://yandex.com/search/?text=',
      icon: 'fab fa-yandex',
      placeholder: 'Yandex 搜索'
    },
    sogou: {
      name: '搜狗',
      url: 'https://www.sogou.com/web?query=',
      icon: 'fa-solid fa-dog',
      placeholder: '搜狗搜索'
    },
    so360: {
      name: '360',
      url: 'https://www.so.com/s?q=',
      icon: 'fa-solid fa-shield',
      placeholder: '360搜索'
    },
    github: {
      name: 'GitHub',
      url: 'https://github.com/search?q=',
      icon: 'fa-brands fa-github',
      placeholder: 'GitHub 搜索'
    }
  };

  // ----- 常用网站数据 (图标使用fontawesome 6 免费版) -----
  // 模板：{ name: '', url: '', icon: '', color: ''},
  const SITES = [
    // 社交娱乐
    { name: '微信', url: 'https://weixin.qq.com/', icon: 'fa-brands fa-weixin', color: '#07C160' },
    { name: 'QQ', url: 'https://im.qq.com/', icon: 'fa-brands fa-qq', color: '#00A1D6' },
    { name: '微博', url: 'https://weibo.com', icon: 'fab fa-weibo', color: '#e6162d' },
    { name: '抖音', url: 'https://www.douyin.com', icon: 'fa-brands fa-tiktok', color: '#000000' },
    { name: '快手', url: 'https://www.kuaishou.com/', icon: 'fa-solid fa-play-circle', color: '#FF2442' },
    { name: 'bilibili', url: 'https://www.bilibili.com', icon: 'fa-brands fa-bilibili', color: '#fb7299' },
    { name: 'X', url: 'https://x.com/', icon: 'fa-brands fa-x', color: '#000000'},
    // 邮箱通讯
    { name: '网易邮箱', url: 'https://mail.163.com/', icon: 'fa-solid fa-envelope', color: '#FF7D00'},
    { name: 'QQ邮箱', url: 'https://mail.qq.com/', icon: 'fa-solid fa-envelope', color: '#00A1D6'},
    // 音乐
    { name: '网易云音乐', url: 'https://music.163.com', icon: 'fa-solid fa-compact-disc', color: '#E60026' },
    { name: 'QQ音乐', url: 'https://y.qq.com', icon: 'fa-solid fa-headphones', color: '#1ED760' },
    { name: '酷狗音乐', url: 'https://kugou.com', icon: 'fa-solid fa-music', color: '#1E90FF' },
    // 购物
    { name: '淘宝', url: 'https://www.taobao.com', icon: 'fa-solid fa-shopping-bag', color: '#FF4400' },
    { name: '京东', url: 'https://www.jd.com', icon: 'fa-solid fa-store', color: '#E31D1A' },
    { name: '拼多多', url: 'https://www.pinduoduo.com/', icon: 'fa-solid fa-gem', color: '#E02020'},
    { name: '闲鱼', url: 'https://2.taobao.com/', icon: 'fa-solid fa-tag', color: '#7B7B7B'},
    { name: '藏宝阁', url: 'https://cbg.163.com/', icon: 'fa-solid fa-box-open', color: '#E6A23C'},
    // AI工具
    { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'fa-solid fa-comments', color: '#10A37F' },
    { name: 'deepseek', url: 'https://www.deepseek.com', icon: 'fa-solid fa-fish', color: '#1677FF'},
    { name: '豆包', url: 'https://www.doubao.com', icon: 'fa-solid fa-robot', color: '#0066FF'},
    { name: 'Gemini', url: 'https://gemini.google.com/', icon: 'fa-solid fa-wand-magic-sparkles', color: '#4285F4'},
    { name: 'Grok', url: 'https://grok.x.ai/', icon: 'fa-solid fa-robot', color: '#000000'},
    // 开发科技
    { name: 'GitHub', url: 'https://github.com/', icon: 'fa-brands fa-github', color: '#171515'},
    // 用字母 G 模拟 Gitee 官方图标
    { name: 'Gitee', url: 'https://gitee.com/', icon: 'G', color: '#C71D23'},
    { name: 'Apple', url: 'https://www.apple.com.cn', icon: 'fa-brands fa-apple', color: '#000000'},
    { name: 'iCloud', url: 'https://www.icloud.com.cn', icon: 'fa-solid fa-cloud', color: '#007AFF'},
    { name: '微软', url: 'https://www.microsoft.com/zh-cn', icon: 'fa-brands fa-microsoft', color: '#00A4EF'},
    { name: '晨钟酱工具', url: 'https://jamcz.com/', icon: 'fa-brands fa-android', color: '#3DDC84'},
    // 游戏相关
    { name: '苦力怕论坛', url: 'https://klpbbs.com/', icon: 'fa-solid fa-cube', color: '#D0C5C0'},
    { name: '手柄检测', url: 'https://www.9slab.com/gamepad/home', icon: 'fa-solid fa-gamepad', color: '#E64A19'},
    { name: '网易游戏充值助手', url: 'https://pay.ds.163.com/', icon: 'fa-solid fa-coins', color: '#FF7D00'},
    { name: '极地游戏', url: 'https://jidiyouxi.com/', icon: 'fa-solid fa-gamepad', color: '#6366F1'},
    // 实用工具
    { name: '高德地图', url: 'https://amap.com', icon: 'fa-solid fa-map-location-dot', color: '#00B4FF'},
    { name: '蓝奏云', url: 'https://lanzou.com/', icon: 'fa-solid fa-cloud', color: '#4C78FC'},
    { name: '毒蘑菇性能测试', url: 'https://toolwa.com/vsbm/', icon: 'fa-solid fa-microchip', color: '#4CAF50'},
    { name: '噼咔', url: 'https://manhuapica.com/plogin/', icon: 'fa-solid fa-book-open-reader', color: '#F56C6C'},
    { name: '思迅商云', url: 'https://saas.sixun.com.cn/Account/Login#/flowRpt/list', icon: 'fa-solid fa-cash-register', color: '#409EFF'},
    // 其他
    { name: '旧导航', url: 'jiu.html', icon: 'fa-regular fa-compass', color: '#1677FF'},
  ];

  // ----- 局域网链接数据 -----
  const LAN_SITES = [
    { name: '路由后台', url: 'http://192.168.100.1', icon: 'fa-solid fa-server', color: '#ff9900' },
    { name: '光猫后台', url: 'http://192.168.1.1', icon: 'fa-solid fa-network-wired', color: '#409EFF'},
    { name: '飞牛NAS', url: 'http://192.168.100.3', icon: 'fa-solid fa-server', color: '#1890FF'},
  ];

  // ----- 获取DOM元素 -----
  const engineSwitcher = document.getElementById('engineSwitcher');
  const engineBtns = document.querySelectorAll('.engine-btn');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const linksGrid = document.getElementById('linksGrid');
  const lanLinks = document.getElementById('lanLinks');
  const greetingSpan = document.getElementById('greetingMsg');
  const clockDiv = document.getElementById('liveClock');

  // 当前选中的搜索引擎（初始化时由 setActiveEngine 设置）
  let currentEngine = 'bing';

  // ----- 1. 渲染网址网格 -----
  function renderLinks() {
    let htmlStr = '';
    SITES.forEach(site => {

      // 图标类名（如 "fa-brands fa-weixin"、"fab fa-weibo"）渲染 <i>，其余当文字图标处理
      let iconContent = '';
      if (/^fa[bsdrl]?[-\s]/.test(site.icon)) {

        // 图标类名：渲染 <i> 标签，颜色通过 CSS 变量 --c 传入
        iconContent = `<i class="${site.icon}" style="--c: ${site.color};"></i>`;
      } else {

        // 文字图标：渲染 .site-emoji，样式统一写在 CSS 里
        iconContent = `<span class="site-emoji" style="--c: ${site.color};">${site.icon}</span>`;
      }

      htmlStr += `
        <a href="${site.url}" class="glass-tile link-item">
          ${iconContent}
          <span class="site-name">${site.name}</span>
        </a>
      `;
    });
    linksGrid.innerHTML = htmlStr;
  }

  // ----- 1b. 渲染局域网链接面板 -----
  function renderLanLinks() {
    let htmlStr = '';
    LAN_SITES.forEach(site => {
      const iconContent = `<i class="${site.icon}" style="--c: ${site.color};"></i>`;
      htmlStr += `
        <a href="${site.url}" class="glass-tile lan-link-item">
          ${iconContent}
          <span class="site-name">${site.name}</span>
        </a>
      `;
    });
    lanLinks.innerHTML = htmlStr;
  }

  // ----- 判断输入是否为网址或 IP，是则返回完整 URL（带协议），否则返回 null -----
  function getDirectUrl(input) {
    const str = input.trim();
    if (str === '') return null;

    // 如果已包含协议，直接返回
    if (str.startsWith('http://') || str.startsWith('https://')) {
      return str;
    }

    // IPv4 地址（可选端口）
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/;
    if (ipv4Pattern.test(str)) {
      return 'http://' + str;
    }

    // localhost（可选端口）
    const localhostPattern = /^localhost(:\d+)?$/i;
    if (localhostPattern.test(str)) {
      return 'http://' + str;
    }

    // 域名（必须包含点，合法字符，顶级域至少2位字母/数字，但不仅限字母），默认按 https 访问
    const domainPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?$/;
    if (domainPattern.test(str)) {
      return 'https://' + str;
    }

    // 不是网址/IP
    return null;
  }

  // ----- 2. 更新搜索引擎高亮 及 placeholder -----
  function setActiveEngine(engineKey) {
    const engine = ENGINES[engineKey];
    if (!engine) return;
    // 移除所有active，再给对应按钮添加
    engineBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.engine-btn[data-engine="${engineKey}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    searchInput.placeholder = engine.placeholder;
    currentEngine = engineKey;
    // 记住用户的选择，刷新后仍然生效
    try {
      localStorage.setItem(ENGINE_STORAGE_KEY, engineKey);
    } catch (err) { /* localStorage 不可用时忽略 */ }
  }

  // ----- 3. 搜索引擎点击事件绑定 -----
  engineBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const engine = btn.dataset.engine; // google / bing / baidu / yandex / sogou / so360
      if (engine && ENGINES[engine]) {
        setActiveEngine(engine);
      }
    });
  });

  // ----- 4. 搜索提交逻辑（按当前引擎打开；网址/IP 直接访问） -----
  function performSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) {
      searchInput.focus();
      return;
    }
    const directUrl = getDirectUrl(trimmed); // 判断是否网址/IP
    const engine = ENGINES[currentEngine];
    if (!engine) return;
    // 用 href 而非 replace：保留历史记录，从结果页按返回可回到主页
    window.location.href = directUrl || engine.url + encodeURIComponent(trimmed);
  }

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch(searchInput.value);
  });

  // ----- 5. 动态问候 & 实时时钟 -----
  function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = '晚上好';
    if (hour < 5) greeting = '夜深了';
    else if (hour < 12) greeting = '上午好';
    else if (hour < 18) greeting = '下午好';
    greetingSpan.textContent = `✨ ${greeting}，探索者`;
  }

  let clockTimer = null;
  let lastHour = -1;

  function tickClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockDiv.textContent = `${hours}:${minutes}:${seconds}`;
    // 跨小时时刷新问候语，省去单独的小时定时器
    if (now.getHours() !== lastHour) {
      lastHour = now.getHours();
      updateGreeting();
    }
    // 对齐到下一个整秒，避免 setInterval 的累积漂移
    clockTimer = setTimeout(tickClock, 1000 - now.getMilliseconds());
  }

  function startClock() {
    clearTimeout(clockTimer);
    lastHour = -1; // 强制立刻刷新问候语
    tickClock();
  }

  // 页面切到后台时停表省电，回到前台立即校正时间
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(clockTimer);
    } else {
      startClock();
    }
  });

  startClock();

  // ----- 6. 初始化：渲染数据并恢复上次使用的搜索引擎 -----
  renderLinks();
  renderLanLinks();

  // 优先读取上次选择，无记录（或该引擎已被删除）时回落到默认的必应
  let initialEngine = 'bing';
  try {
    const savedEngine = localStorage.getItem(ENGINE_STORAGE_KEY);
    if (savedEngine && ENGINES[savedEngine]) initialEngine = savedEngine;
  } catch (err) { /* 隐私模式等场景下 localStorage 不可用，忽略 */ }
  setActiveEngine(initialEngine);

  // 桌面端自动聚焦搜索框（移动端不聚焦，避免自动弹出软键盘）
  if (window.matchMedia('(pointer: fine)').matches) {
    searchInput.focus();
  }
})();