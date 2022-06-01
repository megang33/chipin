import React, { Component, Fragment } from "react";
import MyCard from './MyCard.js';
import './EventList.css'
import PropTypes from "prop-types";
import { List } from "@mui/material";


class EventList extends Component {
    static propTypes = {
        eventInfo: PropTypes.instanceOf(List)
    };

    static defaultProps = {
        eventInfo: []
    };


    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
        };
    }

    render() {

        console.log("Test2")
        const { suggestions, eventMap, register } = this.props;
        console.log(suggestions)
        const list = suggestions.map((name, idx) => {
            return <div><MyCard style={{ marginRight: 5, marginTop: 2 }} eventName={name} eventMap={eventMap} suggestions={suggestions} register={register} /> </div>
        })

        return (
            <div>{list}</div>
        )
    }

}
export default EventList;
