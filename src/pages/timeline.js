import React, { useState } from 'react'
const TimeLine = (props) => {
    return(
        <div>
            <h1 style={{ paddingLeft: "13%", paddingTop: "50px" }}>Hi {props.name}, here's your timeline.</h1>
            <div className='round-rect'>
                <div>
                    <div className='stats-wrapper'>
                        <div className='big-num' style={{ left: "5.5%" }}>
                            <h1 style={{ fontSize: "50px" }}>69</h1>
                            <div className='unit-text' style={{ left: "110%" }}>hrs completed</div>
                        </div>
                        <div className='solid-rect' style={{ left: "5%" }}/>
                    </div>
                    <div className='stats-wrapper'>
                        <div className='big-num' style={{ left: "30.5%" }}>
                            <h1 style={{ fontSize: "50px" }}>04</h1>
                        </div>
                        <div className='solid-rect' style={{ left: "30%" }}/>
                    </div>
                    <div className='stats-wrapper'>
                        <div className='big-num' style={{ left: "55.5%" }}>
                            <h1 style={{ fontSize: "50px" }}>12</h1>
                        </div>
                        <div className='solid-rect' style={{ left: "55%" }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TimeLine