<template>
    <Layout theme="dark">
        <Header>
            <Menu mode="horizontal" theme="dark" @on-select="select">
                <Submenu name="head">
                    <template slot="title" >
                        <img class="head" :src="headUrl" onerror="this.src='/static/images/defaultHead.jpg';this.onerror=null;"/>
                    </template>
                    <MenuGroup :title="'用户:'+user.username">
                        <MenuItem name="info">个人资料</MenuItem>
                        <MenuItem name="logout">退出登录</MenuItem>
                    </MenuGroup>
                </Submenu>
            </Menu>
        </Header>
        <Content>
            <Modal v-model="headCropperShow" @on-ok="sureCropHead" scrollable draggable title="编辑头像">
                <div class="head-crop-warp">
                    <img class="new-head" ref="newHead" :src="headUrl" onerror="this.src='/static/images/defaultHead.jpg';this.onerror=null;"/>
                </div>
            </Modal>
            <Drawer :closable="false" width="640" v-model="showDrawer">
                <h2>用户信息</h2>
                <Divider/>
                <div class="info">
                    <Row>
                        <Col span="10">
                            <Row>
                                <upload
                                        action="https://fordring.icu/user/head"
                                        :before-upload="updateHead"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="1024*15"
                                >
                                    <Tooltip content="点击上传新头像">
                                        <img :click="updateHead" class="head-info" :src="headUrl" onerror="this.src='/static/images/defaultHead.jpg';this.onerror=null;"/>
                                    </Tooltip>
                                </upload>
                            </Row>
                        </Col>
                        <Col span="14">
                            <Row>
                                <Col span="5"><b><p>用户名：</p></b></Col>
                                <Col span="19"><p>{{user.username}}</p></Col>
                            </Row>
                            <Row>
                                <Col span="5"><b><p>姓名：</p></b></Col>
                                <Col span="19"><p>{{user.realName}}</p></Col>
                            </Row>
                            <Row>
                                <Col span="5"><b><p>学号：</p></b></Col>
                                <Col span="19"><p>{{user.studentId}}</p></Col>
                            </Row>
                            <Row>
                                <Col span="5"><b><p>邮箱：</p></b></Col>
                                <Col span="19"><p>{{user.email}}</p></Col>
                            </Row>
                            <Row>
                                <Col span="5"><b><p>手机：</p></b></Col>
                                <Col span="19"><p>{{user.phone}}</p></Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <br>
                <Row>
                    <Col span="4"><b>简介：</b></Col>
                    <Col span="17">
                        <Dropdown :transfer="true" trigger="contextMenu" :visible="visible" class="description">
                            <Tooltip class="description" content="右键启用编辑" :disabled="!readOnly">
                                <Input v-model="user.description" type="textarea" :readonly="readOnly"></Input>
                            </Tooltip>
                            <DropdownMenu slot="list">
                                <DropdownItem name="edit" style="color: #ff9900" >启用编辑</DropdownItem>
                                <DropdownItem name="clear" style="color: #ed4014">清空内容</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                <Divider/>
            </Drawer>
            <h1>这是主页</h1>
        </Content>
    </Layout>
</template>

<script>
    import UserInfo from '../libs/UserInfo';
    const constHeadUrl = 'https://fordring.icu/user/head';
    let localData={
        showDrawer:false,
        readOnly:true,
        cropper:null,
        headCropperShow:false,
        crop:null,
        rand:Math.random()
    };
    localData.user = UserInfo.user;
    export default {
        name: "mainPage",
        data(){
            return localData;
        },computed:{
            headUrl(){
                return constHeadUrl+'?'+this.rand;
            }
        },
        mounted() {
            let that = this;
            UserInfo.freshUserInfo().then(()=>{
                that.$Spin.hide();
            }).catch(msg=>{
                that.$Message['error']({
                    background: true,
                    content: msg,
                    duration:5
                });
                that.$router.replace({name:'login'});
            });
        },
        methods:{
            freshHead(){
                this.rand = Math.random();
            },
            updateHead(file){
                if(file.type.split('/')[0]!=='image'){
                    this.$Message['error']({
                        background: true,
                        content: '文件格式有误，请上传图片文件',
                        duration:5
                    });
                    return false;
                }
                let that = this;
                let reader = new FileReader();
                reader.onload=function(res){
                    that.$refs.newHead.src=res.target.result;
                    that.crop = $(that.$refs.newHead).cropper({
                        viewMode: 2,
                        dragMode: 'move',
                        initialAspectRatio: 1,
                        aspectRatio: 1,
                        background: false,
                        autoCropArea: 0.6,
                        zoomOnWheel: true,
                    });
                    that.headCropperShow=true;
                };
                reader.readAsDataURL(file);
                return false;
            },sureCropHead(){
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
                let canvas = this.crop.cropper('getCroppedCanvas');
                let that = this;
                canvas.toBlob(file=>{
                    UserInfo.updateHead(file).then(()=>{
                        that.freshHead();
                        that.$Message['success']({
                            background: true,
                            content: '头像更新成功',
                            duration:5
                        });
                    }).catch(msg=>{
                        that.$Message['error']({
                            background: true,
                            content: msg,
                            duration:5
                        });
                    }).finally(()=>that.$Spin.hide());
                },'image/jpg');
            },
            select(name){
                switch (name) {
                    case 'logout':
                        this.logout();
                        break;
                    case 'info':
                        this.info();
                        break;
                }
            },
            selectDes(name){
                function edit() {
                    this.readOnly=false;
                }
                switch (name) {
                    case 'edit':
                        call(this,edit);
                        break;
                }
            },
            logout(){
                let that = this;
                UserInfo.logout().then(()=>{
                    that.$router.replace({name:'login'});
                    that.$Notice.info({
                        title: '退出成功',
                        desc: '请您重新登录'
                    });
                }).catch(msg=>{
                    that.$Message['error']({
                        background: true,
                        content: msg,
                        duration:3
                    });
                })
            },info(){
                this.showDrawer=true;
            }
        }
    }
</script>

<style scoped>
    .head{
        height: 55px;
        width: auto;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        top: 50%;
        transform: translateY(10%);
    }
    .head-info{
        height: 164px;
        width: auto;
        border-radius: 5%;
        cursor: pointer;
        position: relative;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
    }
    .head-info:hover{
        position: relative;
        filter: brightness(120%);
        transform: translateY(-3%);
        transition: 100ms;
        box-shadow: 0 3px 6px rgba(0,0,0,.3);
    }
    .info b,.info p{
        margin-top: 5px;
        font-size: 1.1em;
    }
    .description{
        cursor: pointer;
        width: 100%;
    }
    .head-crop-warp{
        max-height: 50vh;
        max-width: 70vw;
        overflow: hidden;
    }
</style>