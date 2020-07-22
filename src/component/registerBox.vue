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
    var localData={
        step: 0,
        status: StepsStatus.PROCESS
    }
    export default {
        name: "registerBox",
        components:{
            authorityBar
        }, data(){
            return localData;
        },mounted() {
            let that = this;
            this.$router.replace({name:"register"+that.step})
        },watch:{
            step(value){
                this.$router.replace({name:"register"+value});
                this.status=StepsStatus.PROCESS;
            }
        },methods:{
            next(){
                this.step++;
            },back(){
                this.step--;
            },skip(){
                this.step=4;
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