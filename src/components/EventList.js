import React, { Component, Fragment } from "react";
import MyCard from './MyCard.js';
import './EventList.css'
import PropTypes from "prop-types";
import { Card } from "antd";


class EventList extends Component {

    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
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
        const { suggestions } = this.props;
        console.log(suggestions)

        return (
            <MyCard eventName={suggestions[0]} />
        )
    }

}
export default React.memo(EventList)
