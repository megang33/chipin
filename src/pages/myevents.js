import { async } from '@firebase/util';
import React, { useState } from 'react'
import { getDocInfo, getDocSnap } from '../utils/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot, faPhone, faAddressCard, faTruckLoading } from '@fortawesome/free-solid-svg-icons'
import '../index.css';
import './myevents.css';
import { initiateEvent, isActive, endEvent, deleteEvent } from "./events.js"
import { display } from '@mui/system';

const MyEventCard = (props) => {
    const [display, setDisplay] = useState(
        <div style={{ width: "80%", paddingBottom: "15px" }}>
            <button className='myevent-button' id='manage-attendees' onClick={() => displayDetails(false)}>Event Details</button>
        </div>
    )
    async function displayDetails(moreDetails){
        if (moreDetails){
            setDisplay(
                <div style={{ width: "80%", paddingBottom: "15px" }}>
                    <button className='myevent-button' id='manage-attendees' onClick={() => displayDetails()}>Event Details</button>
                </div>
            )
        } else {
            setDisplay(
                <div>
                    <div>
                        <b>Date: </b>{props.date} | <b>Start: </b>{props.timeStart} <b>End: </b>{props.timeEnd} | <b>Capacity: </b>{props.capacity}
                    </div>
                    <div>
                        <b>Phone: </b>{props.phone} | <b>Email: </b>{props.email}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", paddingTop: "15px", paddingBottom: "15px" }}>
                        <button className='close-button' onClick={() => {displayDetails(true)}}>Close</button>
                    </div>
                </div>
            )
        }
    }
    return(
        <div className='myevent-card-container'>
            <div>
                <div>
                    <img className='myevent-img' src={props.img}/>
                </div>
                <div className='myevent-card-text'>
                    <div style={{ position: "relative", width: "100%" }}>
                        <h2 className='myevent-card-name'>{props.title}</h2>
                    </div>
                    <text className='myevent-card-desc'>"{props.desc}"</text>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <div className='myevent-buttons-container'>
                        {display}
                        <button
                        className='myevent-button'
                        id='delete-myevent'
                        onClick={() => {
                            deleteEvent(props.oid, props.eid)
                            alert('You have deleted the event. Please refresh.')
                        }}>
                        Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MyEvents(props) {
    const [list, setList] = useState([])

    const displayManaged = async (oid) => {
        const events = await getDocInfo("organizations", oid, "events")
        let store = []
        for (let i = 0; i < events.length; i++){
            const title = await getDocInfo("events", events[i], "eventName")
            const desc = await getDocInfo("events", events[i], "description")
            const img = await getDocInfo("events", events[i], "banner")
            const timeStart = await getDocInfo("events", events[i], "timeStart")
            const timeEnd = await getDocInfo("events", events[i], "timeEnd")
            const phone = await getDocInfo("events", events[i], "phoneNumber")
            const email = await getDocInfo("events", events[i], "email")
            const date = await getDocInfo("events", events[i], "date")
            const capacity = await getDocInfo("events", events[i], "capacity")
            store[i] = <div className='test'><MyEventCard oid = {oid} eid = {events[i]} img = {img} title = {title} desc = {desc}
            timeStart={timeStart} timeEnd={timeEnd} phone={phone} email={email} date={date} capacity={capacity}></MyEventCard></div>
        }
        setList(store)
    }

    React.useEffect(() => {
        const display = async () => {
            if (props.oid != null){
                await displayManaged(props.oid)
            }else{
                const doc = await getDocSnap("users", localStorage.getItem("user-login"))
                if (doc != null){
                    await displayManaged(doc.get("oid"))
                }
            }
        }
        display()
    }, [])

    return(
        <div>
            <h1 style={{ paddingLeft: "13%", paddingTop: "25px" }}>Upcoming events for {props.orgName}</h1>
            <div className='round-rect'>
                 <div className='my-events-container'>
                    {list.map((event) => {
                        return event
                    })}
                </div>
            </div>
        </div>
    )
}