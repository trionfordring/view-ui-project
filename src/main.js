import Vue from 'vue';
import ViewUI from 'view-design';
import VueRouter from 'vue-router';
import Routers from './router';
import App from './app.vue';
import Axios from "axios";
import VueAxios from "vue-axios";
import 'view-design/dist/styles/iview.css';
import UserInfo from './libs/UserInfo'

Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(VueAxios,Axios)

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    if(UserInfo.hasScanned) next();
    else UserInfo.hasLogin().catch(()=>{}).finally(()=>next());
});

router.afterEach((to, from, next) => {
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
