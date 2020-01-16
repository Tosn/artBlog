module.exports = {
    title: 'Tosn',
    themeConfig: {
        sidebarDepth: 2,
        lastUpdated: '更新时间', // string | boolean
        nav: [
            {
                text: 'Vue',
                link: '/vue/vueCli'
            },
            {
                text: 'Javascript',
                link: '/javascript/es6'
            },
            {
                text: 'Node',
                link: '/node/nodeBase'
            },
            {
                text: 'GitHub',
                link: 'https://github.com/Tosn/Tosn-Blog'
            }
        ],
        sidebar: {
            '/vue/': [
                ['vueCli', 'vueCli'],
                ['vuePress', 'vuePress'],
                ['vuePlugins', 'vue插件']
            ],
            '/javascript/': [
                ['clever', '巧用方法'],
                ['es6', 'Es6新增'],
                ['Array', '数组'],
                ['Object', '对象'],
                ['FileSaver', 'FileSaver']
            ],
            '/node/': [['nodeBase', 'node基础'], ['koa', 'koa']]
        }
    }
}
