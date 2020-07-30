import index from "./views/index";
import userAuthority from "./views/userAuthority";
import loginBox from "./component/loginBox";
import registerBox from "./component/registerBox";
import registerStep from "./component/authority/steps/registerStep";
import mailSendStep from "./component/authority/steps/mailSendStep";
import mailVerifyStep from "./component/authority/steps/mailVerifyStep";
import studentAuthStep from "./component/authority/steps/studentAuthStep";
import registerSuccessStep from "./component/authority/steps/registerSuccessStep";
import mainPage from "./views/mainPage"
import findbackBox from "./component/findbackBox";
import plateView from "./views/mainPage/plateView";
import plateList from "./component/plateList";
import imageList from "./component/imageList";
import imageView from "./views/mainPage/imageView";

const routers = [
    {
        path: '/',
        meta: {
            title: '跳板'
        },
        component: index
    },{
        path: '/authority',
        name: 'authority',
        meta: {
            title: '用户授权'
        },
        //redirect:'/authority/login',
        component: userAuthority,
        children:[
            {
                path:'login',
                component: loginBox,
                name:'login'
            },{
                path: 'register',
                name: 'register',
                meta: {
                    root:'/authority/register',
                },
                component: registerBox,
                children:[
                    {
                        path:'0',
                        component:registerStep
                    },
                    {
                        path:'1',
                        component:mailSendStep
                    },
                    {
                        path:'2',
                        component:mailVerifyStep
                    },
                    {
                        path:'3',
                        component:studentAuthStep
                    },
                    {
                        path:'4',
                        component:registerSuccessStep
                    }
                ]
            },{
                path:'find',
                name:'findBack',
                component:findbackBox
            }
        ]
    },{
        path:'/index',
        name:'mainPage',
        component:mainPage,
        redirect:'/index/plate',
        children:[
            {
                path: 'plate',
                name: 'plate',
                component: plateView,
                redirect:'/index/plate/list',
                children: [
                    {
                        path:'list',
                        name:'plateList',
                        component: plateList
                    },{
                        path: 'images/:id',
                        name:'imageList',
                        component: imageList
                    },{
                        path: 'image/:id',
                        name:'image',
                        component: imageView
                    }
                ]
            },{
                path: 'authority',
                name: 'continueAuthority',
                meta:{
                    root:'/index/authority',
                },
                component: registerBox,
                children:[
                    {
                        path:'1',
                        component:mailSendStep
                    },
                    {
                        path:'2',
                        component:mailVerifyStep
                    },
                    {
                        path:'3',
                        component:studentAuthStep
                    },
                    {
                        path:'4',
                        component:registerSuccessStep
                    }
                ]
            }
        ]
    }
];
export default routers;