import React from 'react'
import EventDetails from './event-details.js'
import MiscDetails from './misc-details.js'
import Confirmation from './confirmation.js'
import './events.css'
import { getImageByFile, uploadFile } from '../utils/firebase.js'


export default class EventCreation extends React.Component {
    state = {
        step: 1,
        eventName: '',
        date: '',
        capacity: '',
        description: '',
        primaryContact: '',
        secondaryContact: '',
        location: '',
        banner: null,
        timeStart: '',
        timeEnd: '',
        hasEventEnded: false,
        hasEventStarted: false,
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

    uploadDBFile = async (file) => {
        await uploadFile(file)
        const setLink = (url) => {
            this.setState({
                banner: url
            })
        }
        getImageByFile(file.name, setLink)
    }

    handleFileInput = async (e) => {
        if (e.target.files[0]){
            this.uploadDBFile(e.target.files[0])
        }
    }

    render() {
        const { step, eventName, date, capacity, description, primaryContact, secondaryContact,
            location, banner, timeStart, timeEnd, hasEventEnded, hasEventStarted } = this.state;
        const values = {
            eventName, date, capacity, description, primaryContact, secondaryContact,
            location, banner, timeStart, timeEnd, hasEventStarted, hasEventEnded
        };

        switch (step) {
            case 1:
                return (
                    <EventDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    /> //eventName, date, capacity, description
                )
            case 2:
                return (
                    <MiscDetails
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleFileInput={this.handleFileInput}
                        values={values}
                    />
                    //contacts, banner, location
                )
            case 3:
                return (
                    <Confirmation
                        style={{ overflowY: "scroll" }}
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        values={values}
                        oid = {this.props.oid}
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
