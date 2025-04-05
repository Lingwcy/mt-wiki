---
layout: home

title: 喵镇纯净
titleTemplate: Minecraft服务器

hero:
  name: 'MiaoTown-VI'
  text: '喵镇纯净'
  tagline: '精进 Minecraft 服务器（2017 - 2025）'
  image:
    src: https://pic1.imgdb.cn/item/67bd841ad0e0a243d40509b1.png
  actions:
    - theme: brand
      text: 游戏百科
      link: /pages/user-begin.md
    - theme: alt
      text: 玩家建筑
      link: /pages/game/helpserver.md

features:
  - title: 原版生存
    details: 始终保持与 Minecraft 官方版本同步，第一时间更新，让你体验最新内容与玩法。
  - title: 附加玩法
    details: 为避免原版内容消耗过快，我们引入了粘液科技、魔法等附加玩法，让你的冒险之旅永不枯燥。
  - title: 老牌原创服
    details: 自 2017 年开服以来，我们用心经营，一草一木皆成风景，为你打造独一无二的 Minecraft 家园。
---
---

<!-- 暂时注释掉未注册的组件 -->
<!-- <HomeUnderline /> -->
<!-- <confetti /> -->
<!-- <busuanzi /> -->

<style>
/* 全屏背景图样式 */
.VPNav, 
.VPContent,
.VPHome {
  background-color: transparent !important;
}

.VPHome::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  /* 主题自适应的背景叠加层 */
  background-image: linear-gradient(
    var(--overlay-color, rgba(0, 0, 0, 0.5)), 
    var(--overlay-color, rgba(0, 0, 0, 0.5))
  ), url('https://pic1.imgdb.cn/item/67bd841ad0e0a243d40509b1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

/* 定义主题相关变量 */
:root {
  --overlay-color: rgba(255, 255, 255, 0.3);
  --tagline-color: rgba(0, 0, 0, 0.85);
  --tagline-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  --feature-bg: rgba(255, 255, 255, 0.8);
  --feature-text: var(--vp-c-text-1);
  --feature-border: rgba(0, 0, 0, 0.1);
}

.dark {
  --overlay-color: rgba(0, 0, 0, 0.6);
  --tagline-color: rgba(255, 255, 255, 0.95);
  --tagline-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  --feature-bg: rgba(0, 0, 0, 0.6);
  --feature-text: rgba(255, 255, 255, 0.9);
  --feature-border: rgba(255, 255, 255, 0.2);
}

.VPHomeHero .tagline {
  color: var(--tagline-color) !important;
  text-shadow: var(--tagline-shadow);
}

/* 隐藏原始的右侧图片 */
.VPHomeHero .image-container {
  display: none !important;
}

/* 特性部分的背景 - 改为透明 */
.VPFeatures {
  background-color: transparent !important;
  border-radius: 12px;
  margin-top: 2rem;
  position: relative;
  z-index: 10;
  padding: 1.5rem;
}

.VPFeatures .title {
  color: var(--tagline-color) !important;
  text-shadow: var(--tagline-shadow);
}

.VPFeatures .details {
  color: var(--feature-text) !important;
  text-shadow: var(--tagline-shadow);
}

/* 为特性卡片添加半透明背景以提高可读性 */
.VPFeatures .VPFeature {
  background-color: var(--feature-bg);
  border: 1px solid var(--feature-border);
  border-radius: 8px;
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.VPFeatures .VPFeature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 按钮样式调整，适配主题 */
.VPHomeHero .VPButton.brand {
  background-color: var(--vp-c-brand);
  color: white !important;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.VPHomeHero .VPButton.brand:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.VPHomeHero .VPButton.alt {
  background-color: transparent;
  border: 2px solid var(--vp-c-brand);
  color: var(--vp-c-brand) !important;
  font-weight: 600;
  transition: all 0.3s ease;
}

.VPHomeHero .VPButton.alt:hover {
  background-color: rgba(var(--vp-c-brand-rgb), 0.1);
  transform: translateY(-2px);
}

/* 确保整个页面内容容器可读 */
.container {
  position: relative;
  z-index: 2;
}
</style>

