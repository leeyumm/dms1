<template>
    <div class="logo-wrapper">
        <p>医疗仪器大数据分析平台</p>
        <p>项目编号: SQ2018YFC010220</p>
        <div class="logo-items">
            <img src="../../assets/cqu-logo_nobg.jpg" alt="" title="重庆大学" width="250px">
            <img src="../../assets/xq_nobg.jpg" alt="" title="新桥医院" width="250px">
        </div>
    </div>
</template>

<script>
export default {
    name:'Logo'
}
</script>

<style scoped>
    .logo-wrapper {
        padding: 50px 0;
    }
    .logo-wrapper > p:first-child{
        font-size:34px
    }
    .logo-items {
        text-align: center;
    }
    .logo-items > img {
        display: block;
        margin: 0 auto
    }
</style>