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
    const { event } = props;
    return (
        <Card sx={{ maxWidth: 350, backgroundColor: "#FFB743", borderRadius: 5, boxShadow: 20 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://picsum.photos/200.jpg"
                //should be {event.banner}
                alt={event.event_name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="spacing">
                    {event.event_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="spacing">
                    date: {event.date} | hours: {event.hours} | capacity: {event.capacity}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="spacing">
                    phone: {event.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="spacing">
                    email: {event.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="spacing">
                    {event.description}
                </Typography>
            </CardContent>

            <CardActions>
                <Button className="reg-button" style={{ margin: "auto", marginBottom: 5 }} size="small">Register</Button>
                <Button className="reg-button" style={{ margin: "auto", marginBottom: 5 }} size="small" onClick={props.showCard}>Close</Button>
            </CardActions>
        </Card>
    );
}