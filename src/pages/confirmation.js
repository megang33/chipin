import React from 'react'
import { addDBdoc, getDocInfo, updateDBdoc } from '../utils/firebase.js';
import '../index.css';
import { arrayRemove, arrayUnion } from 'firebase/firestore';

export default class MiscDetails extends React.Component {
    submit = async (e) => {
        e.preventDefault();
        const { values } = this.props;
        //add document with event id to database
        //redirect user to correct page
        //last step should redirect to landing page or events page?
        console.log(values)
        const body = {
            eventName: values.eventName,
            date: values.date,
            capacity: values.capacity,
            description: values.description,
            email: values.primaryContact,
            phoneNumber: values.secondaryContact,
            location: values.location,
            banner: values.banner,
            timeStart: values.timeStart,
            timeEnd: values.timeEnd,
            hasEventStarted: values.hasEventStarted,
            hasEventEnded: values.hasEventEnded,
            registered: []
        }
        const eventID = await addDBdoc("events", body);
        updateDBdoc("organizations", this.props.oid, { events: arrayUnion(eventID), upcomingEvents: arrayUnion(eventID), 
            numEvent: await getDocInfo("organizations", this.props.oid, "numEvents") + 1,})
        window.location = "/my-events";
    }

    previous = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values } = this.props;
        //add time!!!
        //contacts, banner, address
        //banner doesn't work
        return (
            <div>
                <h1 style={{ textAlign: "center", marginBottom: "-50px" }}>Confirmation Details</h1>
                <div className='conf-round-rect'>
                    <ul className='conf-list'>
                        <li><h1>{values.eventName}</h1></li>
                        <li><b>Date: </b>{values.date}</li>
                        <li><b>Capacity: </b>{values.capacity}</li>
                        <li><b>Description: </b>{values.description}</li>
                        <li><div>
                            <b>Contact: </b>
                            {values.primaryContact}, {values.secondaryContact}
                        </div></li>
                        
                        <li><b>Location: </b>{values.location}</li>
                        <li style={{ paddingTop: "20px" }}>
                            <div><b>Image: </b></div>
                            <img src={values.banner} width="400px" />
                        </li>
                    </ul>
                    <button className='forward-button' onClick={this.submit}>submit</button>
                </div>
            </div>
        )
    }
}
