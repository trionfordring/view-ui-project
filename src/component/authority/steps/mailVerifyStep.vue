<template>
    <Card class="card">
        <h2><Icon type="md-brush" /> 验证邮箱</h2>
        <div class="warp"  @keypress.enter="next">
            <div class="form">
                <Input v-model="captcha" size="large" class="input" placeholder="输入邮箱中收到的验证码" autofocus>
                    <Icon type="md-mail" slot="prefix"/>
                </Input><br>
                <ButtonGroup size="large" class="button-group">
                    <Button type="warning" size="large" class="next" @click="back"> <Icon type="ios-arrow-back" /> 重新填写邮箱</Button>
                    <Button style="visibility: hidden" size="large"> a hide button that u can't see it </Button>
                    <Button type="primary" size="large" class="next" @click="next" :loading="onLoading">确认验证邮箱 <Icon type="ios-arrow-forward" /></Button>
                </ButtonGroup>

            </div>
        </div>
    </Card>
</template>

<script>
    import UserInfo from '../../../libs/UserInfo'
    export default {
        name: "mailVerifyStep",
        data(){
          return{
              captcha:'',
              onLoading:false
          }
        },
        methods:{
            next(){
                this.onLoading = true;
                let that = this;
                UserInfo.verifyMail(this.captcha).then(()=>{
                    that.$emit('next');
                    that.$Notice.info({
                        title: '邮箱验证成功',
                        desc: '已经通过邮箱认证，你可以继续完成学生认证'
                    });
                }).catch(msg=>{
                    that.$Message['error']({
                        background: true,
                        content: msg,
                        duration:4
                    });
                    that.$Message['error']({
                        background: true,
                        content: '验证失败,请重新发送验证码',
                        duration:5
                    });
                    that.$emit('back');
                }).finally(()=>{
                    that.onLoading=false;
                })
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