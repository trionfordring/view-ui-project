<template>
    <div class="warp">
        <div class="head" @mouseenter="freshTotalVote"><Card>
            <Row>
                <Col span="12"><h2>&nbsp;&nbsp;<Icon type="md-cube" /> 板块:&nbsp;&nbsp;{{plate.name}}</h2></Col>
                <Col span="12">
                    <div  v-if="plate.startTime<=Date.now()&&Date.now()<=plate.endTime"  style="float: right">
                    <Button @click="uploadBoxVisible=true" type="primary" size="large">
                    <Icon size="22" type="ios-cloud-upload-outline" />
                     上传图片
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button @click="multiUploadBoxVisible=true" size="large">
                        <Icon size="22" type="ios-cloud-upload-outline" />
                        批量上传图片
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Modal
                            v-model="uploadBoxVisible"
                            title="上传你的图片"
                            @on-ok="uploadOk"
                            ok-text="提交"
                            :styles="{top:'65px'}"
                    ><div  @keypress.enter="uploadOk">
                        <Form :model="uploadForm">
                            <FormItem label="图片名:">
                                <Input v-model="uploadForm.name" size="large" placeholder="输入图片的名字"></Input>
                            </FormItem>
                            <FormItem label="简介:">
                                <Input v-model="uploadForm.description" size="large" placeholder="输入图片的简介(可填)"></Input>
                            </FormItem>
                            <FormItem>
                                <p>上传图片:</p>
                                <Upload
                                        type="drag"
                                        action="#"
                                        accept="image/jpg,image/jpeg,image/png,image/PNG"
                                        :before-upload="fileSave"
                                >
                                    <div v-show="uploadTip" style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>点击此处或拖拽图片上传</p>
                                    </div>
                                    <img style="max-height: 250px;max-width: 100%" ref="uploadFile">
                                </Upload>
                            </FormItem>
                        </Form>
                    </div></Modal>

                    <Modal
                            v-model="multiUploadBoxVisible"
                            @on-ok="multiUploadOk"
                            ok-text="提交"
                            :styles="{top:'65px'}"
                    >
                        <p slot="header">
                            <Tooltip max-width="450"
                                     content="在这里可以使用'{index}'表示下标，'{name}'表示文件名,'{date}'表示文件最后一次修改日期,'{time}'表示文件最后一次修改时间，'{size}'表示文件大小(KB)">
                                批量上传你的图片 <Icon type="md-help-circle" /> </Tooltip></p>
                        <div  @keypress.enter="multiUploadOk">
                        <Form :model="multiUploadForm">
                            <FormItem label="统一图片名:">
                                <Input v-model="multiUploadForm.name" size="large" placeholder="输入图片的名字"></Input>
                            </FormItem>
                            <FormItem label="统一简介:">
                                <Input v-model="multiUploadForm.description" size="large" placeholder="输入图片的简介(可填)"></Input>
                            </FormItem>
                            <FormItem>
                                <p>上传图片:</p>
                                <Upload
                                        multiple
                                        type="drag"
                                        action="#"
                                        accept="image/jpg,image/jpeg,image/png,image/PNG"
                                        :before-upload="multiFileSave"
                                >
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p v-if="multiUploadTip">点击此处或拖拽图片上传</p>
                                        <div v-else>
                                            <p style="margin: 0 15px">已经选中了
                                                <span v-for="file in multiUploadFiles" deep>
                                                [{{file.name}}]
                                            </span>
                                            </p>
                                            <p>共计{{multiUploadFiles.length}}张图片</p>
                                        </div>
                                    </div>
                                </Upload>
                            </FormItem>
                        </Form>
                    </div></Modal>

                </div>
                    <div style="float: right" v-else-if="plate.startTime!==0&&plate.startTime>Date.now()"><Tag size="large" color="success"><p>活动尚未开始，请耐心等待</p></Tag></div>
                    <div style="float: right" v-else-if="plate.endTime!==0&&Date.now()>plate.endTime"><Tag size="large" color="warning"><p>活动已经结束了</p></Tag></div>
                    <div v-else></div>
                </Col>
            </Row>
            <Row>
                <Col span="1"><span><Icon type="ios-create-outline" />简介:</span></Col>
                <Col span="22"><p>{{plate.description}}</p></Col>
            </Row><br>
            <Row>
                <Col span="10"><p>
                    <Icon type="ios-calendar" /> 活动时间:&nbsp;&nbsp;
                    <Icon type="md-time" />&nbsp;<Time :time="plate.startTime" type="datetime"></Time>
                    &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
                    <Icon type="md-time" />&nbsp;<Time :time="plate.endTime" type="datetime"></Time>
                </p></Col>
                <Col span="5"><p><Icon type="md-calendar" /> 创建日期:
                    <Time :time="plate.createTime"></Time>
                </p></Col>
                <Col span="5"><p><Icon type="md-key" /> 创建者: {{plate.owner.username}}</p></Col>
                <Col span="4"><p><Icon type="logo-dropbox" /> 板块总票数: {{totalVote}}</p></Col>
            </Row><br>
            <Row>
                <Col span="6"><p><Icon type="md-trophy" /> 当前最高票图片:
                    <span v-for="image in maxImage">&nbsp;{{image.name}}&nbsp;</span>
                </p></Col>
                <Col span="6" offset="2"><p><Icon type="ios-star" /> 票数:
                    <span v-if="maxImage.length>0">{{maxImage[0].likes}}</span>
                    <span v-else>0</span>
                </p></Col>
                <Col span="4" offset="2"><p><Icon type="ios-photos" /> 总图片数:
                    <span v-if="maxImage.length>0">{{images.length}}</span>
                    <span v-else>0</span>
                </p></Col>
            </Row>
        </Card></div>
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
                selfLikes:[],
                totalVote:0,
                maxImage:[{name:'',likes:0}],
                uploadBoxVisible:false,
                uploadForm:{},
                uploadTip:true,
                multiUploadBoxVisible:false,
                multiUploadForm:{},
                multiUploadTip:true,
                multiUploadFiles:[]
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
            let loadImages = PlateInfo.getAllImages(this.$route.params.id).then(data=>{
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
            let loadLikes = PlateInfo.selfLikeList().then(data=>{
                that.selfLikes = data.images;
            }).catch(msg=>{
                that.$Message['error']({
                    background: true,
                    content: '加载点赞列表失败:'+msg,
                    duration:5
                });
            });
            Promise.all([loadImages,loadLikes]).then(()=>{
                let map = new Map();
                that.selfLikes.forEach(v=>{map.set(v.id,true)});
                that.images.forEach(v=>{v.likeStatus=(map.get(v.id)===true)});
                that.freshTotalVote();
            }).catch(()=>{
                console.log('加载失败');
            })
        },methods:{
            onCardLoad(image){
                let that = this;
                if(image)image.loaded=true;
                if(this.images.every(v=>{return v.loaded})) that.$Spin.hide();
            },freshTotalVote(){
                let that = this;
                let votes=0;
                this.images.forEach(v=>{
                    votes+=v.likes;
                    if(that.maxImage.length===0||v.likes>that.maxImage[0].likes) that.maxImage=[v];
                    else if(v.likes===that.maxImage[0].likes&&that.maxImage.every(key=>{return key.name!==v.name}))that.maxImage.push(v)
                });
                this.totalVote=votes;
            },uploadOk(){
                if(this.uploadForm.name&&this.uploadForm.file){
                    this.$Message['success']({
                        background: true,
                        content: '正在上传文件，请稍候'
                    });
                    this.$Loading.start();
                    let that = this;
                    PlateInfo.uploadImage(this.plate.id,this.uploadForm.name,this.uploadForm.description,this.uploadForm.file)
                    .then(data=>{
                        that.$Message['success']({
                            background: true,
                            content: '上传成功'
                        });
                        data.likes=0;
                        data.comments=0;
                        data.likeStatus=false;
                        that.images.push(data);
                        that.formReset();
                    }).catch(msg=>{
                        that.sendError(msg);
                    }).finally(()=>{that.$Loading.finish();});
                } else this.sendError('填完表才能提交呢');
            },sendError(msg){
                this.$Message['error']({
                    background: true,
                    content: msg,
                    duration:5
                });
            },fileSave(file){
                if(!file.type.includes('image'))this.sendError('只能上传图片文件噢');
                else if(file.size>15*1024*1024) this.sendError('图片文件大小不能超过15M');
                else {
                    this.uploadForm.file=file;
                    this.uploadTip = false;
                    this.$refs.uploadFile.src=URL.createObjectURL(file);
                }
                return false;
            },formReset(){
                this.uploadBoxVisible=false;
                this.uploadForm={};
                this.uploadTip=true;
                this.$refs.uploadFile.removeAttribute('src');
                this.freshTotalVote();
            },fileFormat(str,file,i){
                if(!str){
                    return undefined;
                }
                let date = file.lastModifiedDate;
                let dateFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                let timeFormat = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                return str.replace(/{name}/g,file.name.substring(0,file.name.lastIndexOf('.')))
                    .replace(/{index}/g,i.toString()).replace(/{date}/g,dateFormat)
                    .replace(/{time}/g,timeFormat).replace(/{size}/g,(file.size/1024).toFixed(2).toString());
            },multiUploadOk(){
                this.multiUploadForm.files = this.multiUploadFiles;
                if(this.multiUploadForm.name&&this.multiUploadForm.files instanceof Array&&this.multiUploadForm.files.length>0){
                    this.$Message['success']({
                        background: true,
                        content: '正在上传文件，请稍候'
                    });
                    this.$Loading.start();
                    let that = this;
                    let taskArray = [];
                    this.multiUploadForm.files.forEach((file,i)=>{
                        let name=this.fileFormat(this.multiUploadForm.name,file,i);
                        let description=this.fileFormat(this.multiUploadForm.description,file,i);
                        let task = PlateInfo.uploadImage(this.plate.id,name,description,file)
                        .then(data=>{
                            data.likes=0;
                            data.comments=0;
                            data.likeStatus=false;
                            that.images.push(data);
                        }).catch(msg=>{
                            that.sendError(msg);
                        });
                        taskArray.push(task);
                    });
                    Promise.all(taskArray).then(()=>{
                        that.$Message['success']({
                            background: true,
                            content: '上传成功'
                        });
                    }).catch(()=>{
                        that.sendError('上传时发送错误')
                    }).finally(()=>{
                        that.$Loading.finish();
                        that.multiFormReset();
                    });
                } else this.sendError('填完表才能提交呢');
            },multiFormReset(){
                this.multiUploadBoxVisible=false;
                this.multiUploadForm={};
                this.multiUploadFiles=[];
                this.multiUploadTip=true;
                this.freshTotalVote();
            },multiFileSave(file){
                console.log(file);
                if(!file.type.includes('image'))this.sendError(`只能上传图片文件,[${file.name}]格式错误`);
                else if(file.size>15*1024*1024) this.sendError(`图片文件大小不能超过15MB,[${file.name}]大小超出了15MB`);
                else {
                    if(!(this.multiUploadFiles instanceof Array))this.multiUploadFiles =[];
                    this.multiUploadFiles.push(file);
                    this.multiUploadTip = false;
                }
                return false;
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
    .head{
        margin: 8px auto;
    }
    p{
        white-space: nowrap;/*设置不换行*/
        overflow: hidden; /*设置隐藏*/
        text-overflow: ellipsis; /*设置隐藏部分为省略号*/
    }
</style>