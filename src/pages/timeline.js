import { async } from '@firebase/util';
import React, { useState } from 'react'
import { getDocInfo } from '../utils/firebase';
import "./timeline.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot, faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons'

const StatsBar = (props) => {
    if (props.role) {
        return(
            <div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "5.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>69</p>
                        <div className='unit-text' style={{ left: "2%" }}>hrs completed</div>
                    </div>
                    <div className='solid-rect' style={{ left: "5%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "30.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>12</p>
                        <div className='unit-text' style={{ left: "2%" }}>events attended</div>
                    </div>
                    <div className='solid-rect' style={{ left: "30%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "55.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.numGroups < 10) ? "0": ""}{ props.numGroups }</p>
                        <div className='unit-text' style={{ left: "2%" }}>{(props.numGroups == 1) ? "group joined" : "groups joined"}</div>
                    </div>
                    <div className='solid-rect' style={{ left: "55%" }}/>
                </div>
            </div>
        );
    } else {
        return(
            <div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "5.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>69</p>
                        <div className='unit-text' style={{ left: "2%" }}>events created</div>
                    </div>
                    <div className='solid-rect' style={{ left: "5%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "30.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>12</p>
                        <div className='unit-text' style={{ left: "2%" }}>upcoming events</div>
                    </div>
                    <div className='solid-rect' style={{ left: "30%" }}/>
                </div>
                <div className='stats-wrapper'>
                    <div className='big-num' style={{ left: "55.5%" }}>
                        <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (props.numGroups < 10) ? "0": ""}{ props.numGroups }</p>
                        <div className='unit-text' style={{ left: "2%" }}>{(props.numGroups == 1) ? "group joined" : "groups joined"}</div>
                    </div>
                    <div className='solid-rect' style={{ left: "55%" }}/>
                </div>
            </div>
        );
    }
}

export default class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            numGroups: 0,
            role: true
        };
    }

    componentDidMount = async() => {
        let id = localStorage.getItem("user-login");
        let name = await getDocInfo("users", id, "name");
        let numGroups = await getDocInfo("users", id, "numGroups");
        let role = await getDocInfo("users", id, "role");
        this.setState({
            name: name,
            numGroups: numGroups,
            role, role
        })
    }

    render() {
        return(
            <div>
                <h1 style={{ paddingLeft: "13%", paddingTop: "25px" }}>Hi { this.state.name }, here's your timeline.</h1>
                <div className='round-rect'>
                    {/* <div>
                        <div className='stats-wrapper'>
                            <div className='big-num' style={{ left: "5.5%" }}>
                                <p style={{ fontSize: "50px", lineHeight: "0.7" }}>69</p>
                                <div className='unit-text' style={{ left: "2%" }}>hrs completed</div>
                            </div>
                            <div className='solid-rect' style={{ left: "5%" }}/>
                        </div>
                        <div className='stats-wrapper'>
                            <div className='big-num' style={{ left: "30.5%" }}>
                                <p style={{ fontSize: "50px", lineHeight: "0.7" }}>12</p>
                                <div className='unit-text' style={{ left: "2%" }}>events attended</div>
                            </div>
                            <div className='solid-rect' style={{ left: "30%" }}/>
                        </div>
                        <div className='stats-wrapper'>
                            <div className='big-num' style={{ left: "55.5%" }}>
                                <p style={{ fontSize: "50px", lineHeight: "0.7" }}>{ (this.state.numGroups < 10) ? "0": ""}{ this.state.numGroups }</p>
                                <div className='unit-text' style={{ left: "2%" }}>{(this.state.numGroups == 1) ? "group joined" : "groups joined"}</div>
                            </div>
                            <div className='solid-rect' style={{ left: "55%" }}/>
                        </div>
                    </div> */}
                    <StatsBar role={this.state.role} numGroups={this.state.numGroups}></StatsBar>
                    <div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h1 className='internal-header' id='community-head'>community</h1>
                            <FontAwesomeIcon icon={faUser} style={{ position: "absolute", left: "257px", top: "142px" }}/>
                            <FontAwesomeIcon icon={faUser} style={{ position: "absolute", left: "268px", top: "142px" }}/>
                        </div>
                        <div>
                            <p style={{ position: "absolute", left: "80px", top: "145px" }}>what's new with your groups</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}