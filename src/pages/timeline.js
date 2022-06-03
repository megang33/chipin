import { async } from '@firebase/util';
import React, { useState } from 'react'
import { getDocInfo } from '../utils/firebase';
import EventCard from '../components/eventcard';
import "./timeline.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot, faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import MyCard from '../components/MyCard';

const StatsBar = (props) => {
    if (props.role) {
        return(
            <div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "5.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.numHours < 10) ? "0": ""}{ props.numHours }</p>
                        <div className='unit-text' style={{ left: "2%" }}>hrs completed</div>
                    </div>
                    <div className='solid-rect' style={{ left: "5%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "30.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.pastEvents < 10) ? "0": ""}{ props.pastEvents }</p>
                        <div className='unit-text' style={{ left: "2%" }}>events attended</div>
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
                        <div className='unit-text' style={{ left: "2%" }}>events created</div>
                    </div>
                    <div className='solid-rect' style={{ left: "5%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "30.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.upcomingEvents < 10) ? "0": ""}{ props.upcomingEvents }</p>
                        <div className='unit-text' style={{ left: "2%" }}>upcoming events</div>
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
                const eventName = await getDocInfo("events", past[i], "eventName")
                const date = await getDocInfo("events", past[i], "date")
                const capacity = await getDocInfo("events", past[i], "capacity")
                const description = await getDocInfo("events", past[i], "description")
                const registered = await getDocInfo("events", past[i], "registered")
                const location = await getDocInfo("events", past[i], "location")
                const email = await getDocInfo("events", past[i], "email")
                const timeStart = await getDocInfo("events", past[i], "timeStart")
                const timeEnd = await getDocInfo("events", past[i], "timeEnd")
                const eventInfo = {
                  id: past[i],
                  eventName: eventName,
                  date: date,
                  capacity: capacity,
                  description: description,
                  registered: registered,
                  location: location,
                  email: email,
                  timeStart: timeStart,
                  timeEnd: timeEnd
                }
                pastArray[i] = eventInfo;
            }
            let allEventsDisplay = pastArray.map((card) => {
                return <div><EventCard eventData={card}></EventCard></div>
            })

            let currentArray = []
            for (var i = 0; i < current.length; i++) {
                const eventName = await getDocInfo("events", current[i], "eventName")
                const date = await getDocInfo("events", current[i], "date")
                const capacity = await getDocInfo("events", current[i], "capacity")
                const description = await getDocInfo("events", current[i], "description")
                const registered = await getDocInfo("events", current[i], "registered")
                const location = await getDocInfo("events", current[i], "location")
                const email = await getDocInfo("events", current[i], "email")
                const timeStart = await getDocInfo("events", current[i], "timeStart")
                const timeEnd = await getDocInfo("events", current[i], "timeEnd")
                const eventInfo = {
                  id: current[i],
                  eventName: eventName,
                  date: date,
                  capacity: capacity,
                  description: description,
                  registered: registered,
                  location: location,
                  email: email,
                  timeStart: timeStart,
                  timeEnd: timeEnd
                }
                currentArray[i] = eventInfo;
            }
            let futureEventsDisplay = currentArray.map((card) => {
                return <div><EventCard eventData={card}></EventCard></div>
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
                const eventName = await getDocInfo("events", events[i], "eventName")
                const date = await getDocInfo("events", events[i], "date")
                const capacity = await getDocInfo("events", events[i], "capacity")
                const description = await getDocInfo("events", events[i], "description")
                const registered = await getDocInfo("events", events[i], "registered")
                const location = await getDocInfo("events", events[i], "location")
                const email = await getDocInfo("events", events[i], "email")
                const timeStart = await getDocInfo("events", events[i], "timeStart")
                const timeEnd = await getDocInfo("events", events[i], "timeEnd")
                const eventInfo = {
                  id: events[i],
                  eventName: eventName,
                  date: date,
                  capacity: capacity,
                  description: description,
                  registered: registered,
                  location: location,
                  email: email,
                  timeStart: timeStart,
                  timeEnd: timeEnd
                }
                eventsArray[i] = eventInfo;
            }
            let allEventsDisplay = eventsArray.map((card) => {
                return <div><EventCard eventData={card}></EventCard></div>
            })

            let upcomingEventsArray = []
            for (var i = 0; i < upcomingEvents.length; i++) {
                const eventName = await getDocInfo("events", upcomingEvents[i], "eventName")
                const date = await getDocInfo("events", upcomingEvents[i], "date")
                const capacity = await getDocInfo("events", upcomingEvents[i], "capacity")
                const description = await getDocInfo("events", upcomingEvents[i], "description")
                const registered = await getDocInfo("events", upcomingEvents[i], "registered")
                const location = await getDocInfo("events", upcomingEvents[i], "location")
                const email = await getDocInfo("events", upcomingEvents[i], "email")
                const timeStart = await getDocInfo("events", upcomingEvents[i], "timeStart")
                const timeEnd = await getDocInfo("events", upcomingEvents[i], "timeEnd")
                const eventInfo = {
                  id: upcomingEvents[i],
                  eventName: eventName,
                  date: date,
                  capacity: capacity,
                  description: description,
                  registered: registered,
                  location: location,
                  email: email,
                  timeStart: timeStart,
                  timeEnd: timeEnd
                }
                upcomingEventsArray[i] = eventInfo;
            }
            let futureEventsDisplay = upcomingEventsArray.map((card) => {
                return <div><EventCard eventData={card}></EventCard></div>
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
                                <div style={{ marginRight: "10px" }}>
                                    {/* {all}
                                    { this.state.allEventsDisplay } */}
                                    {future}
                                    { this.state.futureEventsDisplay }
                                </div>
                                <div style={{ marginLeft: "10px" }}>
                                    {future}
                                    { this.state.futureEventsDisplay }
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}