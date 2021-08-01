module.exports = {
  title: 'MatrixCord',
  description: 'A multipurpose framework for discord.js',
  base: '/MatrixCord/',
  themeConfig: {
    smoothScroll: true,
    repo: 'MatrixSystemPVP/MatrixCord',
    docsDir: 'docs',
    docsBranch: 'dev',
    editLinks: true,
    nav: [
      { text: 'Documentation', link: '/documentation/' },
      { text: 'Github', link: 'https://github.com/MatrixSystemPVP/MatrixCord' },
      { text: 'Discord', link: 'https://discord.gg/kEbQyy6' }
    ],
    sidebar: {
      '/documentation/': [
        {
          title: 'General',
          collapsable: false,
          children: [
            './general/getStarted'
          ]
        },
        {
          title: 'Classes',
          children: [
            './classes/MatrixClient',
            './classes/MatrixRegistry',
            './classes/MatrixEvent',
            './classes/Util'
          ]
          
        },
        {
          title: 'Types',
          children: [
            './types/MatrixClientOptions',
            './types/DefaultCommands',
            './types/EventInfo'
          ]
        }
      ]
    }
  },
  markdown: {
    plugins: [
      'markdown-it-replace-link'
    ],
    replaceLink: function (link) {
      switch (link) {
        case '@external_string':
          return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'
        case '@external_array':
          return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array'
        case '@external_boolean':
          return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean'
        case '@external_object':
          return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'
        case '@external_null':
          return 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null'
        case '@external_CommandoClient':
          return 'https://discord.js.org/#/docs/commando/master/class/CommandoClient'
        case '@external_CommandoClientOptions':
          return 'https://discord.js.org/#/docs/commando/master/typedef/CommandoClientOptions'
        case '@external_Client':
          return 'https://discord.js.org/#/docs/main/v12/class/Client'
        case '@external_CommandoDocs':
          return 'https://discord.js.org/#/docs/commando/master/general/first-steps'
        case '@external_CommandoMessage':
          return 'https://discord.js.org/#/docs/commando/master/class/CommandoMessage'
        case '@external_Collection':
          return 'https://discord.js.org/#/docs/collection/master/class/Collection'
        case '@external_ClientEvents':
          return 'https://discord.js.org/#/docs/main/v12/class/Client?scrollTo=e-channelCreate'
        default:
          return link
      }
    }
  },
  plugins: [
    ['vuepress-plugin-code-copy', {
      selector: 'div[class*="language-"]',
      backgroundTransition: false
    }],
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom'
  ]
}
