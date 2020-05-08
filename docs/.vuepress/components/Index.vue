<template>
    <div>
        <h4>个人信息</h4>
        <ul>
            <li v-for="item in userInfos">{{item[0]}}: {{item[1]}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfos: [
                ['姓名', '张涛'], 
                ['性别', '男'],
                ['爱好', '睡觉、音乐、撸代码']
            ]
        }
    }
}
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