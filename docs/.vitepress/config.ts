import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'MiaoTown-VI',
  description: '喵镇纯净',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/pages/user-begin.md' },
    ],

    sidebar: [
      {
        text: '入服必读',
        collapsed: false,
        items: [
          { text: '玩家须知', link: '/pages/user-begin.md' },
          { text: '服务器规则', link: '/pages/user-rule.md' },
          { text: '服务器信息', link: '/pages/server-info.md' },
          { text: '使用Java版加入游戏', link: '/pages/java-begin.md' },
          { text: '使用基岩版加入游戏', link: '/pages/bedrock-begin.md' },
        ],
      },
      {
        text: '游戏内容',
        collapsed: false,
        items: [
          { text: '常用指令', link: '/pages/game/command.md' },
          { text: '语音聊天', link: '/pages/game/voicechat.md' },
          { text: '世界设定', link: '/pages/game/about-world.md' },
          { text: '经济', link: '/pages/game/eco.md' },
          { text: '领地教程合集', link: '/pages/game/lands.md' },
          { text: '魔法教程合集', link: '/pages/game/magic.md' },
          { text: '粘液科技', link: '/pages/game/silmefun.md' },
          { text: '装备强化', link: '/pages/game/qianghua.md' },
          { text: '免费获取游戏币', link: '/pages/game/helpserver.md' },
          { text: '常见问题解答', link: 'pages/common-question' },
        ],
      },
      {
        text: '贡献攻略/教程',
        collapsed: false,
        items: [
          { text: '如何参与', link: '/pages/github.md' },
        ],
      },

    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/Lingwcy?tab=repositories' }],
  },
})
