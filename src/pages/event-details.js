import React from 'react'

export default class EventDetails extends React.Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
        console.log("continued");
    }
    render() {
        const { values, handleChange } = this.props;
        return (
            <form class="signup-form">
                <div class="form-header">
                    <h1>Enter Event Details</h1>
                </div>
                <div class="form-body">
                    <div class="form-row">
                        <label style={{ margin: "7px" }}>Event Name:</label>
                        <input
                            className="event-name"
                            type="text"
                            placeholder="Enter event name"
                            onChange={e => this.props.handleChange('event_name', e)}
                            required="true"
                        />
                    </div>
                    <div class="input-line">
                        <div class="form-row">
                            <label style={{ margin: "7px" }}>Date:</label>
                            <input
                                className="horiz-field"
                                type="date"
                                placeholder="Enter a Date"
                                onChange={e => this.props.handleChange('date', e)}
                                required="true"
                            />
                        </div>
                        <div class="form-row">
                            <label style={{ margin: "7px" }}>Capacity:</label>
                            <input
                                className="horiz-field"
                                type="text"
                                placeholder="Enter a Capacity"
                                onChange={e => this.props.handleChange('capacity', e)}
                                required="true"
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <label style={{ margin: "7px" }}>Description:</label>
                        <input
                            className="event-name"
                            type="text"
                            placeholder="Enter a Description"
                            onChange={e => this.props.handleChange('description', e)}
                            required="true"
                        />
                    </div>
                    <button onClick={this.continue}>Continue</button>
                </div>
            </form>
        )
    }
}