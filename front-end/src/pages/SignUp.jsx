import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { signup } from '../store/actions/UserActions'
import { UserService } from '../services/UserService'

class _SignUp extends Component {

    state = {
        user: {
            username: '',
            email: '',
            password: '',
            imgUrl: '',
            dsc: ''
        },
        msg: ''
    }

    onHandelChange = async (ev) => {

        const { target } = ev;
        const field = target.name;
        const value = target.value;

        if (field === 'imgUrl') {
            try {
                const savedImgUrl = await UserService.uploadImg(ev);
                this.setState(prevState => ({ user: { ...prevState.user, [field]: savedImgUrl } }))
            } catch (err) {
                console.log('sign-up cmp: cannot upload img')
            }
        } else
            this.setState(prevState => ({ user: { ...prevState.user, [field]: value } }))
    }


    onHandelSubmit = async (ev) => {
        ev.preventDefault();
        const userCreds = this.state.user;
        try {
            await this.props.signup(userCreds);
            this.props.history.push('/');
        } catch (err) {
            this.setState(prevState => ({ user: { ...prevState.user, username: '', email: '', password: '' } }))
            this.setState({ msg: 'All inputs are required!' });
        }

    }

    render() {
        return (
            <div className="signupForm">
                <form onSubmit={this.onHandelSubmit}>
                    <h1>Sign Up</h1>
                    <input type="text" name="username" placeholder="Full name" onChange={this.onHandelChange} />
                    <input type="text" name="email" placeholder="Email" onChange={this.onHandelChange} />
                    <input type="password" name="password" placeholder="Password" onChange={this.onHandelChange} />
                    <input name="imgUrl" type="file" onChange={this.onHandelChange}></input>
                    <textarea type="text" name="dsc" placeholder="description..." onChange={this.onHandelChange} />
                    <p style={{ color: "red", fontSize: "0.8rem" }}>{this.state.msg}</p>
                    <button>Sign Up</button>
                    <p>Already have an account? <Link to="/login">Login Here</Link></p>
                </form>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.users.loggedInUser
    }
}

const mapDispatchToProps = {
    signup,
}

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp)