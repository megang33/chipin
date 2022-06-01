import React, { useState, Component, Fragment } from "react";
import MyCard from './MyCard.js';
import ExpandedCard from './ExpandedCard.js';
import { sortByDistance } from "../pages/events.js";
import './EventList.css'
import PropTypes from "prop-types";


const EventList = (props) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [orderedSuggestions, setOrderedSuggestions] = useState([])

    React.useEffect(() => {
        const setUp = async () => {
            let list
            list = await sortByDistance(props.suggestions, props.zc)
            await setOrderedSuggestions(list.map((name) => {
                    return <div style={{ marginRight: 5, marginTop: 2 }}><MyCard key={name} eventName={name} /> </div>
                })
            )
        }
        setUp()
    }, [])

    return (
        <div>{orderedSuggestions}</div>
    )

}

export default React.memo(EventList)
