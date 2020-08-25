import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { loadUser } from '../store/actions/UserActions'
import avatar from '../img/avatar.jpg'



class _UserDetails extends Component {

    componentDidMount() {
        const { userId } = this.props.match.params;
        this.props.loadUser(userId);
    }

    render() {
        const { user } = this.props;

        return (
            (user) &&
            <section className="user-page">
                <div className='top-bgc'></div>
                <div className="profile container">
                    <div className="profile-top">
                        <div className="user-img">
                            <img src={(user.imgUrl) ? user.imgUrl : avatar} alt="" />
                        </div>
                        <div className="main-profile">
                            <h2>{user.username}</h2>
                            <div className="icons-desc-container">
                                <p className="user-desc">{user.dsc}</p>
                                <div className="icons">
                                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-twitter fa-lg"></i>
                                    </a>
                                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook fa-lg"></i>
                                    </a>
                                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin fa-lg"></i>
                                    </a>
                                    <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-youtube fa-lg"></i>
                                    </a>
                                    <a href="https://instegram.com/" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram fa-lg"></i>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="profile-event">

                        <div className="attended-events">
                            <h1>
                                <i className="fas fa-calendar-week"></i> {`${user.username.split(' ')[0]}'s Events`}
                            </h1>
                            <div className="line"></div>
                            <div className="user-event-list">
                                {user.attendedEvents.map((event, idx) => {
                                    if (idx < 2) return (<div className="event" kay={idx}>
                                        <Link to={`/event/${event._id}`}>
                                            <img className="event-img-user-details" src={event.imgUrl} alt=""></img>
                                            <div className="event-info">
                                                <h3 className="event-title">{event.title}</h3>
                                                <p className="event-desc"> {event.desc}</p>
                                            </div>
                                        </Link>
                                    </div>)
                                })}
                            </div>

                        </div>

                        <div className="attended-events">
                            <h1>
                                <i className="fas fa-calendar-week"></i>{` ${user.username.split(' ')[0]}'s created Events`}
                            </h1>
                            <div className="line"></div>
                            <div className="user-event-list">
                                {user.createdEvents.map((event, idx) => {
                                    if (idx < 2) return (<div className="event" key={idx}>
                                        <Link to={`/event/${event._id}`}>
                                            <img className="event-img-user-details" src={event.imgUrl} alt=""></img>
                                            <div className="event-info">
                                                <h3 className="event-title">{event.title}</h3>
                                                <p className="event-desc"> {event.desc}</p>
                                            </div>

                                        </Link>
                                    </div>)
                                })}
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.currUser
    }
}

const mapDispatchToProps = {
    loadUser
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)

