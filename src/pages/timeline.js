import { async } from '@firebase/util';
import React, { useState } from 'react'
import { getDocInfo } from '../utils/firebase';
import EventCard from '../components/eventcard';
import { getDocData } from '../utils/firebase';
import "./timeline.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot, faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import MyCard from '../components/MyCard';
import { getDoc } from 'firebase/firestore';

const StatsBar = (props) => {
    if (props.role) {
        return(
            <div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "5.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.numHours < 10) ? "0": ""}{ props.numHours }</p>
                        <div className='unit-text' style={{ left: "2%" }}>Hours Completed</div>
                    </div>
                    <div className='solid-rect' style={{ left: "5%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "30.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.pastEvents < 10) ? "0": ""}{ props.pastEvents }</p>
                        <div className='unit-text' style={{ left: "2%" }}>Events Attended</div>
                    </div>
                    <div className='solid-rect' style={{ left: "30%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "55.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.numGroups < 10) ? "0": ""}{ props.numGroups }</p>
                        <div className='unit-text' style={{ left: "2%" }}>{(props.numGroups == 1) ? "Group Joined" : "Groups Joined"}</div>
                    </div>
                    <div className='solid-rect' style={{ left: "55%" }}/>
                </div>
            </div>
        );
    } else {
        return(
            <div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "5.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.numEvents < 10) ? "0": ""}{ props.numEvents }</p>
                        <div className='unit-text' style={{ left: "2%" }}>Events Created</div>
                    </div>
                    <div className='solid-rect' style={{ left: "5%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "30.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.upcomingEvents < 10) ? "0": ""}{ props.upcomingEvents }</p>
                        <div className='unit-text' style={{ left: "2%" }}>Upcoming Events</div>
                    </div>
                    <div className='solid-rect' style={{ left: "30%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "55.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.numGroups < 10) ? "0": ""}{ props.numGroups }</p>
                        <div className='unit-text' style={{ left: "2%" }}>{(props.numGroups == 1) ? "Group Joined" : "Groups Joined"}</div>
                    </div>
                    <div className='solid-rect' style={{ left: "55%" }}/>
                </div>
            </div>
        );
    }
}

export default class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            numGroups: 0,
            role: true,
            numHours: 0,
            pastEvents: 0,
            numEvents: 0,
            upcomingEvents: 0,
            allEventsDisplay: [],
            futureEventsDisplay: [],
        };
    }

    componentDidMount = async() => {
        let id = localStorage.getItem("user-login");
        let role = await getDocInfo("users", id, "role");
        let name = await getDocInfo("users", id, "name");
        if (role){
            let numHours = await getDocInfo("users", id, "numHours")
            let numGroups = await getDocInfo("users", id, "numGroups");
            let pastEvents = await getDocInfo("users", id, "eventsCompleted")
            let current = await getDocInfo("users", id, "currentEvents")
            let past = await getDocInfo("users", id, "pastEvents")
            let pastArray = []
            for (var i = 0; i < past.length; i++) {
                const eventInfo = await getDocData("events", past[i])
                pastArray[i] = eventInfo;
            }
            let allEventsDisplay = pastArray.map((card) => {
                console.log(card)
                return <div><EventCard eventData={card} oid={null}></EventCard></div>
            })

            let currentArray = []
            for (var i = 0; i < current.length; i++) {
                const eventInfo = await getDocData("events", current[i])
                currentArray[i] = eventInfo;
            }
            let futureEventsDisplay = currentArray.map((card) => {
                return <div><EventCard eventData={card} oid={null}></EventCard></div>
            })

            this.setState({
                name: name,
                numGroups: numGroups,
                role: role,
                numHours: numHours,
                pastEvents: pastEvents,
                allEventsDisplay: allEventsDisplay, 
                futureEventsDisplay: futureEventsDisplay,
            })
        }else{
            let oid = await getDocInfo("users", id, "oid")
            let numEvents = await getDocInfo("organizations", oid, "numEvents")
            let events = await getDocInfo("organizations", oid, "events")
            let upcomingEvents = await getDocInfo("organizations", oid, "upcomingEvents")

            let eventsArray = []
            for (var i = 0; i < events.length; i++) {
                const eventInfo = await getDocData("events", events[i])
                eventsArray[i] = eventInfo;
            }
            let allEventsDisplay = eventsArray.map((card) => {
                return <div><EventCard eventData={card} oid={card.oid}></EventCard></div>
            })

            let upcomingEventsArray = []
            for (var i = 0; i < upcomingEvents.length; i++) {
                const eventInfo = await getDocData("events", upcomingEvents[i])
                upcomingEventsArray[i] = eventInfo;
            }
            let futureEventsDisplay = upcomingEventsArray.map((card) => {
                return <div><EventCard eventData={card} oid={card.oid}></EventCard></div>
            })

            this.setState({
                name: name,
                role: role,
                numEvents: numEvents,
                upcomingEvents: upcomingEvents.length,
                allEventsDisplay: allEventsDisplay, 
                futureEventsDisplay: futureEventsDisplay,
            })
        }
    }

    render() {
        const all = !this.state.role ? "All Events:" : "Past Events"
        const future = !this.state.role ? "Upcoming Events:" : "Registered Events"
        return(
            <div>
                <h1 style={{ paddingLeft: "13%", paddingTop: "25px" }}>Hi { this.state.name }, here's your timeline!</h1>
                <div className='round-rect'>
                    <StatsBar role={this.state.role} numGroups={this.state.numGroups} name={this.state.name}
                    numHours={this.state.numHours} pastEvents={this.state.pastEvents} numEvents={this.state.numEvents}
                    upcomingEvents={this.state.upcomingEvents}></StatsBar>
                    <div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h1 className='internal-header' id='community-head'>Community</h1>
                            <FontAwesomeIcon icon={faUser} style={{ position: "absolute", left: "257px", top: "142px" }}/>
                            <FontAwesomeIcon icon={faUser} style={{ position: "absolute", left: "268px", top: "142px" }}/>
                        </div>
                        <div>
                            <p style={{ position: "absolute", left: "80px", top: "145px" }}>What's new with your groups</p>
                        </div>
                        <div style={{ display: "flex", alignContent: "center" }}>
                            <div className='user-events-container'>
                                <div style={{ marginRight: "30px" }}>
                                    <div style={{ marginLeft: "180px", marginBottom: "20px" }}><b>{all}</b></div>
                                    <div className='card-scroll'>
                                        { this.state.allEventsDisplay }
                                    </div>
                                </div>
                                <div style={{ marginLeft: "30px" }}>
                                    <div style={{ marginLeft: "160px", marginBottom: "20px" }}><b>{future}</b></div>
                                    <div className='card-scroll'>
                                        { this.state.futureEventsDisplay }
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}