
import React from 'react'
import { Link } from 'react-router-dom'
import * as moment from 'moment'

import avatar from '../img/avatar.jpg'

export function ReviewPreview(props) {

    const { review } = props
    const { user } = review
    const createAt = moment(review.createdAt).fromNow();


    return (
        <div className="review-msg">
            
            {(user) &&  <Link to={`/user/${user._id}`}> <img className="userImg-review" src={(user.imgUrl) ? user.imgUrl : avatar} alt=""/> </Link>}
            {(!user) && <img className="userImg-review" src={avatar} alt=""/>}
            
            <div className="review-detail">
                <div className="review-name-date">
                {(user) && <Link to={`/user/${user._id}`}><p className="user-name">{review.user.username}</p></Link>}
                {(!user) && <p className="user-name">guest</p>}   
                <p className="msg">{review.msg}</p>
                <p className="time">{createAt}</p>
                </div>
            </div>

        </div>
    )
}

