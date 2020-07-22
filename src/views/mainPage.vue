<template>
    <Layout theme="dark">
        <Header></Header>
        <Content>
            <h1>这是主页</h1>
        </Content>
    </Layout>
</template>

<script>
    export default {
        name: "mainPage",
        mounted() {
            this.$Spin.hide();
        }
    }
</script>

<style scoped>

</style>