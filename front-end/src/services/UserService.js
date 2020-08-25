import Axios from 'axios';
import HttpService from './HttpService'



function getById(userId) {
    return HttpService.get(`user/${userId}`)
}


async function login(userCred) {

    try {
        const user = await HttpService.post('auth/login', userCred);
        return _handleLogin(user)
    } catch (err) {
        throw (err)
    }
}

async function signup(userCred) {
    try {
        const user = await HttpService.post('auth/signup', userCred)
        return _handleLogin(user)
    } catch (err) {
        throw err;
    }
}

async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}


async function uploadImg(ev) {

    const CLOUD_NAME = 'dlzwnajfq';
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', ev.target.files[0]);
    formData.append('upload_preset', 'aeyn7n9g');
    try {
        const res = await Axios.post(UPLOAD_URL, formData);
        return res.data.url;
    } catch (err) {
        console.error(err)
    }
}

async function updateUser(user){
    try {
        const savedUser = await HttpService.put(`user/${user._id}`, user)
        return _handleLogin(savedUser)
    } catch (err) {
        throw err;
    }
}

function isAttend(user , eventId){
    return user.attendedEvents.some(event => event._id === eventId)
}


function findIdxById(user,eventId){

    return user.attendedEvents.findIndex(event => event._id === eventId)
}


export const UserService = {
    login,
    logout,
    signup,
    uploadImg,
    getById,
    updateUser,
    isAttend,
    findIdxById,
    
   
}

















