import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './MyCard.css'

export default function ExpandedCard(props, {
    showCard
}) {
    const { event, register } = props;
    const alertPopup = async (e) => {
        e.preventDefault();
        await register("FdAp9fMre3ZPEOTNkQgPYBgHnQC3", event.id);
        const content = "Succssfully registered for " + event.event_name + ". Navigate to your timeline to see your upcoming events!";
        alert(content);
    }

    return (
        <div style={{ paddingBottom: "10px" }}>
            <Card sx={{ width: 250, backgroundColor: "#AEC6CF", borderRadius: 5, paddingBottom: "5px" }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={event.banner}
                    alt={event.event_name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="spacing">
                        {event.event_name}
                    </Typography>
                    <Typography variant="body2" color="black" className="spacing">
                        <b>Date: </b>{event.date}
                    </Typography>
                    <Typography variant="body2" color="black" className="spacing">
                        <b>Hours: </b>{event.hours} | <b>Capacity: </b>{event.capacity}
                    </Typography>
                    <Typography variant="body2" color="black" className="spacing">
                        <b>Phone: </b>{event.phone}
                    </Typography>
                    <Typography variant="body2" color="black" className="spacing">
                        <b>Email: </b>{event.email}
                    </Typography>
                    <Typography paddingTop="10px" variant="body2" color="text.secondary" className="spacing">
                        {event.description}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button className="reg-button" style={{ margin: "auto", marginBottom: 5 }} size="small" onClick={(e) => alertPopup(e)}>Register</Button>
                    <Button className="reg-button" style={{ margin: "auto", marginBottom: 5 }} size="small" onClick={props.showCard}>Close</Button>
                </CardActions>
            </Card>
        </div>
    );
}