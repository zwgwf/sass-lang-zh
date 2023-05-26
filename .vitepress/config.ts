import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "sass",
  description: "sass官网的中文翻译",
  base: '/sass-lang-zh/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '安装', link: '/reference/install' },
      { text: ' Sass基础', link: '/reference/guide' },
      { text: '文档', link: '/reference/documentation/' }
    ],

    sidebar: {
      '/reference/documentation/': [
        {
          text: '语法',
          collapsed: true,
          items: [
            { text: '概览', link: '/reference/documentation/syntax/' },
            { text: '解析样式表', link: '/reference/documentation/syntax/parsing' },
            { text: '样式表的结构', link: '/reference/documentation/syntax/structure' },
            { text: '注释', link: '/reference/documentation/syntax/comments' },
            { text: '特殊函数', link: '/reference/documentation/syntax/special-functions' }
          ]
        },
        {
          text: '样式规则',
          collapsed: true,
          items: [
            { text: '概览', link: '/reference/documentation/style-rules/' },
            { text: '属性声明', link: '/reference/documentation/style-rules/declarations' },
            { text: '父选择器', link: '/reference/documentation/style-rules/parent-selector' },
            { text: '占位符选择器', link: '/reference/documentation/style-rules/placeholder-selectors' }
          ]
        },
        {
          text: '变量',
          link: '/reference/documentation/variables'
        },
        {
          text: '插值',
          link: '/reference/documentation/interpolation'
        },
        {
          text: '@规则',
          collapsed: true,
          items: [
            { text: '概览', link: '/reference/documentation/at-rules/' },
            { text: '@use', link: '/reference/documentation/at-rules/use' },
            { text: '@forward', link: '/reference/documentation/at-rules/forward' },
            { text: '@import', link: '/reference/documentation/at-rules/import' },
            { text: '@mixin 和 @include', link: '/reference/documentation/at-rules/mixin' },
            { text: '@function', link: '/reference/documentation/at-rules/function' },
            { text: '@extend', link: '/reference/documentation/at-rules/extend' },
            { text: '@error', link: '/reference/documentation/at-rules/error' },
            { text: '@warn', link: '/reference/documentation/at-rules/warn' },
            { text: '@debug', link: '/reference/documentation/at-rules/debug' },
            { text: '@at-root', link: '/reference/documentation/at-rules/at-root' },
            { text: '流程控制', collapsed: true, items: [
              { text: '概览', link: '/reference/documentation/at-rules/control/' },
              { text: '@if 和 @else', link: '/reference/documentation/at-rules/control/if' },
              { text: '@each', link: '/reference/documentation/at-rules/control/each' },
              { text: '@for', link: '/reference/documentation/at-rules/control/for' },
              { text: '@while', link: '/reference/documentation/at-rules/control/while' },

            ] },
            { text: 'From CSS', link: '/reference/documentation/at-rules/css' }
          ]
        },
        {
          text: '值',
          collapsed: true,
          items: [
            { text: '概览', link: '/reference/documentation/values/' },
            { text: 'Numbers', link: '/reference/documentation/values/numbers' },
            { text: 'String', link: '/reference/documentation/values/strings' },
            { text: 'Colors', link: '/reference/documentation/values/colors' },
            { text: 'Lists', link: '/reference/documentation/values/lists' },
            { text: 'Maps', link: '/reference/documentation/values/maps' },
            { text: 'true 和 false', link: '/reference/documentation/values/booleans' },
            { text: 'null', link: '/reference/documentation/values/null' },
            { text: 'Calculations', link: '/reference/documentation/values/calculations' },
            { text: 'Functions', link: '/reference/documentation/values/functions' }
          ]
        },
        {
          text: '运算符',
          collapsed: true,
          items: [
            { text: '概览', link: '/reference/documentation/operators/' },
            { text: '相等运算符', link: '/reference/documentation/operators/equality' },
            { text: '关系运算符', link: '/reference/documentation/operators/relational' },
            { text: '数字运算符', link: '/reference/documentation/operators/numeric' },
            { text: '字符串运算符', link: '/reference/documentation/operators/string' },
            { text: '布尔运算符', link: '/reference/documentation/operators/boolean' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zwgwf/sass-lang-zh' }
    ],
    outline: {
      level: 'deep',
      label: '目录',
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回到顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdatedText: '上次更新时间',
    editLink: {
      text: '对本页提出修改建议',
      pattern: 'https://github.com/zwgwf/sass-lang-zh/edit/main/:path'
    }

  }
})
