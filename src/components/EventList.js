import React, { useState, Component, Fragment } from "react";
import MyCard from './MyCard.js';
import ExpandedCard from './ExpandedCard.js';
import { sortByDistance } from "../pages/events.js";
import './EventList.css'
import PropTypes from "prop-types";
import { List } from "@mui/material";
import { getDocInfo } from "../utils/firebase.js";



const EventList = (props) => {
    const [orderedSuggestions, setOrderedSuggestions] = useState([])

    React.useEffect(() => {

        const setUp = async () => {
            let list
            let list1 = []
            list = await sortByDistance(props.suggestions, props.zc)
            console.log(list)
            let temp_arr = props.searchInfo || []
            if ((temp_arr.length) != 0) {
                for (let i = 0; i < list.length; i++) {
                    if (props.searchInfo.includes(list[i])) {
                        console.log(list[i])
                        list1.push(list[i])
                    }
                }

            } else {
                list1 = list
            }





            await setOrderedSuggestions(list1.map((name) => {
                return (
                    <div style={{}}>
                        <MyCard style={{ marginRight: 5, marginTop: 2 }} eventName={name} eventMap={props.eventMap}
                            suggestions={list} register={props.register} handleCardClick={props.handleCardClick} />
                    </div>
                )
            })
            )
        }
        setUp()
    }, [props.searchInfo])

    return (
        <div className="myTray">{orderedSuggestions}</div>
    )

}

export default EventList