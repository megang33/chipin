import React from 'react'
import EventDetails from './event-details.js'

export default class EventCreation extends React.Component {
    state = {
        step: 1,
        event_name: '',
        date: '',
        capacity: '',
        description: '',
        primary_contact: '',
        secondary_contact: '',
        address: '',
        banner: ''
    }

    //go to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step++
        });
    }

    //go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step--
        });
    }

    //handle input change
    handleChange = (input, e) => {
        this.setState({
            [input]: e.target.value
        });
    }

    render() {
        const { step, event_name, date, capacity, description, primary_contact, secondary_contact,
            address, banner } = this.state;
        const values = {
            event_name, date, capacity, description, primary_contact, secondary_contact,
            address, banner
        };

        switch (step) {
            case 1:
                return (
                    <EventDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    /> //event_name, date, capacity, description
                )
            case 2:
                return (
                    <h1>misc details</h1>
                    //contacts, banner, address
                )
            case 4:
                return (
                    <h1>Success</h1>
                    //banner description
                )
        }

        return (
            <div>
                <h3>Make an Event</h3>
            </div>
        )
    }
}
