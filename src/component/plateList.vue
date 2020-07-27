<template>
    <div class="plate-warp">
        <Card>
            <h2><Icon type="md-cube" />板块列表:</h2>
            <div class="list-warp">
                <Table
                        :row-class-name="getRowStyle"
                        @on-row-click="selectRow"
                        max-height="600"
                        :columns="plateColumn"
                        :data="plateList"
                >
                    <template slot-scope="{row}" slot="createTime">
                        <Time :time="row.createTime"></Time>
                    </template>
                    <template slot-scope="{row}" slot="startTime">
                        <Time type="datetime" :time="row.startTime"></Time>
                    </template>
                    <template slot-scope="{row}" slot="endTime">
                        <Time type="datetime" :time="row.endTime"></Time>
                    </template>
                </Table>
            </div>
        </Card>
    </div>
</template>

<script>
    import PlateInfo from '../libs/PlateInfo';
    let localdata={
        plateList:[],
        currentPage:1,
        pageSize:8,
        plateColumn:[
            {title: '板块名',key:'name',tooltip:true},
            {title: '简介',key:'description',tooltip:true},
            {title: '起始时间',key:'startTime',slot: 'startTime',sortable: true},
            {title: '结束时间',key:'endTime',slot:'endTime',sortable: true},
            {title: '创建者',key: 'ownerName',tooltip:true},
            {title: '创建时间',key:'createTime',slot: 'createTime',sortable: true,sortType:'desc'}
        ]
    };
    export default {
        name: "plateList",
        props:{
            plateStatus:Number
        },
        data(){
            return localdata;
        },mounted() {
            this.fresh();
        },methods:{
            selectRow(row){
                this.$router.push({path:'./images/'+row.id});
            },getRowStyle(){
                return 'row-style';
            },fresh(){
                PlateInfo.getAllPlate().then(data=>{
                    this.plateList=data.plates;
                })
            }
        },watch:{
            plateStatus(){
                this.fresh();
            }
        }
    }
</script>

<style scoped>
    .plate-warp .list-warp{
        margin: 0 auto;
    }
    .plate-warp{
        width: 90vw;
        margin: 1vh auto;
    }
</style>
<style>
    .ivu-table .row-style td{
        cursor: pointer;
    }
</style>