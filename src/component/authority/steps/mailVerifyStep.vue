<template>
    <Card class="card">
        <h2><Icon type="md-brush" /> 验证邮箱</h2>
        <div class="warp">
            <div class="form">
                <Input size="large" class="input" placeholder="输入邮箱中收到的验证码">
                    <Icon type="md-mail" slot="prefix"/>
                </Input><br>
                <ButtonGroup size="large" class="button-group">
                    <Button type="warning" size="large" class="next" @click="back"> <Icon type="ios-arrow-back" /> 重新填写邮箱</Button>
                    <Button style="visibility: hidden" size="large"> a hide button that u can't see it </Button>
                    <Button type="primary" size="large" class="next" @click="next">确认验证邮箱 <Icon type="ios-arrow-forward" /></Button>
                </ButtonGroup>

            </div>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "mailVerifyStep",
        methods:{
            next(){
                this.$emit('next');
            },
            back(){
                this.$emit('back');
            }
        }
    }
</script>

<style scoped>
    .warp{
        margin-top: 36px;
        text-align: center;
        margin-bottom: 7vh;
    }
    .form{
        margin: 0 auto;
        width: 62%;
    }
    .input{
        width: 60%;
        margin: 24px auto;
    }
    .button-group{
        margin-top: 48px;
    }
</style>