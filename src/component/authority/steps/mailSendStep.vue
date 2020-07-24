<template>
    <Card class="card">
        <Modal v-model="showAlert"
               title="确认跳过认证？"
               @on-ok="skip"
               @on-cancel="cancelAlert">
            <p>本次未完成邮箱验证，以后可以在资料卡继续完成验证。</p>
            <p>只有完成了学生认证，才能发表图片和点赞噢!</p>
        </Modal>
        <h2><Icon type="md-brush" /> 填写邮箱</h2>
        <div class="warp" @keypress.enter="next">
            <div class="form">
                <span class="input-warp">
                    <Input v-model="mail" size="large" class="input" placeholder="填写邮箱" autofocus>
                        <Icon type="md-mail" slot="prefix"/>
                    </Input>
                    <Button type="primary" size="large" class="next" @click="next" :loading="onLoading">发送邮件 <Icon type="ios-arrow-forward" /></Button>
                </span>
            </div>
            <div class="skip-warp">
                <Button type="error" size="large" class="skip" @click="openAlert">跳过验证 <Icon type="md-fastforward" /></Button>
            </div>
        </div>
    </Card>
</template>

<script>
    import UserInfo from '../../../libs/UserInfo'
    let localData={
        showAlert:false,
        mail:'',
        onLoading:false
    };
    export default {
        name: "mailSendStep",
        data(){
            return localData
        },
        methods:{
            next(){
                this.onLoading=true
                let that = this;
                UserInfo.mailSend(this.mail).then(()=>{
                    that.$emit('next');
                    that.$Notice.info({
                        title: '邮箱验证',
                        desc: '一封带有验证码的邮件已经发送到您的邮箱了，请查收。'
                    });
                }).catch(msg=>{
                    that.$Message['error']({
                        background: true,
                        content: msg,
                        duration:5
                    });
                }).finally(()=>{
                    that.onLoading = false;
                });
            },skip(){
                this.showAlert=false;
                this.$emit('skip');
                this.$Notice.info({
                    title: '跳过验证',
                    desc: '本次未完成邮箱验证，以后可以在资料卡继续完成验证。'
                });
            },openAlert(){
                this.showAlert=true;
            },cancelAlert(){
                this.showAlert=false;
            }
        }
    }
</script>

<style scoped>
    .warp{
        margin-top: 36px;
        text-align: center;
    }
    .form{
        margin: 0 auto;
        width: 62%;
        text-align: center;
    }
    .input{
        width: 60%;
        margin: 24px auto;
    }
    .skip-warp{
        margin-top: 24vh;
        text-align: right;
    }
</style>