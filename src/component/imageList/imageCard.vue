<template>
    <Card class="card">
        <h3 slot="title"><Icon type="md-image" /> {{image.name}}</h3>
        <Row>
            <Col span="17"><p v-if="image.owner"><Icon type="md-person"/> {{image.owner.username}}</p></Col>
            <Col span="7"><Icon type="ios-time" /><Time :time="image.createTime"></Time></Col>
        </Row>
        <Row>
            <Col span="22" offset="1">
                <img @click="openImage" class="img" :src="src" @load="onload"/>
            </Col>
        </Row>
        <Row>
            <Col span="22" offset="1">
                <div>{{image.description}}</div>
            </Col>
        </Row>
        <Row>
            <Col span="5" offset="14"><label @click="like" :class="likeStyle"><Tooltip content="点赞"><Icon type="md-thumbs-up" /> {{image.likes}}</Tooltip></label></Col>
            <Col span="5"><label><Tooltip content="评论"><Icon type="md-text" /> {{image.comments}}</Tooltip></label></Col>
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
                src:config.host+'/image/resource/'+this.image.id+'?scale=0.5&quality=0.1',
                status:false,
                likeStyle:'disliked'
            }
        },methods:{
            onload(){
                this.status=true;
                this.likeStyle=(this.image.likeStatus===true?'liked':'disliked');
                this.$emit('onload',this.image);
            },like(){
                let that = this;
                if(this.image.likeStatus===true)
                    PlateInfo.disLike(this.image.id).then((msg)=>{
                        that.$Message['success']({
                            background: true,
                            content: msg,
                            duration:5
                        });
                        that.image.likes--;
                        that.image.likeStatus=false;
                    }).catch(msg=>{
                        that.$Message['error']({
                            background: true,
                            content: msg,
                            duration:5
                        });
                    });
                else
                    PlateInfo.like(this.image.id).then((msg)=>{
                        that.$Message['success']({
                            background: true,
                            content: msg,
                            duration:5
                        });
                        that.image.likes++;
                        that.image.likeStatus=true;
                    }).catch(msg=>{
                        that.$Message['error']({
                            background: true,
                            content: msg,
                            duration:5
                        });
                    });
            },openImage(){
                let src = '/index/plate/image/'+this.image.id;
                this.$router.push({path:src})
            }
        },watch:{
            image:{
                deep:true,
                handler:function(v){
                    this.likeStyle=(v.likeStatus===true?'liked':'disliked');
                }
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
        font-size: 1.1em;
    }
    label:hover{
        color: #5cadff;
    }
    .card{
        margin-bottom: 5px;
        word-wrap: break-word;
        word-break: break-all;
    }
    .liked{
        color: #2d8cf0;
    }
</style>