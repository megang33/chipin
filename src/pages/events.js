import React from 'react'
import MyMap from '../components/map.js'
import Autocomplete from '../components/Autocomplete.js'
import { db, getDocInfo, auth } from '../utils/firebase';
import { collection, query, where, getDocs, documentId, onSnapshot } from "firebase/firestore";
import EventList from '../components/EventList.js'
import '../components/EventList.css'
import '../components/map.css'

const suggestions = [];
const q = query(collection(db, "events"));
const querySnapshot = onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    suggestions.push(doc.data().event_name);
  });
  console.log("Events: ", suggestions);
});

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: null,
      uid: props.uid
    };
  }

  async componentDidMount() {
    let uid = localStorage.getItem("user-login");
    let zc = await getDocInfo("users", uid, "zipcode")
    this.setState({
      zipcode: zc
    })
  }

  render() {
    console.log("eventszc: ", this.state.zipcode);
    const zcnull = this.state.zipcode ? <MyMap zipcode={this.state.zipcode} /> : <h2>Map loading..</h2>;
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
          <div>
            <EventList suggestions={suggestions} />
          </div>
        </div>
      </div>
    )
  }
}

//const latlng = getLatLngByZipcode(zipcode);

export default Events