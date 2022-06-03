import React, { Component, Fragment, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getDocInfo } from '../utils/firebase.js';
import { registerToEvent } from '../pages/events.js';
import PropTypes from 'prop-types';
import { display } from '@mui/system';

export default function EventCard(props) {
    let canRegister = true
    let isOrg = props.oid === null ? false : true
    for(let i = 0; i < props.eventData.registered.length; i++){
        if (localStorage.getItem("user-login") === props.eventData.registered[i]){
            canRegister = false
            break;
        }
    }
    console.log(canRegister)
    let displayRegister
    if (isOrg) {
         displayRegister = <div></div>
    } else if (canRegister){
        displayRegister = <div>
            <CardActions
                sx={{
                    display: 'flex',
                    alignContent: 'space-around',
                    flexDirection: 'column',
                    p: 1,
                    m: 1,
                    borderRadius: 10,
                }}
            >
                <Button
                    sx={{
                        outline: 'outset',
                        width: 70,
                        padding: 2,
                        marginBottom: 2
                    }}
                    size="small" onClick={(e) => alertPopup(e)}>Register</Button>
            </CardActions>
        </div>
    } else {
         displayRegister = ""
    }
    console.log(displayRegister)

    const alertPopup = async (e) => {
        e.preventDefault();
        const uid = localStorage.getItem("user-login");
        await registerToEvent(uid, props.eventData.id);
        const content = "Succssfully registered for " + props.eventData.eventName + ". Navigate to your timeline to see your upcoming events!";
        alert(content);
    }
    console.log(props.eventData)

    return (
        <div style={{ paddingBottom: "10px" }}>
            <Card sx={{
                width: 450,
                maxHeight: 600,
                boxShadow: 2,
                backgroundColor: "#D2D2D2",
                borderRadius: 3,
                display: 'flex',
                display: 'inline-flex',
                flexDirection: 'column',
                positon: 'absolute',

            }}>
                <div>
                    <CardMedia
                        component="img"
                        width="10"
                        height="20"
                        image={props.eventData.banner}
                        alt={props.eventData.eventName}
                        className="mycard-img"
                    />
                </div>
                <div>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <CardContent className='eventcard-details'>
                            <Typography gutterBottom variant="h5" component="div" color="black">
                                <b>{props.eventData.eventName}</b>
                            </Typography>
                            <Typography variant="body2" color="black" maxWidth={400} fontSize="5">
                                <b>Date/Time: </b>{props.eventData.date} {props.eventData.timeStart}-{props.eventData.timeEnd}
                            </Typography>
                            <Typography variant="body2" color="black" maxWidth={400}>
                                <b>Location: </b>{props.eventData.location}
                            </Typography>
                            <Typography paddingTop="10px" variant="body2" color="text.secondary" maxWidth={400}>
                                {props.eventData.description}
                            </Typography>
                        </CardContent>
                        {displayRegister}
                    </Box>
                </div>
            </Card>
        </div>
    );

}
