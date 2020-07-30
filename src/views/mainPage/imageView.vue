<template>
    <Card>
        <Breadcrumb>
            <BreadcrumbItem to="/index/plate/list"><span class="breed"><Icon type="ios-home-outline" /> 板块列表</span></BreadcrumbItem>
            <BreadcrumbItem :to="'/index/plate/images/'+image.plate.id"><span class="breed"><Icon type="ios-list-box-outline" /> {{image.plate.name}}</span></BreadcrumbItem>
            <BreadcrumbItem><span class="breed"><Icon type="md-image" /> {{image.name}}</span></BreadcrumbItem>
        </Breadcrumb>
        <Divider/>
        <Row>
            <Col span="12">
                <div style="display: flex">
                    <img @load="loadSuccess" class="image" :src="imageSrc">
                </div>
            </Col>
            <Col span="12">
                <Row>
                    <Col span="6">图片名:</Col>
                    <Col span="14"><p>{{image.name}}</p></Col>
                </Row>
                <Row>
                    <Col span="6">所属板块:</Col>
                    <Col span="14"><p>{{image.plate.name}}</p></Col>
                </Row>
                <Row>
                    <Col span="6" offset="1">活动时间:</Col>
                    <Col span="14">
                        <Icon type="md-time" /><Time :time="image.plate.startTime" type="datetime"></Time>
                        &nbsp;~&nbsp;
                        <Icon type="md-time" /><Time :time="image.plate.endTime" type="datetime"></Time>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">所属用户:</Col>
                    <Col span="14"><p>{{image.owner.username}}</p></Col>
                </Row>
                <Row>
                    <Col span="6">创建时间:</Col>
                    <Col span="14"><Time :time="image.createTime"></Time></Col>
                </Row>
                <Row>
                    <Col span="6">简介:</Col>
                    <Col span="14"><Input type="textarea" readonly autosize :value="image.description"></Input></Col>
                </Row>
                <Divider/>
                <span>喜欢这张图片的人们:</span>
                <span v-for="user in likeUsers">
                    <Tooltip :content="user.username"><Avatar :src="headRoot+user.username" @on-error="headLoadError"></Avatar></Tooltip>
                </span>
            </Col>
        </Row>
        <Divider/>
        <Row>
            <Col span="3" offset="2">
                <div style="text-align: center;display: flex;cursor: pointer;" @click="like">
                    <div :class="likeStyle" style="margin: 0 auto">
                        <Icon style="font-size: 2em" type="md-thumbs-up" />
                        <h3>{{image.likes}}</h3>
                    </div>
                </div>
            </Col>
            <Col span="19">
                <div>
                    <span>
                        发表评论:<Input autofocus v-model="commentInput" :autosize="{minRows: 3,maxRows:5}" style="width: 50vw" type="textarea" maxlength="254" show-word-limit></Input>
                        <Button @click="commitComment" size="large" type="primary">提交</Button>
                    </span>
                </div>
            </Col>
        </Row>
        <Divider/>
        <comment v-if="comments.length>0" :comments="comments" :image="image"></comment>
    </Card>
</template>

<script>
    import Utils from "../../libs/Utils";
    import PlateInfo from '../../libs/PlateInfo';
    import config from "../../config/config";
    import Comment from "../../component/comment";
    export default {
        name: "imageView",
        components: {Comment},
        data(){
            return{
                image:Object.create(PlateInfo.imageData),
                likeUsers:[],
                headRoot:config.host+'/user/head/',
                likeStatus:false,
                commentInput:'',
                comments:[],
            }
        },
        mounted() {
            let that = this;
            Utils.loading();
            //获取图片信息
            PlateInfo.getImage(this.$route.params.id).then(data=>{
                this.image = data;
                //获取用户的喜欢列表
                PlateInfo.selfLikeList().then(data=>{
                    this.likeStatus = data.images.some(img=>{return img.id===that.image.id});
                }).catch(msg=>{
                    Utils.message(Utils.TYPES.ERROR,msg);
                });
            }).catch(msg=>{
                Utils.message(Utils.TYPES.ERROR,msg);
            });
            //获取所有喜欢这张图片的用户
            PlateInfo.getAllUserLikeImage(this.$route.params.id).then(data=>{
                this.likeUsers = data.users;
            }).catch(msg=>{
                Utils.message(Utils.TYPES.ERROR,msg);
            });
            //获取图片的评论列表
            PlateInfo.getCommentList(this.$route.params.id).then(data=>{
                this.comments = data.comments;
                this.reverseComments(this.comments);
            }).catch(msg=>{Utils.message(Utils.TYPES.ERROR,msg)})
        },computed:{
            imageSrc(){
                if(this.image.id) return `${config.host}/image/resource/${this.image.id}`
            },likeStyle(){
                return this.likeStatus?'liked':'disliked';
            }
        },methods:{
            headLoadError(e){
                e.target.src = '/static/images/defaultHead.jpg';
            },loadSuccess(){
                Utils.loadSuccess();
            },like(){
                let that = this;
                if(this.likeStatus)
                    PlateInfo.disLike(this.image.id).then((msg)=>{
                        Utils.message(Utils.TYPES.SUCCESS,msg);
                        that.likeStatus=false;
                        that.image.likes--;
                    }).catch(msg=>{
                        Utils.message(Utils.TYPES.ERROR,msg);
                    });
                else
                    PlateInfo.like(this.image.id).then((msg)=>{
                        Utils.message(Utils.TYPES.SUCCESS,msg);
                        that.image.likes++;
                        that.likeStatus=true;
                    }).catch(msg=>{
                        Utils.message(Utils.TYPES.ERROR,msg);
                    });
            },commitComment(){
               PlateInfo.putComment(this.commentInput,this.image.id).then(data=>{
                   Utils.message(Utils.TYPES.SUCCESS,'发送成功');
                   this.comments.unshift(data);
               }).catch(msg=>{Utils.message(Utils.TYPES.ERROR,msg)});
            },reverseComments(comments){
                return comments.reverse().forEach(c=>{
                    if(c.sons instanceof Array&&c.sons.length>0)this.reverseComments(c.sons);
                });
            }
        }
    }
</script>
<style scoped>
    .image{
        max-height: 100%;
        max-width: 90%;
        margin: 5px auto;
        border-radius: 3px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
    }
    .breed{
        font-size: 1.1em;
    }
    .liked{
        color: #2d8cf0;
    }
</style>