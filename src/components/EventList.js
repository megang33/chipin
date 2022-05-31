import React, { Component, Fragment } from "react";
import MyCard from './MyCard.js';
import ExpandedCard from './ExpandedCard.js';
import './EventList.css'
import PropTypes from "prop-types";


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

        const list = suggestions.map((name) => {
            return <div style={{ marginRight: 5, marginTop: 2 }}><MyCard key={name} eventName={name} /> </div> //can add more margin here
        })
        return (
            <div>{list}</div>
        )
    }

}
export default React.memo(EventList)
