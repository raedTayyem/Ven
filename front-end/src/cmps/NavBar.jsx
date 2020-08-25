import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import avatar from '../img/avatar.jpg'
import logo from '../../src/img/logo-stright.png'
import { logout } from '../store/actions/UserActions'
import { Modal } from './Modal'

export class _NavBar extends Component {

    state = {
        currentScrollHeight: 0,
        display: 'none',
        searchValue: '',
        isOpenModal: false,
        toggleNav: 'links'
    }

    componentDidMount() {

        window.onscroll = () => {
            const newScrollHeight = Math.ceil(window.scrollY / 50) * 50;
            if (this.state.currentScrollHeight !== newScrollHeight) {
                this.setState({ currentScrollHeight: newScrollHeight })
                this.setState({ display: 'flex' })
            }
        }
    };

    toggleClass = () => {
        if (this.state.toggleNav === 'links') {
            this.setState({ toggleNav: 'nav-active' })
        } else {
            this.setState({ toggleNav: 'links' })
        }
    }

    onHandelChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ [field]: value.toLowerCase() });
    }

    onLogout = async () => {

        await this.props.logout();
        this.props.history.push('/')
    }


    onRemoveModal = () => {
        this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }))
    }

    render() {
        const opacity = Math.min(this.state.currentScrollHeight / 100, 1)
        const navBgc = `rgb(247, 255, 255,${opacity})`
        const border = `rgb(229, 229, 229,${opacity})`
        const display = (this.state.currentScrollHeight > 250) ? this.state.display : 'none';
        const { user } = this.props

        return (
            <nav className="navbar" style={{ backgroundColor: navBgc, borderBottom: `1px solid ${border}` }}>
                <div className="navbar-content container">
                    <Link className="logo" to="/"><img src={logo} alt=""></img></Link>
                    <div className="nav-search" style={{ display: display }}>
                        <Link to={`/events/search=${this.state.searchValue}`}>
                            <i className="fas fa-search"></i>
                        </Link>
                        <input type="text" onChange={this.onHandelChange} name="searchValue" />
                    </div>
                    <div className='burger btn' onClick={this.toggleClass}>
                        <div className='line1'></div>
                        <div className='line2'></div>
                        <div className='line3'></div>
                    </div>
                    <ul className={this.state.toggleNav}>
                        <li><Link className="logo" to="/"><img src={logo} alt=""></img></Link></li>
                        <li onClick={() => {
                            if (user) this.props.history.push('/edit')
                            else this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }))
                        }} className="creat-event">Create Event</li>
                        {(!user) &&
                            <>
                                <li><Link to="/signup">Register</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </>}
                        {(user) &&
                            <>
                                <li className="logout" onClick={this.onLogout}>Logout</li>
                                <li><Link to={`/user/${user._id}`}><img className="userImg-preview" src={(user.imgUrl) ? user.imgUrl : avatar} alt=""/></Link></li>
                            </>
                        }

                    </ul>
                </div>
                { (this.state.isOpenModal) && <Modal onRemoveModal={this.onRemoveModal}>
                        <div>Creating an event requires login</div>
                        <button className="login-modal-btn nav-bar" onClick={() => {
                            this.setState(prevState => ({ isOpenModal: false }))
                        }}><Link to="/login">LOGIN</Link></button>
                        <div className="signup">
                            <p>New member?</p> <Link to="/signup">Sign up</Link>
                        </div>
                </Modal>}
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.loggedInUser,
    };
};

const mapDispatchToProps = {
    logout
};

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_NavBar));











