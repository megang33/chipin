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
        const { suggestions, eventMap, register, autocomp } = this.props;
        console.log("!!!")
        console.log(this.props.autocomp)

        console.log(typeof autocomp)
        console.log(autocomp.length)
        console.log(autocomp.includes("hellooooo"))



        const list = suggestions.map((name, idx) => {
            console.log({ name })
            return <div><MyCard style={{ marginRight: 5, marginTop: 2 }} eventName={name} eventMap={eventMap} suggestions={suggestions} register={register} handleCardClick={this.props.handleCardClick} /> </div>

        })


        return (
            <div className="myTray">{list}</div>

        )
    }

}
export default EventList;
