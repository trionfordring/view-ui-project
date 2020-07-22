import config from "../config/config";
import Axios from "axios";

const hasLoginURL = '/user/hasLogin';
const userDetailsURL = '/user/details';
const loginURL = '/user/login';
const registerURL = '/user/register';
const nameExistURL = '/user/exist/';

const axios = Axios.create({
    withCredentials:true,
    baseURL:config.host,
    headers : {
        "Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'
    },
});



let json={
    status:200,
    data:{},
    message:''
}

/**
 * 如果用户已登录，resolve
 * 否则reject
 */
async function hasLogin(){
    await axios.get(hasLoginURL).then(result=>{
        json = result.data;
    });
    return new Promise(async (resolve, reject) => {
        exp.loginStatus = json.data.hasLogin;
        if(json.data.hasLogin){
            await freshUserInfo().then(()=>{
                resolve();
            }).catch((error)=>{
                throw error;
            })
        }else {
            reject();
        }
    })
}

/**
 * 更新用户信息
 */
async function freshUserInfo() {
    await axios.get(userDetailsURL).then(result=>{
        json = result.data;
        exp.user = Object.assign(exp.user,json.data);
    },()=>{
        throw new Error("请求用户信息失败");
    })
}

/**
 * 登录
 * 参数:name:'name',password:'123',remember?:true
 */
async function login(name,password,remember) {
    let formed = new FormData();
    formed.append('name',name);
    formed.append('password',password);
    formed.append('remember',remember);
    await axios.post(loginURL,formed).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
        console.log(error.response.data.message)
    });
    return new Promise((resolve, reject) => {
        if(200 === json.status){
            exp.user = Object.assign(exp.user,json.data);
            resolve();
        }else{
            reject(json.message);
        }
    })
}

/**
 * 注册
 * @param name
 * @param password
 * @param captcha
 */
async function register(name,password,captcha){
    let formed = new FormData();
    formed.append('name',name);
    formed.append('password',password);
    formed.append('verify',captcha);
    await axios.post(registerURL,formed).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
       if(200===json.status){
           exp.user = Object.assign(exp.user,json.data);
           resolve();
       }else {
           reject(json.message);
       }
    });
}

/**
 * 判断用户名是否已存在
 * @param name
 */
async function nameExist(name){
    let formed = new FormData();
    formed.append('name',name);
    await axios.post(nameExistURL,formed).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status&&json.data.exist===true){
            resolve();
        }else {
            reject();
        }
    });
}


let exp = {
    hasLogin,
    freshUserInfo,
    login,
    register,
    nameExist,
    loginStatus:false,
    user:{
        username:String,
        description:String,
        studentId:String,
        authorities:Array,
        roles:Array,
        email:String,
        phone:String
    }
};
export default exp;