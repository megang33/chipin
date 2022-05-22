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
            <form class="signup-form">
                <div class="form-header">
                    <h1>Enter Misc Details</h1>
                </div>
                <div class="form-body">
                    <div class="form-row">
                        <label style={{ margin: "7px" }}>Primary Contact:</label>
                        <input
                            className="horiz-field"
                            type="text"
                            placeholder="enter email"
                            onChange={e => this.props.handleChange('primary_contact', e)}
                            required="true"
                        />
                    </div>
                    <div class="form-row">
                        <label style={{ margin: "7px" }}>Secondary Contact:</label>
                        <input
                            className="horiz-field"
                            type="text"
                            placeholder="(000)-000-0000"
                            onChange={e => this.props.handleChange('secondary_contact', e)}
                            required="optional"
                        />
                    </div>
                    <div class="form-row">
                        <label style={{ margin: "7px" }}>Location:</label>
                        <input
                            className="horiz-field"
                            type="text"
                            placeholder="street address, city, state, zipcode"
                            onChange={e => this.props.handleChange('address', e)}
                            required="true"
                        />
                    </div>
                    <div class="form-row">
                        <label style={{ margin: "7px" }}>Upload a Banner for your Event:</label>
                        <input
                            className="horiz-field"
                            type="file"
                            onChange={e => this.props.handleChange('banner', e)}
                            required="true"
                        />
                    </div>
                    <div className="input-line">
                        <button className="back-button" onClick={this.previous}><span>Back</span></button>
                        <button className="forward-button" onClick={this.continue}><span>Continue</span></button>
                    </div>
                </div>
            </form>
        )
    }
}