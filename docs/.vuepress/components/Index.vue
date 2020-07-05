<template>
  <div>
    <h4>个人信息</h4>
    <ul>
      <li v-for="item in userInfos">{{ item }}</li>
    </ul>
    <h4>完成情况</h4>
    <ul>
      <li v-for="target in targetList" :key="target.desc">
        <input type="checkbox" disabled v-model="target.state">
        {{target.text}}
        <p>{{target.desc}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfos: [
        '姓名：张涛',
        '总是想的很多，开始会付出一些实践，随着实践推移，慢慢的又会变得懒散',
        '给2020定义几个目标吧',
        '1、基本的算法弄清楚，如递归、回溯、二分、快排、动态规划',
        '2、leetCode刷满300题',
        '3、项目中运用上vue3',
        '4、读2本心理读物和2本技术书籍',
        '其他的再说吧'
      ],
      targetList: [
        {
          state: false,
          text: '基本的算法弄清楚，如递归、回溯、二分、快排、动态规划',
          desc: '递归处于了解状态'
        },
        {
          state: false,
          text: 'leetCode刷满300题',
          desc: '88/300'
        },
        {
          state: false,
          text: '项目中运用上vue3',
          desc: '刚开始接触'
        },
        {
          state: false,
          text: '读2本心理读物和2本技术书籍',
          desc: '自卑与超越阅读中'
        },
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
$color-blue: #2d8cf0;
h4 {
  line-height: 20px;
  font-size: 16px;
  padding-left: 10px;
  border-left: 4px solid $color-blue;
}
</style>
