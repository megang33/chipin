import React from 'react'
import { addDBdoc } from '../utils/firebase.js';


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
            hasEventEnded: values.hasEventEnded
        }
        await addDBdoc("events", body);
        window.location = "/events";
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
                <h1 style={{ textAlign: "center" }}>Confirmation Details</h1>
                <ul>
                    <li>{values.eventName}</li>
                    <li>{values.date}</li>
                    <li>{values.capacity}</li>
                    <li>{values.description}</li>
                    <li>{values.primaryContact}</li>
                    <li>{values.secondaryContact}</li>
                    <li>{values.location}</li>
                    <li>
                        <div>Image: </div>
                        <img src={values.banner} width="400px"/>
                    </li>
                </ul>
                <button onClick={this.submit}>submit</button>
            </div>
        )
    }
}
