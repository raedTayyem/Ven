import React, { Component } from "react";
import { connect } from "react-redux";

import { EventList } from "../cmps/EventList";
import { EventFilter } from "../cmps/EventFilter";
import { loadEvents, removeEvent } from "../store/actions/EventActions";

class _Events extends Component {
  state = {
    filterBy: null,
    sortBy: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const { search } = this.props.location.state;
    let filter = "";
    if (search) {
      filter = this.checkCriteria(search);
    }
    this.loadEvents(filter, this.state.sortBy);
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => {
      this.props.loadEvents(filterBy);
    });
  };

  onSort = (sortBy) => {
    this.setState({ sortBy }, () => {
      this.props.loadEvents(null, sortBy);
    });
  };

  loadEvents(filter, sort) {
    this.props.loadEvents(filter, sort);
  }

  checkCriteria = (search) => {
    var filterBy = {};
    const type = search.slice(0, 1);
    if (type === "s") {
      const valueToSearch = search.slice(7, search.length);
      filterBy = { title: valueToSearch };
    }
    if (type === "c") {
      const valueToSearch = search.slice(9, search.length);
      filterBy = { category: valueToSearch };
    }
    this.setState({ filterBy });
    return filterBy;
  };

  render() {
    const { events } = this.props;
    return (
      <div className="events">
        <div className="filter container">
          {this.state.filterBy && (
            <EventFilter
              onSetFilter={this.onSetFilter}
              onSort={this.onSort}
              filter={this.state}
            />
          )}
        </div>

        <div className="events-prev">
          <EventList events={events} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
  };
};
const mapDispatchToProps = {
  loadEvents,
  removeEvent,
};
export const Events = connect(mapStateToProps, mapDispatchToProps)(_Events);
