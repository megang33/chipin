import React from 'react'
import { addDBdoc } from '../utils/firebase.js';


export default class MiscDetails extends React.Component {
    submit = async (e) => {
        e.preventDefault();
        const { values } = this.props;
        //add document with event id to database
        //redirect user to correct page
        //last step should redirect to landing page or events page?
        const body = {
            event_name: values.event_name,
            date: values.date,
            capacity: values.capacity,
            description: values.description,
            email: values.primary_contact,
            phone_number: values.secondary_contact,
            location: values.address,
            banner: values.banner,
            hours: values.hours
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
                    <li>{values.event_name}</li>
                    <li>{values.date}</li>
                    <li>{values.capacity}</li>
                    <li>{values.description}</li>
                    <li>{values.primary_contact}</li>
                    <li>{values.secondary_contact}</li>
                    <li>{values.address}</li>
                    <li>{values.banner}</li>
                </ul>
                <button onClick={this.submit}>submit</button>
            </div>
        )
    }
}
