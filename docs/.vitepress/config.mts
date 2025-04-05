import { defineConfig } from 'vitepress'

import { devDependencies } from '../../package.json'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';

export default (defineConfig({
  lang: 'zh-CN',
  title: "MiaoTown-VI",
  description: "喵镇纯净",

  // #region fav
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', { src: '/js/minecraft-skin-viewer.js', defer: 'true', type: 'text/javascript' }],
    ['script', { src: '/js/team-details.js', defer: 'false', type: 'text/javascript' }], // 将defer改为false，确保脚本立即加载
    ['link', { rel: 'stylesheet', href: '/css/custom.css' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }]
  ],
  // #endregion fav

  base: '/', //网站部署到github的vitepress这个仓库里

  //cleanUrls:true, //开启纯净链接无html

  //启用深色模式
  appearance: 'dark',

  //多语言
  locales: {
    root: {
      label: '简体中文',
      lang: 'Zh_CN',
    },
  },

  //markdown配置
  markdown: {
    //行号显示
    lineNumbers: true,

    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],

    // 开启图片懒加载
    image: {
      lazyLoading: true
    },

    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`
        return htmlResult
      },

      md.use(groupIconMdPlugin) //代码组图标
      md.use(markdownItTaskCheckbox) //todo
      md.use(MermaidMarkdown); 

    }

  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'), //本地ts图标导入
          md: localIconLoader(import.meta.url, '../public/svg/md.svg'), //markdown图标
          css: localIconLoader(import.meta.url, '../public/svg/css.svg'), //css图标
          js: 'logos:javascript', //js图标
        },
      }),
      [MermaidPlugin()]
    ],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },

  lastUpdated: true, //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释

  //主题配置
  themeConfig: {
    //左上角logo
    logo: '/logo199.png',
    //logo: 'https://vitejs.cn/vite3-cn/logo-with-shadow.png', //远程引用
    //siteTitle: false, //标题隐藏

    //设置站点标题 会覆盖title
    //siteTitle: 'Hello World',

    //编辑本页
    editLink: {
      pattern: 'https://github.com/Lingwcy/mt-wiki/edit/main/docs/:path', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },

    //上次更新时间
    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },

    //导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/pages/user-begin.md' },
    ],

    //侧边栏
    sidebar: [
      {
        text: '入服必读',
        collapsed: false,
        items: [
          { text: '玩家须知', link: '/pages/user-begin.md' },
          { text: '服务器规则', link: '/pages/user-rule.md' },
          { text: '服务器信息', link: '/pages/server-info.md' },
          { text: '使用Java版加入游戏', link: '/pages/java-begin.md' },
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
          { text: '运营团队', link: 'pages/team.md' },
          { text: '加入我们', link: 'pages/recruitment.md' },
        ],
      },
      {
        text: '建筑鉴赏',
        collapsed: false,
        items: [
          { text: '玩家建筑', link: '/pages/game/player_building.md' },
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




    search: {
      //搜索用的啥引擎
      provider: "local",
      //具体配置，vscode 可以ctrl + 鼠标左键点进去看具体的参数
      options: {
        translations: {
          //外面的搜索按钮  Search
          button: { buttonText: "搜索百科" },

          //这里就是点击导航栏上面的搜索弹出来的弹框  可以直接跟着改
          modal: {
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },


    socialLinks: [{ icon: 'github', link: 'https://github.com/Lingwcy?tab=repositories' }],
    //404页面的配置
    notFound: {
    title: "页面未找到",
    quote: "哎呀，您好像迷失在网络的小胡同里啦，别着急，赶紧回头是岸！",
    linkText: "返回首页",
    },
  

    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',





    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',

    //返回顶部文字修改(移动端)
    returnToTopLabel: '返回顶部',


    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: '当前页大纲'
    },


    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

  },



})
)