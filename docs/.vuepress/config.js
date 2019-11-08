module.exports = {
    title: 'Tosn',
    themeConfig: {
        sidebarDepth: 2,
        lastUpdated: '更新时间', // string | boolean
        nav: [
            {
                text: 'Vue',
                items: [
                    {
                        text: 'VueCli',
                        link: '/vue/vueCli'
                    },
                    {
                        text: 'VuePress',
                        link: '/vue/vuePress'
                    }
                ]
            },
            {
                text: 'Javascript',
                items: [
                    {
                        text: 'ES6',
                        link: '/javascript/ES6'
                    }
                ]
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
            '/vue/': [['vueCli', 'vueCli'], ['vuePress', 'vuePress']],
            '/javascript/': [['ES6', 'ES6']],
            '/node/': [['nodeBase', 'node基础'], ['koa', 'koa']]
        }
    }
}
