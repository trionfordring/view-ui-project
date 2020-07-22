<template>
    <Card class="card">
        <Modal v-model="showAlert"
               title="确认跳过认证？"
               @on-ok="skip"
               @on-cancel="cancelAlert">
            <p>本次未完成学生验证，以后可以在资料卡继续完成验证。</p>
            <p>只有完成了学生认证，才能发表图片和点赞噢!</p>
        </Modal>
        <h2><Icon type="md-brush" /> 学生认证</h2>
        <div class="warp">
            <div class="form">
                <span class="input-warp">
                    <Input v-model="id" size="large" class="input" placeholder="填写学号">
                        <Icon type="md-person" slot="prefix"/>
                    </Input>
                    <Button type="primary" size="large" class="next" @click="next" :loading="onLoading">完成认证 <Icon type="ios-arrow-forward" /></Button>
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
    export default {
        name: "studentAuthStep",
        data(){
            return{
                showAlert:false,
                id:'',
                onLoading:false
            }
        },
        methods:{
            next(){
                this.onLoading=true;
                let that = this;
                UserInfo.verifyStudent(this.id).then(()=>{
                    this.$emit('next');
                    this.$Notice.info({
                        title: '学生验证通过',
                        desc: '你已经完成了整个认证流程，解锁全部功能'
                    });
                }).catch(msg=>{
                    that.$Message['error']({
                        background: true,
                        content: msg,
                        duration:5
                    });
                }).finally(()=>that.onLoading=false);
            },skip(){
                this.showAlert=false;
                this.$emit('skip');
                this.$Notice.info({
                    title: '跳过验证',
                    desc: '本次未完成学生，以后可以在资料卡继续完成验证。'
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