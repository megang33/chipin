import React from 'react'

export default class EventDetails extends React.Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { values, handleChange } = this.props;
        return (
            <form className="signup-form">
                <div className="form-header">
                    <h1>Enter Event Details</h1>
                </div>
                <div className="form-body">
                    <div className="form-row">
                        <label style={{ margin: "7px" }}>Event Name:</label>
                        <input
                            className="horiz-field"
                            type="text"
                            placeholder="Enter event name"
                            onChange={e => this.props.handleChange('event_name', e)}
                            required={true}
                        />
                    </div>
                    <div className="input-line">
                        <div className="form-row">
                            <label style={{ margin: "7px" }}>Date:</label>
                            <input
                                className="horiz-field"
                                type="date"
                                placeholder="Enter a Date"
                                onChange={e => this.props.handleChange('date', e)}
                                required={true}
                            />
                        </div>
                        <div className="form-row">
                            <label style={{ margin: "7px" }}>Capacity:</label>
                            <input
                                className="horiz-field"
                                type="text"
                                placeholder="Enter Capacity"
                                onChange={e => this.props.handleChange('capacity', e)}
                                required={true}
                            />
                        </div>
                        <div className="form-row">
                            <label style={{ margin: "7px" }}>Hours:</label>
                            <input
                                className="horiz-field"
                                type="text"
                                placeholder="Enter Hours"
                                onChange={e => this.props.handleChange('hours', e)}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <label style={{ margin: "7px" }}>Description:</label>
                        <textarea className="horiz-field description" onChange={e => this.props.handleChange('description', e)}
                            required={true} cols="40" rows="5"></textarea>
                        {/* <input
                            className="horiz-field description"
                            type="text"
                            onChange={e => this.props.handleChange('description', e)}
                            required={true}
                        /> */}
                    </div>
                    <button className="forward-button" onClick={this.continue}><span>Continue</span></button>
                </div>
            </form>
        )
    }
}