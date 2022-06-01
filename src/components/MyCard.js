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
        eventLocation: PropTypes.instanceOf(String),
        eventDate: PropTypes.instanceOf(String)
    };

    static defaultProps = {
        eventName: "",
        eventLocation: "",
        eventDate: ""
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
        const { eventName } = this.props
        const { eventLocation } = this.props
        const { eventDate } = this.props
        console.log({ eventName })
        console.log({ eventDate })
        console.log({ eventLocation })
        return (
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

                        <Typography gutterBottom variant="h5" component="div" color="white">
                            {eventName}
                        </Typography>

                        <Typography variant="body2" color="white" maxWidth={100} fontSize="5">
                            Date: {eventDate}
                        </Typography>
                        <Typography variant="body2" color="white" maxWidth={100}>
                            Location: {eventLocation}
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




                    </CardActions>
                </Box>
            </Card >
        );
    }
}

export default MyCard