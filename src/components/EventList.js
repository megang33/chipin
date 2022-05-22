import React, { Component } from 'react'
import MyCard from './MyCard';
import NavBar from './navbar';

class EventList extends React.Component {

    render() {
        return <MyCard />
    }
}
export default React.memo(EventList)
