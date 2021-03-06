import config from "../config/config";
import Axios from "axios";

const hasLoginURL = '/user/hasLogin';
const userDetailsURL = '/user/details';
const loginURL = '/user/login';
const registerURL = '/user/register';
const nameExistURL = '/user/exist/';
const mailSendURL = '/verify/mail';
const mailVerifyURL='/verify/mail';
const studentVerifyURL='/verify/student/';
const logoutURL='/user/logout';
const headURL = '/user/head';
const updateDesURL = '/user/description';
const getRoleByNameURL = '/role/';

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
};

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
        exp.hasScanned = true;
        if(json.data.hasLogin){
            await freshUserInfo().then(()=>{
                resolve();
            }).catch(msg=>{
                reject(msg)
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
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200 === json.status){
            exp.user = Object.assign(exp.user,anonymous,json.data);
            exp.loginStatus=true;
            resolve();
        }else{
            reject(json.message);
        }
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
    await axios.post(nameExistURL+name).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status&&json.data.exist===true){
            resolve();
        }else {
            reject(json.message);
        }
    });
}

/**
 * 发送验证邮件
 * @param mail
 */
async function mailSend(mail){
    let formed = new FormData();
    formed.append('mail',mail);
    await axios.post(mailSendURL,formed).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status){
            exp.user.email=mail;
            resolve();
        }else {
            reject(json.message);
        }
    })
}

/**
 * 验证邮箱
 * @param captcha
 */
async function verifyMail(captcha){
    let formed = new FormData();
    formed.append('mail',exp.user.email);
    formed.append('captcha',captcha);
    await axios.patch(mailVerifyURL,formed).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status){
            resolve();
        }else {
            reject(json.message);
        }
    });
}

/**
 * 学生认证
 * @param id
 */
async function verifyStudent(id){
    await axios.post(studentVerifyURL+id).then(result=>{
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
 * 用户退出登录
 */
async function logout(){
    await axios.get(logoutURL).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status){
            exp.loginStatus=false;
            exp.hasScanned=false;
            exp.user = Object.assign(exp.user,anonymous);
            resolve();
        }else {
            reject(json.message);
        }
    });
}

/**
 * 更新头像
 * @param file
 */
async function updateHead(file){
    let formed = new FormData();
    formed.append('head',file);
    await axios.put(headURL,formed).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status){
            resolve();
        }else {
            reject(json.message);
        }
    });
}

/**
 * 更新简介
 * @param des
 */
async function updateDescription(des) {
    let formed = new FormData();
    formed.append('description',des);
    await axios.put(updateDesURL,formed).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status){
            resolve(json.message);
        }else {
            reject(json.message);
        }
    });
}

/**
 * 通过角色名查询角色
 * @param name
 */
async function getRoleByName(name){
    await axios.get(getRoleByNameURL+name).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status){
            resolve(json.data,json.message);
        }else {
            reject(json.message);
        }
    });
}

const anonymous={
    username:'未登录',
    description:'无',
    studentId:'未认证',
    authorities:[],
    roles:[
        {
            name:'ANONYMOUS',
            description:'匿名'
        }
    ],
    email:'未认证',
    phone:'未认证',
    realName:'未认证',
    hasAuthority(auth){
        return exp.user.authorities.some(v=>{
            return v.name===auth;
        });
    }
};

let exp = {
    hasLogin,
    freshUserInfo,
    login,
    register,
    nameExist,
    loginStatus:false,
    mailSend,
    verifyMail,
    verifyStudent,
    logout,
    updateHead,
    updateDescription,
    getRoleByName,
    user:Object.create(anonymous),
    hasScanned:false
};
export default exp;