import { async } from '@firebase/util';
import React, { useState } from 'react'
import { getDocInfo } from '../utils/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot, faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import '../index.css';
import './myevents.css';
import { initiateEvent, isActive, endEvent, deleteEvent } from "./events.js"

const MyEventCard = (props) => {
    return(
        <div className='myevent-card-container'>
            <div>
                <div>
                    <img className='myevent-img' src={props.img}/>
                </div>
                <div className='myevent-card-text'>
                    <div style={{ position: "relative", width: "100%" }}>
                        <h2 className='myevent-card-name'>Sample Event Fan Meet</h2>
                    </div>
                    <text className='myevent-card-desc'>filler description</text>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <div className='myevent-buttons-container'>
                        <div style={{ width: "80%", paddingBottom: "15px" }}>
                            <button className='myevent-button' id='manage-attendees'>event details</button>
                        </div>
                        <button className='myevent-button' id='delete-myevent' onClick={deleteEvent(props.eid)}>delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default class MyEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: null,
            numEvents: 0,
        };
    }

    render() {
        const managedEvents = getDocInfo("organizations", this.props.oid, "events")
        return(
            <div>
                <h1 style={{ paddingLeft: "13%", paddingTop: "25px" }}>Upcoming events for {this.props.orgName}</h1>
                <div className='round-rect'>
                    <div className='my-events-container'>
                        <div>
                            <MyEventCard></MyEventCard>
                        </div>
                        <div>
                            <MyEventCard></MyEventCard>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}