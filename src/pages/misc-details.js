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
        return (
            <form className="signup-form">
                <div className="form-header">
                    <h1>Enter Misc Details</h1>
                </div>
                <div className="form-body">
                    <div className="form-row">
                        <label style={{ margin: "7px" }}>Email:</label>
                        <input
                            className="horiz-field"
                            type="text"
                            placeholder="Enter your organization's email"
                            onChange={e => handleChange('primaryContact', e)}
                            required={true}
                        />
                    </div>
                    <div className="form-row">
                        <label style={{ margin: "7px" }}>Phone Number:</label>
                        <input
                            className="horiz-field"
                            type="text"
                            placeholder="(000)-000-0000"
                            onChange={e => handleChange('secondaryContact', e)}
                            required={true}
                        />
                    </div>
                    <div className="form-row">
                        <label style={{ margin: "7px" }}>Location:</label>
                        <input
                            className="horiz-field"
                            type="text"
                            placeholder="street address, city, state, zipcode"
                            onChange={e => handleChange('location', e)}
                            required={true}
                        />
                    </div>
                    <div className="form-row">
                        <label style={{ margin: "7px" }}>Upload a Banner for your Event:</label>
                        <input
                            className="horiz-field"
                            type="file"
                            onChange={e => this.props.handleFileInput(e)}
                            required={true}
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