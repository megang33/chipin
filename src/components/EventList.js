import React, { useState, Component, Fragment } from "react";
import MyCard from './MyCard.js';
import ExpandedCard from './ExpandedCard.js';
import { sortByDistance } from "../pages/events.js";
import './EventList.css'
import PropTypes from "prop-types";
import { List } from "@mui/material";


const EventList = (props) => {
    const [orderedSuggestions, setOrderedSuggestions] = useState([])

    React.useEffect(() => {
        const setUp = async () => {
            let list
            list = await sortByDistance(props.suggestions, props.zc)
            await setOrderedSuggestions(list.map((name) => {
                    return <div><MyCard style={{ marginRight: 5, marginTop: 2 }} eventName={name} eventMap={eventMap} 
                    suggestions={suggestions} register={register} handleCardClick={this.props.handleCardClick} /> </div>
                })
            )
        }
        setUp()
    }, [])

    return (
        <div>{orderedSuggestions}</div>
    )

}

export default EventList;
