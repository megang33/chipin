import React from 'react'
import MyMap from '../components/map.js'
import Autocomplete from '../components/Autocomplete.js'
import { sort, sqrt } from 'mathjs'
import Geocode from 'react-geocode'
import { db, getDocInfo, updateDBdoc } from '../utils/firebase';
import { collection, query, onSnapshot, arrayUnion, arrayRemove, getDoc, deleteDoc } from "firebase/firestore";
import EventList from '../components/EventList.js'
import '../components/EventList.css'
import '../components/map.css'



const suggestions = [];
const eventMap = {};
const q = query(collection(db, "events"));
const querySnapshot = onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    suggestions.push(doc.data().eventName);
    const fields = {
      'id': doc.id,
      'eventName': doc.data().eventName,
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
    eventMap[doc.data().eventName] = fields;
    //console.log("event obj:", eventMap[doc.data().eventName])
    console.log("ADDRESSES: ", eventMap[doc.data().eventName].address)
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

export const deleteEvent = async (oid, eid) => {
  if (await isActive(eid)) {
    return
  }
  const registered = await getDocInfo("events", eid, "registered")
  console.log(registered)
  for (let i = 0; i < registered.length; i++) {
    let updateUser = {
      currentEvents: arrayRemove(eid)
    }
    await updateDBdoc("users", registered[i], updateUser)
  }
  let updateOrg = {
    events: arrayRemove(eid)
  }
  await updateDBdoc("organizations", oid, updateOrg)
  deleteDoc("events", eid)
}

export const sortByDistance = async (events, zc) => {
  Geocode.setApiKey("AIzaSyCjR09fOMTXIOF3vvAjn0fpa8A7Rrb-uho");
  let map = new Map()
  let mapDistanced = new Map()
  let ziplat, ziplng

  const setLatLng = (lat, lng) => {
    ziplat = lat
    ziplng = lng
  }

  await Geocode.fromAddress(zc).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setLatLng(lat, lng)
    },
    (error) => { console.error(error) }
  )

  for (let i = 0; i < events.length; i++) {
    await Geocode.fromAddress(eventMap[events[i]].address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        map.set(events[i], [lat, lng])
      },
      (error) => { console.error(error) }
    )
  }

  await map.forEach((value, key) => {
    let tempLat = ziplat - value[0]
    let tempLng = ziplng - value[1]
    tempLat = tempLat * tempLat
    tempLng = tempLng * tempLng
    let distance = sqrt(tempLat + tempLng)
    mapDistanced.set(key, distance)
  })

  const sortedMap = new Map([...mapDistanced.entries()].sort((a, b) => b[1] - a[1]).reverse())
  let sortedList = new Array()
  sortedMap.forEach((value, key) => {
    sortedList.push(key)
  })
  return sortedList
}

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: null,
      uid: props.uid,
      sortedEvents: null,
      recenter: null
    };

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleAutoComplete = this.handleAutoComplete.bind(this)
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

  handleAutoComplete(ac) {
    console.log("$$$$$$")
    this.setState({
      autocomplete_list: ac
    })
    console.log('AC###', ac)
  }

  render() {
    const elnull = this.state.zipcode ? <EventList suggestions={suggestions} eventMap={eventMap} register={registerToEvent} handleCardClick={this.handleCardClick} zc={this.state.zipcode} searchInfo={this.state.autocomplete_list} /> : <h2>List loading...</h2>
    console.log("eventszc: ", this.state.zipcode);
    const zcnull = this.state.zipcode ? <MyMap zipcode={this.state.zipcode} recenter={this.state.recenter} eventDict={eventMap} eventNames={suggestions} /> : <h2>Map loading..</h2>;
    return (
      <div>
        <div className='horizontal'>
          <div className='vertical'>
            <div>
              <Autocomplete suggestions={suggestions} handleAutoComplete={this.handleAutoComplete} />
            </div>
            <div>
              {zcnull}
            </div>

          </div>
          <div>
            <div className='event-bar-contain' style={{ display: "flex", flexDirection: "column", marginTop: "-0.2%" }}>
              <div>
                <h2>Events</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className='event-bar-inner'>
                  {elnull}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Events