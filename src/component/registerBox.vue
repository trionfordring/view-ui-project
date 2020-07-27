<template>
    <div class="bar">
        <Card class="card">
            <authority-bar :step="step" :status="status"></authority-bar>
            <router-view @next="next" @back="back" @skip="skip"></router-view>
        </Card>
    </div>
</template>

<script>
    import authorityBar from "./authority/authorityBar";
    import StepsStatus from "../libs/StepsStatus";
    import UserInfo from '../libs/UserInfo'
    export default {
        name: "registerBox",
        components:{
            authorityBar
        }, data(){
            return {
                step: 0,
                status: StepsStatus.PROCESS
            };
        },mounted() {
            let that = this;
            if(UserInfo.loginStatus===true){
                this.step=1;
                if(UserInfo.user.email.includes('@')){
                    this.step=3;
                    if(UserInfo.user.studentId!=='未认证')this.step=4;
                }
            }
            this.jump(this.step);
        },watch:{
            step(value){
                this.jump(value);
                this.status=StepsStatus.PROCESS;
            }
        },methods:{
            next(){
                this.step++;
            },back(){
                this.step--;
            },skip(){
                this.step=4;
            },jump(step){
                if(this.$router.currentRoute.meta.root)
                    this.$router.push({path:this.$router.currentRoute.meta.root+'/'+step.toString()});
                else
                    this.$router.push({path:'./'+step.toString()});
            }
        }
    }
</script>

<style scoped>
    .bar{
        margin: 2vh 5vw 0 6vw;
        height: 100%;
    }
    .card{
        height: 100%;
    }
</style>