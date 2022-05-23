import React from 'react'
import EventDetails from './event-details.js'
import MiscDetails from './misc-details.js'
import Confirmation from './confirmation.js'

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
            step: step + 1
        });
    }

    //go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
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
                    <MiscDetails
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                    //contacts, banner, address
                )
            case 3:
                return (
                    <Confirmation
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        values={values}
                    //confirmation
                    />
                )
            default:
            //do nothing
        }

        return (
            <div>
                <h3>Make an Event</h3>
            </div>
        )
    }
}
