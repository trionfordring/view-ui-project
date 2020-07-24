<style scoped lang="less">
    .login{
        width: fit-content;
    }
    .input-login{
        width: 320px;
        margin: 15px 25px 5px;
        font-size: 24px;
    }
    .remember{
        text-align: right;
        margin-top: 10px;
        margin-right: 36px;

    }
    .login-button{
        text-align: center;
        margin-right: 36px;
        margin-top: 15px;
    }
    h1{
        color: #17233d;
    }
    .login-box{
        position: relative;
        width: fit-content;
        left: 50%;
        top: 50%;
        transform: translate(-55% ,-55%);
    }
</style>
<template>
    <div class="login-box"  @keypress.enter="login">
        <Card class="login">
            <h1 slot="title"><Icon type="ios-body"/> 登录</h1>
            <Input v-model="name" prefix="md-contact" size="large" class="input-login" placeholder="输入用户名" autofocus/><br>
            <Input v-model="password" prefix="md-key" size="large" class="input-login" type="password" placeholder="输入密码" password/><br>
            <div class="remember">
                记住密码<Switch v-model="remember" size="large"/>
            </div>
            <div class="login-button">
                <Button size="large" style="width: 40%" type="primary" @click="login" :loading="isLoading">登录</Button>
            </div>
        </Card>
    </div>
</template>
<script>
    import UserInfo from '../libs/UserInfo'
    export default {
        name:"loginBox",
        data(){
          return{
              name:"",
              password:"",
              remember:false,
              isLoading:false
          }
        },
        methods:{
            login(){
                this.isLoading=true;
                let that = this;
                UserInfo.login(this.name,this.password,this.remember).then(()=>{
                    that.$router.replace({name:'mainPage'});
                    that.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'style': 'animation: ani-demo-spin 0.6s linear infinite;',
                                    props: {
                                        type: 'ios-loading',
                                        size: 48
                                    }
                                }),
                                h('h3', 'Loading')
                            ])
                        }
                    });
                },msg=>{
                    that.$Message['error']({
                        background: true,
                        content: msg,
                        duration:5
                    });
                }).finally(()=>{
                    that.isLoading=false;
                })
            }
        },mounted() {
            this.$Spin.hide();
        }
    }
</script>
