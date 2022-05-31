import React, { Component, Fragment } from "react";
import MyCard from './MyCard.js';
import ExpandedCard from './ExpandedCard.js';
import './EventList.css'
import PropTypes from "prop-types";
import { List } from "@mui/material";
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";


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

        const { eventInfo } = this.props;
        console.log(eventInfo)
        const list = []
        console.log("FLAG1")
        console.log(typeof eventInfo)
        for (const [key, value] of Object.entries(eventInfo)) {
            console.log("FLAG")
            console.log(key)
            console.log(value.eventLocation)
            list.push(<div style={{ marginRight: 5, marginTop: 2 }}><MyCard eventName={key} eventDate={value.date} eventLocation={value.address} /> </div>)
        }

        return (
            <div>{list}</div>
        )
    }

}
export default React.memo(EventList)
