(function() {
  // ----- 搜索引擎配置 -----
  const ENGINE_STORAGE_KEY = 'homepage-engine'; // 记住上次使用的搜索引擎
  const ENGINES = {
    google: {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
      icon: 'google',
      placeholder: 'Google 搜索'
    },
    bing: {
      name: 'Bing',
      url: 'https://www.bing.com/search?q=',
      icon: 'bing',
      placeholder: 'Bing 搜索'
    },
    baidu: {
      name: '百度',
      url: 'https://www.baidu.com/s?wd=',
      icon: 'baidu',
      placeholder: '百度搜索'
    },
    yandex: {
      name: 'Yandex',
      url: 'https://yandex.com/search/?text=',
      icon: 'yandex',
      placeholder: 'Yandex 搜索'
    },
    sogou: {
      name: '搜狗',
      url: 'https://www.sogou.com/web?query=',
      icon: 'sogou',
      placeholder: '搜狗搜索'
    },
    so360: {
      name: '360',
      url: 'https://www.so.com/s?q=',
      icon: 'so360',
      placeholder: '360搜索'
    },
    github: {
      name: 'GitHub',
      url: 'https://github.com/search?q=',
      icon: 'github-engine',
      placeholder: 'GitHub 搜索'
    }
  };

  // ----- 常用网站数据（图标为 icons/ 目录下的 SVG 文件名，不带扩展名） -----
  // 颜色已写入各 SVG 文件本身，要改色直接编辑 icons/ 里对应的那个文件
  // 模板：{ name: '', url: '', icon: '' },
  const SITES = [
    // 社交娱乐
    { name: '微信', url: 'https://weixin.qq.com/', icon: 'wechat' },
    { name: 'QQ', url: 'https://im.qq.com/', icon: 'qq' },
    { name: '微博', url: 'https://weibo.com', icon: 'weibo' },
    { name: '抖音', url: 'https://www.douyin.com', icon: 'douyin' },
    { name: '快手', url: 'https://www.kuaishou.com/', icon: 'kuaishou' },
    { name: 'bilibili', url: 'https://www.bilibili.com', icon: 'bilibili' },
    { name: 'X', url: 'https://x.com/', icon: 'x' },
    // 邮箱通讯
    { name: '网易邮箱', url: 'https://mail.163.com/', icon: 'mail163' },
    { name: 'QQ邮箱', url: 'https://mail.qq.com/', icon: 'mailqq' },
    // 音乐
    { name: '网易云音乐', url: 'https://music.163.com', icon: 'music163' },
    { name: 'QQ音乐', url: 'https://y.qq.com', icon: 'qqmusic' },
    { name: '酷狗音乐', url: 'https://kugou.com', icon: 'kugou' },
    // 购物
    { name: '淘宝', url: 'https://www.taobao.com', icon: 'taobao' },
    { name: '京东', url: 'https://www.jd.com', icon: 'jd' },
    { name: '拼多多', url: 'https://www.pinduoduo.com/', icon: 'pinduoduo' },
    { name: '闲鱼', url: 'https://2.taobao.com/', icon: 'xianyu' },
    { name: '藏宝阁', url: 'https://cbg.163.com/', icon: 'cbg' },
    // AI工具
    { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'chatgpt' },
    { name: 'deepseek', url: 'https://www.deepseek.com', icon: 'deepseek' },
    { name: '豆包', url: 'https://www.doubao.com', icon: 'doubao' },
    { name: 'Gemini', url: 'https://gemini.google.com/', icon: 'gemini' },
    { name: 'Grok', url: 'https://grok.x.ai/', icon: 'grok' },
    // 开发科技
    { name: 'GitHub', url: 'https://github.com/', icon: 'github' },
    { name: 'Gitee', url: 'https://gitee.com/', icon: 'gitee' },
    { name: 'Apple', url: 'https://www.apple.com.cn', icon: 'apple' },
    { name: 'iCloud', url: 'https://www.icloud.com.cn', icon: 'icloud' },
    { name: '微软', url: 'https://www.microsoft.com/zh-cn', icon: 'microsoft' },
    { name: '晨钟酱工具', url: 'https://jamcz.com/', icon: 'jamcz' },
    // 游戏相关
    { name: '苦力怕论坛', url: 'https://klpbbs.com/', icon: 'klpbbs' },
    { name: '手柄检测', url: 'https://www.9slab.com/gamepad/home', icon: 'gamepad-check' },
    { name: '网易游戏充值助手', url: 'https://pay.ds.163.com/', icon: 'netease-pay' },
    { name: '极地游戏', url: 'https://jidiyouxi.com/', icon: 'jidiyouxi' },
    // 实用工具
    { name: '高德地图', url: 'https://amap.com', icon: 'amap' },
    { name: '蓝奏云', url: 'https://lanzou.com/', icon: 'lanzou' },
    { name: '毒蘑菇性能测试', url: 'https://toolwa.com/vsbm/', icon: 'toolwa' },
    { name: '噼咔', url: 'https://manhuapica.com/plogin/', icon: 'pica' },
    { name: '思迅商云', url: 'https://saas.sixun.com.cn/Account/Login#/flowRpt/list', icon: 'sixun' },
    // 其他
    { name: '旧导航', url: 'jiu.html', icon: 'jiu' },
  ];

  // ----- 局域网链接数据 -----
  const LAN_SITES = [
    { name: '路由后台', url: 'http://192.168.100.1', icon: 'lan-router' },
    { name: '光猫后台', url: 'http://192.168.1.1', icon: 'lan-modem' },
    { name: '飞牛NAS', url: 'http://192.168.100.3', icon: 'lan-nas' },
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

      // 图标：icons/ 下的 SVG 文件，用 <img> 引入（file:// 下 Chrome 会拦截 CSS mask）
      htmlStr += `
        <a href="${site.url}" class="glass-tile link-item">
          <img class="svg-icon" src="icons/${site.icon}.svg" alt="">
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
      htmlStr += `
        <a href="${site.url}" class="glass-tile lan-link-item">
          <img class="svg-icon" src="icons/${site.icon}.svg" alt="">
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