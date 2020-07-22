<template>
    <div class="background">
        <Layout class="layout">
            <Header class="head">
                <Menu mode="horizontal" theme="dark" :active-name="active" style="float: right" @on-select="selectMenu">
                    <MenuItem name="login"><Tooltip content="打开登录界面">
                        <p><Icon type="ios-cloudy-outline"/> 登录</p>
                    </Tooltip></MenuItem>
                    <MenuItem name="register"><Tooltip content="打开注册界面">
                        <p><Icon type="ios-create-outline" /> 注册</p>
                    </Tooltip></MenuItem>
                    <MenuItem name="findBack"><Tooltip content="打开密码找回界面">
                        <p><Icon type="md-clipboard" /> 找回密码</p>
                    </Tooltip></MenuItem>
                </Menu>
            </Header>
            <Content>
                <div class="content">
                    <router-view></router-view>
                </div>
            </Content>
            <Footer class="layout-footer-center">Copyright © 2020 fordring.icu | 苏ICP备20005549号</Footer>
        </Layout>

    </div>
</template>

<script>
    export default {
        name: "userAuthority",
        data(){
          return{
              active:'login'
          }
        },
        methods:{
            selectMenu(name){
                this.$router.push({name:name})
            }
        },mounted() {
            this.$Spin.hide();
            this.$router.push({name:this.active})
        }
    }
</script>

<style scoped>
    p{
        font-size: 1.15em;
    }
    .content{
        height: 83vh;
        position: relative;
    }
    .layout-footer-center{
        text-align: center;
    }
    .layout{
        background: #f5f7f9;
        overflow: hidden;
        height: 100vh;
    }
</style>