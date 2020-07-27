<template>
    <div class="warp">
        <h2>{{plate.name}}</h2>
        <div class="content">
            <div class="box" v-for="image in images">
                <image-card :image="image" @onload="onCardLoad"></image-card>
            </div>
        </div>
    </div>
</template>

<script>
    import PlateInfo from '../libs/PlateInfo'
    import ImageCard from "./imageList/imageCard";
    export default {
        name: "imageList",
        components: {ImageCard},
        data(){
            return {
                plate:Object.create(PlateInfo.plateData),
                images:[],
            }
        },
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
            let that = this;
            PlateInfo.selectById(this.$route.params.id).then(data=>{
                that.plate=data;
            }).catch(msg=>{
                that.$Message['error']({
                    background: true,
                    content: msg+'\n自动返回上一级',
                    duration:5
                });
                that.$router.replace({path:'/'});
            });
            PlateInfo.getAllImages(this.$route.params.id).then(data=>{
                that.images=data;
                if(that.images.length===0)that.onCardLoad();
            }).catch(msg=>{
                that.$Message['error']({
                    background: true,
                    content: msg+'\n自动返回上一级',
                    duration:5
                });
                that.$router.replace({path:'/'});
            });
        },methods:{
            onCardLoad(image){
                let that = this;
                if(image)image.loaded=true;
                if(this.images.every(v=>{return v.loaded})) that.$Spin.hide();
            }
        }
    }
</script>

<style scoped>
    .box{
        width: 22.9vw;
        max-height: 720px;
        margin: 5px;
        -moz-page-break-inside:avoid;
        -webkit-column-break-inside:avoid;
        break-inside:avoid;
    }
    .warp{
        margin: 5px auto;
        width: 92vw;
    }
    .content{
        -moz-column-count:4;
        /* Firefox */
        -webkit-column-count:4;
        /* Safari 和 Chrome */
        column-count:4;
        -moz-column-gap:1em;
        -webkit-column-gap:1em;
        column-gap:1em;
    }
</style>