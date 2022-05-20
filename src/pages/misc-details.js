import React from 'react'

export default class MiscDetails extends React.Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    previous = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values, handleChange } = this.props;
        //contacts, banner, address
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Enter Misc Details</h1>
                <form className="event-flex">
                    <label>
                        Primary Contact:
                        <input
                            className="event-name"
                            type="text"
                            placeholder="enter email"
                            onChange={e => this.props.handleChange('primary_contact', e)}
                            required="true"
                        />
                    </label>
                    <label>
                        Secondary Contact:
                        <input
                            className="event-name"
                            type="text"
                            placeholder="(000)-000-0000"
                            onChange={e => this.props.handleChange('secondary_contact', e)}
                            required="optional"
                        />
                    </label>
                    <label>
                        Location:
                        <input
                            className="horiz-field"
                            type="text"
                            placeholder="street address, city, state, zipcode"
                            onChange={e => this.props.handleChange('address', e)}
                            required="true"
                        />
                    </label>
                    <label>
                        Banner:
                        <input
                            className="event-name"
                            type="file"
                            placeholder="Enter a Description"
                            onChange={e => this.props.handleChange('description', e)}
                            required="true"
                        />
                    </label>
                    <span>
                        <button onClick={this.previous}>Back</button>
                        <button onClick={this.continue}>Continue</button>
                    </span>
                </form>
            </div>
        )
    }
}