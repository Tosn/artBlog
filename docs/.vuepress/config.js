module.exports = {
    title: 'Tosn',
    themeConfig: {
        sidebarDepth: 2,
        nav: [{
                text: 'Vue',
                items: [{
                    text: 'VueCli',
                    link: '/vue/vueCli'
                }, ]
            },
            {
                text: 'Javascript',
                items: [{
                    text: 'ES6',
                    link: '/javascript/ES6'
                }]
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