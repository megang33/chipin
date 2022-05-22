import React from 'react'

export default class MiscDetails extends React.Component {
    submit = e => {
        e.preventDefault();
        //add document with event id to database
        //redirect user to correct page
        //last step should redirect to landing page or events page?
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
                <button onclick={this.submit}>submit</button>
            </div>
        )
    }
}