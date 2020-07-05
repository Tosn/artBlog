module.exports = {
  title: "Tosn",
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: "更新时间", // string | boolean
    nav: [
      {
        text: "Vue",
        link: "/vue/vueCli",
      },
      {
        text: "Javascript",
        link: "/javascript/es6",
      },
      {
        text: "算法",
        link: "/algorithm/dp.md",
      },
      {
        text: "Node",
        link: "/node/nodeBase",
      },
      {
        text: "其他",
        link: "/other/Ts",
      },
      {
        text: "GitHub",
        link: "https://github.com/Tosn/Tosn-Blog",
      },
    ],
    sidebar: {
      "/vue/": [
        ["vueCli", "vueCli"],
        ["vuePress", "vuePress"],
        ["vuePlugins", "vue插件"],
        ["vue3", "vue3"],
      ],
      "/javascript/": [
        ["clever", "巧用方法"],
        ["es6", "Es6新增"],
        ["Array", "数组"],
        ["Object", "对象"],
        ["BitOper", "位运算"],
        ["FileSaver", "FileSaver"],
      ],
      "/algorithm/": [["dp", "递归"]],
      "/other/": [
        ["Ts", "vue Ts"],
        ["Lint", "代码规范"],
        ["Project", "项目实战"],
        ["Mongodb", "Mongo"],
      ],
      "/node/": [["nodeBase", "node基础"], ["koa", "koa"]],
    },
  },
};
