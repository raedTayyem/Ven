import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Like } from '../img/icons/like.svg'
import moment from 'moment'
import avatar from '../img/avatar.jpg'

import { loadEvents } from '../store/actions/EventActions'
import { connect } from 'react-redux';
import { SocketService } from '../services/SocketService';


class _EventPreview extends React.Component {


    componentDidMount() {
        SocketService.setup()
        SocketService.on('new like', () => this.props.loadEvents());
    }

    componentWillUnmount() {
        SocketService.off('new like', () => this.props.loadEvents());
    }

    render() {
        const { event } = this.props
        const price = (event.price === 0) ? "Free" : "$" + event.price;
        const userImg = (event.createdBy.imgUrl) ? event.createdBy.imgUrl : avatar;

        return (
            <div className="event-preview">
                <Link to={`/event/${event._id}`}>
                    <img className="event-img" src={event.imgUrls[0]} alt=""/>
                </Link>
                <Link to={`/user/${event.createdBy._id}`} className="user-prev">
                    <img className="userImg-preview" src={userImg} alt=""></img>
                </Link>
                <h5 className="attendees">{event.attendees.length}/{event.capacity}<i className="far fa-user"></i></h5>
                <div className="event-content">
                    <div className="preview-like">
                        <Like />
                        <p>{event.likes.length}</p>
                    </div>

                    <div className="event-content">
                        <div className="event-price-title">
                            <h3>{event.title}</h3>
                            <p className={`event-price ${(event.price === 0) ? 'free' : ''}`}>{price}</p>
                        </div>
                        <div>
                            <div className="event-time-place">
                                <p>{event.place}</p>
                                <p>{moment.unix(event.startAt).format("LL")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


const mapDispatchToProps = {
    loadEvents,
};

export const EventPreview = connect(null, mapDispatchToProps)(_EventPreview);