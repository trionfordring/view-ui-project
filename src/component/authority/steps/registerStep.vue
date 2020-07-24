<template>
    <Card class="card">
        <h2><Icon type="md-brush" /> 填写注册信息</h2>
        <div class="warp"  @keypress.enter="submit">
            <div class="form">
                <Input v-model="name" size="large" class="input" placeholder="填写用户名" autofocus>
                    <Icon type="md-contact" slot="prepend"/>
                </Input>
                <Input v-model="password" size="large" class="input" placeholder="填写密码" type="password" password>
                    <Icon type="md-key" slot="prepend"/>
                </Input>
                <Input v-model="verify" size="large" class="input" placeholder="验证码">
                    <Icon type="md-image" slot="prepend" />
                    <div slot="append" class="captcha-warp"><img class="captcha" @click="freshCaptcha" :src="captcha"></div>
                </Input>
                <Button type="primary" size="large" class="next" @click="submit" :loading="isLoading">注册账户 <Icon v-show="!isLoading" type="ios-arrow-forward"/></Button>
            </div>
        </div>
    </Card>
</template>

<script>
    import config from "../../../config/config";
    import UserInfo from '../../../libs/UserInfo'
    const captchaUrl = config.host+"/user/captcha";
    export default {
        name: "registerStep",
        data(){
            return{
                captcha:captchaUrl+"?"+Math.random(),
                name:'',
                password:'',
                verify:'',
                isLoading:false,
            }
        },methods:{
            freshCaptcha(){
                this.captcha = captchaUrl+"?"+Math.random();
            },submit(){
                this.isLoading=true;
                let that = this;
                UserInfo.register(this.name,this.password,this.verify).then(()=>{
                    that.$emit('next');
                    that.$Notice.info({
                        title: '注册成功',
                        desc: '用户已经创建成功，你可以继续验证你的邮箱'
                    });
                }).catch(msg=>{
                    that.freshCaptcha();
                    that.$Message['error']({
                        background: true,
                        content: msg,
                        duration:5
                    });
                }).finally(()=>{
                    that.isLoading=false;
                });
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
        text-align: right;
    }
    .input{
        width: 60%;
        margin: 24px auto;
    }
    .captcha-warp{
        height: 24px;
    }
    .captcha{
        position: relative;
        transform: translateY(-7px);
        height: 38px;
        cursor: pointer;
    }
    .next{
        margin-top: 32px;
        margin-bottom: 32px;
    }
</style>