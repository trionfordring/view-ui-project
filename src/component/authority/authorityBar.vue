<template>
    <div class="bar">
        <Steps :current="step" :status="status" class="steps">
            <Step title="账户" content="注册一个普通账户"></Step>
            <Step title="邮箱" content="认证邮箱，成为一个邮箱认证用户"></Step>
            <Step title="验证" content="输入邮箱中收到的验证码，验证邮箱"></Step>
            <Step title="学生" content="认证学生身份，成为一个学生认证用户"></Step>
        </Steps>
    </div>

</template>

<script>
    export default {
        name: "authorityBar",
        props:{
            step:Number,
            status:String
        }
    }
</script>

<style scoped>
    .bar{
        margin: 45px 75px 45px 75px;
    }
</style>