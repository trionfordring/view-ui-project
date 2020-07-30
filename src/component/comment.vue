<template>
    <Card v-if="prepared">
        <div v-for="(comment,index) in comments">
            <Row>
                <Col span="3">
                    <div>
                        <img class="head" :src="headRoot+comment.owner.username" onerror="this.src='/static/images/defaultHead.jpg';this.onerror=null;"/>
                    </div>
                </Col>
                <Col span="21">
                    <h3>{{comment.owner.username}}</h3>
                    <p>{{comment.content}}</p>
                    <br>
                    <p class="foot"> 发布时间: <Time :time="comment.createTime"></Time> |
                        &nbsp;<label style="cursor: pointer;"> <span><Icon type="ios-chatbubbles-outline" style="font-size: 1.1em;" /> {{comment.sons.length}}</span>
                            <Poptip v-model="comment.poptipStatus">
                                <Button size="small" type="text">回复</Button>
                                <div slot="content">
                                    <Input autofocus v-model="comment.quickComment" :autosize="{minRows: 2,maxRows:5}" style="width: 340px" type="textarea" maxlength="254" show-word-limit></Input>
                                    <Button @click="putComment(comment.quickComment,comment)" size="large" type="primary">提交</Button>
                                </div>
                            </Poptip>
                        </label>
                    </p>
                    <comment v-if="comment.sons&&comment.sons.length>0" :comments="comment.sons" :image="image"></comment>
                    <Divider v-else-if="index!==comments.length-1"/>
                </Col>
            </Row>
        </div>
    </Card>
</template>

<script>
    import config from "../config/config";
    import PlateInfo from '../libs/PlateInfo';
    import Utils from "../libs/Utils";
    export default {
        name: "comment",
        props:{
            comments:Array,
            image:Object
        },data(){
            return{
                headRoot:config.host+'/user/head/',
                prepared:false
            }
        },mounted() {
            let tasks = [];
            this.comments.forEach(comment=>{
                let t = PlateInfo.getCommentDetails(comment.id).then(data=>{
                    delete data.sons;
                    comment=Object.assign(comment,data);
                }).catch(msg=>{
                    Utils.message(Utils.TYPES.ERROR,msg);
                });
                tasks.push(t);
            });
            Promise.all(tasks).then(()=>{
               this.prepared=true;
            });
        },methods:{
            headLoadError(e){
                e.target.src = '/static/images/defaultHead.jpg';
            },putComment(str,target){
                console.log(target);
                PlateInfo.putComment(str,this.image.id,target.id).then(data=>{
                    if(!target.sons instanceof Array)target.sons=[];
                    target.sons.unshift(data);
                    Utils.message(Utils.TYPES.SUCCESS,'发送成功');
                }).catch(msg=>Utils.message(Utils.TYPES.ERROR,msg)).finally(()=>{target.poptipStatus=false});
            }
        }
    }
</script>

<style scoped>
    .head{
        width: 60%;
        border-radius: 50%;
        overflow: hidden;
    }
    h3{
        margin-bottom: 5px;
    }
    .foot{
        font-size: 0.95em;
        color: #808695;
    }
</style>