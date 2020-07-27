import config from "../config/config";
import Axios from "axios";


const plateAllURL = '/plate/all';
const plateGetURL = '/plate/';
const platePostURL = '/plate';
const getAllImageURL='/image/all/';
const likeURL = '/image/like/';
const dislikeURL = '/image/dislike/';

const plateData = {
    id: '',
    name: '',
    description: '',
    startTime: 0,
    endTime: 0,
    owner: {
        description: '',
        email: '',
        phone: '',
        realName: '',
        studentId: '',
        username: ''
    },
    createTime: 0,
};

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

async function getAllPlate() {
    await axios.get(plateAllURL).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status){
            let d = json.data;
            resolve(d,json.message);
        }else {
            reject(json.message);
        }
    });
}

/**
 * 创建板块
 * @param plate
 */
async function createPlate(plate) {
    if(plate.startTime instanceof Date)plate.startTime=plate.startTime.getTime().toString();
    if(plate.endTime instanceof Date)plate.endTime=plate.endTime.getTime().toString();
    let formed = new FormData();
    formed.append('name',plate.name);
    formed.append('description',plate.description);
    formed.append('startTime',plate.startTime);
    formed.append('endTime',plate.endTime);
    await axios.post(platePostURL,formed).then(result=>{
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

async function selectById(id){
    await axios.get(plateGetURL+id).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status){
            let d = json.data;
            resolve(d,json.message);
        }else {
            reject(json.message);
        }
    });
}

/**
 * 获取所有图片组成的数组
 * @param pid
 */
async function getAllImages(pid){
    await axios.get(getAllImageURL+pid).then(result=>{
        json = result.data;
    }).catch(error=>{
        json = error.response.data;
    });
    return new Promise((resolve, reject) => {
        if(200===json.status){
            let d = json.data.images;
            resolve(d,json.message);
        }else {
            reject(json.message);
        }
    });
}

async function like(iid){
    await axios.post(likeURL+iid).then(result=>{
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
async function disLike(iid){
    await axios.post(dislikeURL+iid).then(result=>{
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


let exp = {
    getAllPlate,
    plateData:plateData,
    selectById,
    createPlate,
    getAllImages,
    like,disLike
};
export default exp;