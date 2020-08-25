import { UtilService } from './UtileService'
import HttpService from './HttpService'
import Axios from 'axios';
import moment from 'moment'

function query(filterBy, sortBy) {
   
	var queryStr = '';
	if (filterBy) {
		if (filterBy.title) queryStr += `&title=${filterBy.title}`;
        if (filterBy.category) queryStr += `&category=${filterBy.category}`;
        if (filterBy.isFree) queryStr += `&isFree=${filterBy.isFree}`
        if (filterBy.thisWeek) queryStr += `&thisWeek=${filterBy.thisWeek}`
    }

    if (sortBy) {
        if (sortBy === 'new') queryStr += `&sort=new&order=1`;
        if (sortBy === 'price') queryStr += `&sort=price&order=1`;
        if (sortBy === 'date') queryStr += `&sort=date&order=-1`;
    }

    return HttpService.get(`event?${queryStr}`);
}

function getById(eventId) {
    return HttpService.get(`event/${eventId}`);
}


function addReview(event, review) {

    review.createdAt = Date.now();
    review._id = UtilService.makeId();
    event.reviews.push(review);
    save(event);
}


async function save(event) {
    var savedEvent; 
    if (!event._id) {
        
        const timestamp = moment.utc(event.startAt).unix()
        event.startAt = timestamp
        event.likes = []
        event.createdAt = Date.now();
        event.attendees = [];
        event.reviews = [];
        savedEvent  = await HttpService.post('event', event);
    }
    else {
        savedEvent  = await HttpService.put(`event/${event._id}`, event);
        
    }
    return savedEvent;
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

function findIdxById(event , userId){
    return event.attendees.findIndex(user => user._id === userId)
}



export const EventService = {
    query,
    getById,
    addReview,
    save,
    uploadImg,
    findIdxById
}

