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
        eventName: PropTypes.instanceOf(String),
    };

    static defaultProps = {
        eventName: "",
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
        const { eventName, eventMap, register } = this.props
        console.log({ eventName })
        if (!this.state.showComponent) {
            return (
                <div onClick={this.showCard}>
                    <Card sx={{
                        maxWidth: 400,
                        maxHeight: 200,
                        boxShadow: 20,
                        backgroundColor: "#AEC6CF",
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
                                    Date: {eventMap[eventName].date}
                                </Typography>
                                <Typography variant="body2" color="white" maxWidth={100}>
                                    Location: {eventMap[eventName].location}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card >
                </div>
            );
        }
        else {
            return (
                <div style={{ marginRight: 5, marginTop: 2 }}><ExpandedCard event={eventMap[eventName]} showCard={this.showCard} register={register} /> </div>
            );
        }
    }
}

export default MyCard