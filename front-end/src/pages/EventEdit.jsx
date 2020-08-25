import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { EventService } from '../services/EventService';
import { loadEvent, saveEvent } from '../store/actions/EventActions';
import { updateUser } from '../store/actions/UserActions';
import { Modal } from '../cmps/Modal';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class _EventEdit extends Component {
  state = {
    event: {
      title: '',
      desc: '',
      category: '',
      price: '',
      startAt: new Date(),
      place: '',
      createdBy: '',
      capacity: '',
      imgUrls: [],
    },
    msg: '',
    amptyInputClass: '',
    isOpenModal: false,
    categories: [
      { name: 'Sport', className: 'fas fa-basketball-ball fa-1x' },
      { name: 'Outdoors', className: 'fas fa-campground  fa-1x' },
      { name: 'Traveling', className: 'fas fa-plane fa-1x' },
      { name: 'Culinary', className: 'fas fa-utensils fa-1x' },
      { name: 'Gaming', className: 'fas fa-gamepad fa-1x' },
      { name: 'Health', className: 'fas fa-heartbeat fa-1x' },
      { name: 'Arts & Culture', className: 'fas fa-palette fa-1x' },
      { name: 'Pets', className: 'fas fa-paw fa-1x' },
      { name: 'Tech', className: 'fas fa-microchip fa-1x' },
      { name: 'Family', className: 'fas fa-home fa-1x' },
      { name: 'Learning', className: 'fas fa-graduation-cap fa-1x' },
      { name: 'Photography', className: 'fas fa-camera-retro fa-1x' },
      { name: 'Writing', className: 'fas fa-pen-square fa-1x' },
      { name: 'Music', className: 'fas fa-music fa-1x' },
      { name: 'Film', className: 'fas fa-film fa-1x' },
      { name: 'Dance', className: 'fas fa-child fa-1x' },
      { name: 'Carrier & Business', className: 'fas fa-briefcase fa-1x' },
      { name: 'Coding', className: 'fab fa-connectdevelop fa-1x' },
    ],
  };

  componentDidMount() {
    this.loadEvent();
  }

  loadEvent = async () => {
    const eventId = this.props.match.params.eventId;

    if (eventId) {
      try {
        const event = await this.props.loadEvent();
        this.setState({ event });
      } catch (err) {
        console.log('eventEdit: cannot load event');
      }
    }
  };

  onHandelChange = async (ev) => {
    const { target } = ev;
    const field = target.name;
    const value = target.value;

    if (field === 'imgUrls') {
      try {
        const savedImgUrl = await EventService.uploadImg(ev);
        this.setState((prevState) => ({
          event: {
            ...prevState.event,
            imgUrls: [...prevState.event.imgUrls, savedImgUrl],
          },
        }));
      } catch (err) {
        console.log('edit cmp: cannot upload img');
      }
    } else
      this.setState((prevState) => ({
        event: { ...prevState.event, [field]: value },
      }));
  };

  onHandleDate = (date) => {
    this.setState((prevState) => ({
      event: { ...prevState.event, startAt: date },
    }));
  };

  onHandelSubmit = async (ev) => {
    ev.preventDefault();
    const { event } = this.state;
    const { user } = this.props;
    if (!user) return;

    if (!event.title || !event.place) {
      this.setState({
        msg: 'Please fill the required fields!',
        amptyInputClass: 'amptyInput',
      });
      return;
    }
    try {
      event.createdBy = user;
      const savedEvent = await this.props.saveEvent(event);
      await this.props.loadEvent(savedEvent._id);
      user.createdEvents.push({
        _id: savedEvent._id,
        title: savedEvent.title,
        imgUrl: savedEvent.imgUrls[0],
        desc: savedEvent.desc,
      });
      await this.props.updateUser(user);
      this.setState((prevState) => ({ isOpenModal: !prevState.isOpenModal }));
    } catch (err) {
      console.log('eventEdit cmp : cannot save event');
    }
  };

  onHandelFocus = () => {
    this.setState({ amptyInputClass: '' });
  };

  handleDate = (date) => {
    this.setState((prevState) => ({
      event: { ...prevState.event, startAt: date },
    }));
  };

  render() {
    return (
      <div className="edit">
        <h2>Edit Area</h2>
        <form onSubmit={this.onHandelSubmit}>
          <div className="double-box">
            <div className="box">
              <input
                type="text"
                name="title"
                required
               onChange={this.onHandelChange}
              ></input>
              <label>Title</label>
            </div>

            <div className="box">
              <input
                type="text"
                name="price"
                required
                            onChange={this.onHandelChange}
              ></input>
              <label>Price</label>
            </div>
          </div>

          <div className="double-box">
            <div className="box">
              <input
                type="text"
                name="place"
                required
                            onChange={this.onHandelChange}
              ></input>
              <label>Address</label>
            </div>

            <div className="box">
              <input
                type="text"
                name="capacity"
                required
                
                onChange={this.onHandelChange}
              ></input>
              <label>Capacity</label>
            </div>
          </div>

          <div className="box">
            <input
              type="text"
              name="desc"
              required
                       onChange={this.onHandelChange}
            ></input>
            <label>Description</label>
          </div>
          <div className="bottom-edit">
            <DatePicker
              selected={this.state.event.startAt}
              className="date"
              showTimeSelect
              dateFormat="Pp"
              onChange={this.handleDate}
              name="startAt"
            />

            <input
              list="categorys"
              name="category"
              id="category"
              placeholder="Category"
              className="edit-category"
              onChange={this.onHandelChange}
            />
            <datalist id="categorys" >
              {this.state.categories.map((category) => (
                <option key={category.name}>{category.name}</option>
              ))}
            </datalist>

            <input
              className="img-input"
              type="file"
              onChange={this.onHandelChange}
              name="imgUrls"
            />
          </div>
          <button className="save btn">Save</button>
        </form>
        {this.state.isOpenModal && this.props.event && (
          <Modal onRemoveModal={this.onRemoveModal}>
            <h2>Your event was created!</h2>
            <div className="links">
              <Link to={`/event/${this.props.event._id}`}>Go check it out</Link>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.events.currEvent,
    user: state.users.loggedInUser,
  };
};

const mapDispatchToProps = {
  loadEvent,
  saveEvent,
  updateUser,
};

export const EventEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EventEdit);
