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
                        text: '数组',
                        link: '/javascript/Array'
                    },
                    {
                        text: '对象',
                        link: '/javascript/Object'
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
            '/javascript/': [['Array', '数组'], ['Object', '对象']],
            '/node/': [['nodeBase', 'node基础'], ['koa', 'koa']]
        }
    }
}
