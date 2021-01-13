const getConfig = require("vuepress-bar");
const root = `${__dirname}/..`;

const sidebarConfig = getConfig(root, { addReadMeToFirstGroup: false }).sidebar;

module.exports = {
  head: [],
  base: '/figma-design-token-dock/',
  markdown: {
    plugins: ['markdown-it-task-lists']
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: 'figma-design-token-dock',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/en': {
      lang: 'en-US',
      title: 'figma-design-token-dock',
      description: 'Vue-powered Static Site Generator'
    }
  },
  themeConfig: {
    repo: 'https://github.com/ExcitedSpider/figma-design-token-dock',
    sidebarDepth: 6,
    /** 开放搜索 */
    search: true,
    searchMaxSuggestions: 10,
    /** 禁用上一篇/下一篇 */
    nextLinks: false,
    prevLinks: false,
    /** 侧边栏导航配置 */
    sidebar: 'auto',
  },
};
