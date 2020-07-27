<template>
    <Drawer
            title=" "
            :value="open"
            @on-close="close"
            width="600"
    >
        <Card>
            <h1>新建板块</h1>
            <Divider/>
            <br>
            <Row>
                <Col span="4" offset="1"><p><span>板块名:</span></p></Col>
                <Col span="16"><Input v-model="newPlate.name" size="large" placeholder="输入板块名"></Input></Col>
            </Row>
            <br>
            <Row>
                <Col span="4" offset="1"><p><span>活动时间:</span></p></Col>
                <Col span="16">
                    <DatePicker v-model="dateArray" size="large" confirm :editable="false" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择活动时间" style="width: 100%"></DatePicker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4" offset="1"><p><span>简介:</span></p></Col>
                <Col span="16">
                    <Input v-model="newPlate.description" maxlength="254" show-word-limit :autosize="{minRows:4,maxRows:14}" placeholder="输入简介" type="textarea"></Input>
                </Col>
            </Row>
            <br>
            <Divider/>
            <div class="buttons">
                <Button size="large" @click="reset">取消</Button>
                <Button size="large" type="primary" @click="submit">提交</Button>
            </div>
        </Card>
    </Drawer>
</template>

<script>
    import PlateInfo from '../libs/PlateInfo'
    export default {
        name: "plateCreator",
        model:{
            prop:'open',
            event:'on-close'
        },props:{
            open:Boolean
        },data(){
            return{
                newPlate:Object.create(PlateInfo.plateData),
                dateArray:null
            }
        },methods:{
            close(){
                this.$emit('on-close',false);
            },reset(){
                this.close();
            },submit(){
                let that = this;
                PlateInfo.createPlate(this.newPlate).then(msg=>{
                    that.$Message['success']({
                        background: true,
                        content: msg,
                        duration:4
                    });
                    this.freshPlateList();
                }).catch(msg=>{
                    that.$Message['error']({
                        background: true,
                        content: msg,
                        duration:4
                    });
                }).finally(()=>that.close());
            },freshPlateList(){
                this.$emit('fresh-plate-list');
            }
        },watch:{
            dateArray(v){
                if(v instanceof Array&&v.length>=2){
                    this.newPlate.startTime=v[0];
                    this.newPlate.endTime = v[1];
                }
            }
        }
    }
</script>

<style scoped>
    p{
        height: 40px;
        text-align: center;
        vertical-align:middle;
        display: table-cell;
        margin: 0 auto;
    }
    .buttons{
        text-align: right;
        margin: 12px;
    }
</style>