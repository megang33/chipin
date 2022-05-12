import React from 'react'

export default class EventDetails extends React.Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Enter Event Details</h1>
                <form>
                    <label>
                        Event Name:
                        <input
                            className="event-name"
                            type="text"
                            placeholder="Enter event name"
                            onChange={e => this.props.handleChange('event_name', e)}
                        />
                    </label>
                    <div>
                        <label>
                            Date:
                            <input
                                className="horiz-field"
                                type="text"
                                placeholder="Enter a Date"
                                onChange={e => this.props.handleChange('date', e)}
                            />
                        </label>
                        <label>
                            Capacity:
                            <input
                                className="horiz-field"
                                type="text"
                                placeholder="Enter a Voluneer Capacity"
                                onChange={e => this.props.handleChange('capacity', e)}
                            />
                        </label>
                    </div>
                    <label>
                        Description:
                        <input
                            className="event-name"
                            type="text"
                            placeholder="Enter a Description"
                            onChange={e => this.props.handleChange('description', e)}
                        />
                    </label>
                    <button>Continue</button>
                </form>
            </div>
        )
    }
}