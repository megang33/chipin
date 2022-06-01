import React from 'react'
import MyMap from '../components/map.js'
import Autocomplete from '../components/Autocomplete.js'
import MyCard from '../components/MyCard.js'
import { db, getDocInfo, updateDBdoc } from '../utils/firebase';
import { collection, query, where, getDocs, documentId, onSnapshot, arrayUnion, arrayRemove, getDoc, deleteDoc } from "firebase/firestore";
import EventList from '../components/EventList.js'
import '../components/EventList.css'
import '../components/map.css'

const suggestions = [];
const eventMap = {};
const q = query(collection(db, "events"));
const querySnapshot = onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    suggestions.push(doc.data().event_name);
    const fields = {
      'id': doc.id,
      'event_name': doc.data().event_name,
      'date': doc.data().date,
      'capacity': doc.data().capacity,
      'description': doc.data().description,
      'email': doc.data().email,
      'phone': doc.data().phone_number,
      'address': doc.data().location,
      'banner': doc.data().banner,
      'hours': doc.data().hours,
      'timeStart': doc.data().timeStart,
      'timeEnd': doc.data().timeEnd,
    }
    eventMap[doc.data().event_name] = fields;
    //console.log("event obj:", eventMap[doc.data().event_name])
    console.log("ADDRESSES: ", eventMap[doc.data().event_name].address)
  });
  console.log("Events: ", suggestions);
  console.log("event map:", eventMap);
});

// Implement using time-based API? Note: more complicated, will require more research
export const initiateEvent = async (eid) => {
  const hasEventEnded = await getDocInfo("events", eid, "hasEventEnded")
  const eventDate = await getDocInfo("events", eid, "date");
  const startTime = await getDocInfo("events", eid, "timeStart")

  const ctime = new Date();
  var currentDate = new Date(Date.UTC(ctime.getFullYear(), ctime.getMonth(), ctime.getDate(), ctime.getTimezoneOffset() / 60 + ctime.getHours(), ctime.getMinutes(), ctime.getSeconds()))

  const yymmdd = eventDate.split('-')
  const st = startTime.split(':')
  var eventStart = new Date(Date.UTC(Number(yymmdd[0]), Number(yymmdd[1]) - 1, Number(yymmdd[2]), ctime.getTimezoneOffset() / 60 + Number(st[0]), Number(st[1]), 0))

  if (eventStart <= currentDate && hasEventEnded != true) {
    updateDBdoc("events", eid, { hasEventStarted: true })
  }
}

export const isActive = async (eid) => {
  return await getDocInfo("events", eid, "hasEventStarted")
}

export const endEvent = async (uid, eid) => {
  const hasEventEnded = await getDocInfo("events", eid, "hasEventEnded")
  const eventDate = await getDocInfo("events", eid, "date");
  const endTime = await getDocInfo("events", eid, "timeEnd")

  const ctime = new Date();
  var currentDate = new Date(Date.UTC(ctime.getFullYear(), ctime.getMonth(), ctime.getDate(), ctime.getTimezoneOffset() / 60 + ctime.getHours(), ctime.getMinutes(), ctime.getSeconds()))

  const yymmdd = eventDate.split('-')
  const st = endTime.split(':')
  var eventEnd = new Date(Date.UTC(Number(yymmdd[0]), Number(yymmdd[1]) - 1, Number(yymmdd[2]), ctime.getTimezoneOffset() / 60 + Number(st[0]), Number(st[1]), 0))
  console.log(eventEnd)
  console.log(currentDate)
  console.log(eventEnd <= currentDate)
  if (eventEnd <= currentDate && hasEventEnded != true) {
    const updateEvent = {
      hasEventEnded: true,
    }
    const updateUser = {
      currentEvents: arrayRemove(eid),
      pastEvents: arrayUnion(eid),
      eventsCompleted: await getDocInfo("users", uid, "eventsCompleted") + 1,
    }
    updateDBdoc("events", eid, updateEvent)
    updateDBdoc("users", uid, updateUser)
  }
}

export const registerToEvent = async (uid, eid) => {
  // If the person presses the register button
  // 1. If the capacity has already been reached to max, simply break;
  // 2. Update the array of people registered
  // 3. Add the event to the current list of events registered of the user.
  const registered = await getDocInfo("events", eid, "registered")
  const capacity = await getDocInfo("events", eid, "capacity")
  if (registered.length < capacity) {
    const updateEvent = {
      registered: arrayUnion(uid),
    }
    const updateUser = {
      currentEvents: arrayUnion(eid),
    }
    await updateDBdoc("events", eid, updateEvent)
    await updateDBdoc("users", uid, updateUser)
  }
  return;
}

export const unregister = async (uid, eid) => {
  const updateEvent = {
    registered: arrayRemove(uid),
  }
  updateDBdoc("events", eid, updateEvent)
}

// This function will be called such that, organization-called
export const checkIn = async (uid, eid) => {
  // if
  // 1. get the array and find the index of the uid, if not present, it will return -1 array.indexOf
  // 2. place them in the verified array
  // 3. 
  if (!isActive(eid)) {
    return;
  }
  const registeredUsers = {
    checkedIn: arrayUnion(uid),
  }
  updateDBdoc("events", eid, registeredUsers)
}

export const deleteEvent = async (eid) => {
  if (isActive(eid)) {
    return
  }
  const registered = await getDocInfo("events", eid, "registered")
  for (let i = 0; i < registered.length; i++) {
    let updateUser = {
      currentEvents: arrayRemove(eid)
    }
    updateDBdoc("users", registered[i], updateUser)
  }
  deleteDoc("events", eid)
}

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: null,
      uid: props.uid,
      recenter: null
    };

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  async componentDidMount() {
    let uid = localStorage.getItem("user-login");
    let zc = await getDocInfo("users", uid, "zipcode")
    this.setState({
      zipcode: zc
    })
  }

  handleCardClick(zc) {
    this.setState({
      recenter: zc
    })
    console.log('prt', zc)
  }

  render() {
    //console.log("eventszc: ", this.state.zipcode);
    const zcnull = this.state.zipcode ? <MyMap zipcode={this.state.zipcode} recenter={this.state.recenter} eventDict={eventMap} eventNames={suggestions}/> : <h2>Map loading..</h2>;
    return (
      <div>
        <div className='horizontal'>
          <div className='vertical'>
            <div>
              <h3>Find an Event</h3>
            </div>
            <div>
              <Autocomplete suggestions={suggestions} />
            </div>
            <div>
              {zcnull}
            </div>

          </div>
          <div style={{ marginTop: 80 }}>
            <EventList suggestions={suggestions} eventMap={eventMap} register={registerToEvent} handleCardClick={this.handleCardClick} />
          </div>
        </div>
      </div>
    )
  }
}

//const latlng = getLatLngByZipcode(zipcode);

export default Events