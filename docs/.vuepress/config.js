module.exports = {
    title: 'Tosn',
    sidebarDepth: 2,
    themeConfig: {
        nav: [
            {
                text: 'Vue',
                items: [
                    {
                        text: 'VueCli3.0',
                        link: '/vue/vueCli'
                    },
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
            }
        ],
        sidebar: {
            '/vue/': [
                ['vueCli', 'vueCli']
            ],
            '/javascript/': [
                ['ES6', 'ES6']
            ],
            '/node/': [
                ['nodeBase', 'node基础'],
                ['koa', 'koa']
            ]
        }
    }
}