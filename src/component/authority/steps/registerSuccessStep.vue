<template>
    
</template>

<script>
    import UserInfo from "../../../libs/UserInfo";

    export default {
        name: "registerSuccessStep",
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
                        h('h3', '正在前往主页面')
                    ])
                }
            });
            this.$router.push({name:'mainPage'})
        }
    }
</script>

<style scoped>

</style>