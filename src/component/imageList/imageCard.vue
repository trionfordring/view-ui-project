<template>
    <Card class="card">
        <h3 slot="title"><Icon type="md-image" /> {{image.name}}</h3>
        <Row>
            <Col span="17"><p><Icon type="md-person"/> {{image.owner.username}}</p></Col>
            <Col span="7"><Icon type="ios-time" /><Time :time="image.createTime"></Time></Col>
        </Row>
        <Row>
            <Col span="22" offset="1">
                <span ref="imgBox"></span>
                <img class="img" :src="src" @load="onload"/>
            </Col>
        </Row>
        <Row>
            <Col span="22" offset="1">
                <div>{{image.description}}</div>
            </Col>
        </Row>
        <Row>
            <Col span="6" offset="12"><label @click="like" @class="likeStyle"><Tooltip content="点赞"><Icon type="md-thumbs-up" /> {{image.likes}}</Tooltip></label></Col>
            <Col span="6"><label><Tooltip content="评论"><Icon type="md-text" /> {{image.comments}}</Tooltip></label></Col>
        </Row>
    </Card>
</template>

<script>
    import config from "../../config/config";
    import PlateInfo from '../../libs/PlateInfo';
    export default {
        name: "imageCard",
        props:{
            image:Object
        },
        data(){
            return{
                src:config.host+'/image/resource/'+this.image.id+'?scale=0.4&quality=0.1',
                status:false
            }
        },methods:{
            onload(){
                console.log(this.image);
                this.status=true;
                this.$emit('onload',this.image);
            },likeStyle(){

            },like(){
                let that = this;
                PlateInfo.like(this.image.id).then((msg)=>{
                    that.$Message['success']({
                        background: true,
                        content: msg,
                        duration:5
                    });
                }).catch(msg=>{
                    that.$Message['error']({
                        background: true,
                        content: msg,
                        duration:5
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .img{
        max-height: 100%;
        width: 90%;
        margin: 5px auto;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        cursor: pointer;
    }
    .img:hover{
        position: relative;
        transform: translateY(-1%);
        transition: 100ms;
        box-shadow: 0 3px 6px rgba(0,0,0,.3);
    }
    label{
        cursor: pointer;
    }
    label:hover{
        color: #808695;
    }
    .card{
        margin-bottom: 5px;
    }
</style>