import React, { Component, Fragment } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import ExpandedCard from './ExpandedCard.js';



class MyCard extends Component {
    static propTypes = {
        eventName: PropTypes.instanceOf(String)
    };

    static defaultProps = {
        eventName: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            showComponent: false
        };
    }

    showCard = () => {
        if (this.state.showComponent) {
            this.setState({ showComponent: false });
        }
        else {
            this.setState({ showComponent: true });
        }
        console.log("clicked");
    }

    render() {
        const { alpha } = "test";
        const { eventName, eventMap, suggestions } = this.props
        console.log({ eventName })
        if (!this.state.showComponent) {
            console.log("rendered");
            return (
                <Card sx={{
                    maxWidth: 500,
                    maxHeight: 200,
                    boxShadow: 20,
                    backgroundColor: "#FFB743",
                    borderRadius: 3,
                    display: 'flex',
                    display: 'inline-flex',
                    positon: 'absolute',

                }}>
                    <CardMedia
                        component="img"
                        width="50"
                        image="https://picsum.photos/200.jpg"
                        alt="green iguana"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                        <CardContent>

                            <Typography gutterBottom variant="h5" component="div" color="white">
                                {eventName}
                            </Typography>

                            <Typography variant="body2" color="white" maxWidth={100} fontSize="5">
                                Date/Time:
                                {/* {eventMap[eventName].date} */}
                            </Typography>
                            <Typography variant="body2" color="white" maxWidth={100}>
                                Location:
                                {/* {eventMap[eventName].location} */}
                            </Typography>
                        </CardContent>
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
                                    width: 50
                                }}
                                size="small"
                            >Locate</Button>
                            <Button
                                sx={{
                                    outline: 'outset',
                                    width: 50
                                }}
                                size="small"
                            >Contact</Button>
                            <Button
                                sx={{
                                    outline: 'outset',
                                    width: 50
                                }}
                                size="small" onClick={this.showCard}>Learn More</Button>
                            {/* add an on click and setDisplay with it */}
                        </CardActions>
                    </Box>
                </Card >
            );
        }
        else {
            console.log("big card");
            return (
                <div style={{ marginRight: 5, marginTop: 2 }}><ExpandedCard event={eventMap[eventName]} showCard={this.showCard} /> </div>
            )
        }
    }
}

export default MyCard