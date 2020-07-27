<template>
    <router-view :plate-status="plateStatus"></router-view>
</template>

<script>
    export default {
        name: "plateView",
        props:{
            plateStatus:Number
        }
    }
</script>

<style scoped>

</style>