<style scoped lang="less">
</style>
<template>
    <div>
    </div>
</template>
<script>
    import UserInfo from "../libs/UserInfo";
    export default {
        name:"index",
        mounted() {
            this.$Spin.show({
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
            if(UserInfo.hasScanned){
                if(UserInfo.loginStatus)this.$router.push({name:'mainPage'});
                else this.$router.push({name:"authority"});
            }else {
                UserInfo.hasLogin().then(()=>{
                    this.$router.push({name:'mainPage'});
                },()=>{
                    this.$router.push({name:"authority"});
                });
            }
        }

    }
</script>
