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
                component: registerBox,
                children:[
                    {
                        path:'0',
                        name:'register0',
                        component:registerStep
                    },
                    {
                        path:'1',
                        name:'register1',
                        component:mailSendStep
                    },
                    {
                        path:'2',
                        name:'register2',
                        component:mailVerifyStep
                    },
                    {
                        path:'3',
                        name:'register3',
                        component:studentAuthStep
                    },
                    {
                        path:'4',
                        name:'register4',
                        component:registerSuccessStep
                    }
                ]
            }
        ]
    },{
        path:'/index',
        component:mainPage,
        name:'mainPage'
    }
];
export default routers;