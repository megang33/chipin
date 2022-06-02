import React from 'react'
import { useState } from 'react'
import { initializeGroup, updateGroup, updateDBdoc, getDocInfo, getDocSnap, removeDoc, uploadFile, getImageByFile } from '../utils/firebase';
import '../index.css'
import './community.css'
import EventCard from '../components/eventcard.js'
import { arrayRemove, getDoc } from 'firebase/firestore';

const GroupCard = (props) => {
  const [image, setImage] = useState()

  const leaveGroup = async (user, group) => {
    const numGroups = await getDocInfo("users", user, "numGroups")
    const groupsArray = await getDocInfo("users", user, "groups")
    const numUsers = await getDocInfo("groups", group, "numMembers")
    const userArray = await getDocInfo("groups", group, "members")
    groupsArray.splice(groupsArray.indexOf(group), 1)
    userArray.splice(userArray.indexOf(group), 1)
    const groupBody = {
      numMembers: numUsers - 1,
      members: userArray
    }
    const userBody = {
      numGroups: numGroups - 1,
      groups: groupsArray
    }

    updateDBdoc("users", user, userBody);
    updateDBdoc("groups", group, groupBody);
  }

  const getCumHours = async (group) => {
    const userArray = await getDocInfo("groups", group, "members");
    let total = 0;
    for (let i = 0; i < userArray.length; i++) {
      total += await getDocInfo("users", userArray[i], "numHours");
    }
    console.log(total)
    return total;
  }

  const getMemList = async (group) => {
    const userArray = await getDocInfo("groups", group, "members");
    const nameArray = new Array(userArray.length)
    for (let i = 0; i < userArray.length; i++) {
      nameArray[i] = await getDocInfo("users", userArray[i], "name");
    }
    const memList = nameArray.map((name) => {
      return <li>{name}</li>
    })
    return (<div><ul>
      {memList}
    </ul>
    </div>);
  }

  const deleteGroup = async (gid) => {
    console.log("hi")
    const members = await getDocInfo("groups", gid, "members")
    console.log(members)
    for (let i = 0; i < members.length; i++) {
      let updateUser = {
        groups: arrayRemove(gid),
        numGroups: await getDocInfo("users", members[i], "numGroups") - 1
      }
      console.log(members[i])
      await updateDBdoc("users", members[i], updateUser)
    }
    removeDoc("groups", gid)
  }

  const getEvents = async () => {
    console.log(props.id)
    const events = await getDocInfo("groups", props.id, "currentEvents")
    console.log(events)
    const eventMap = []
    for (var i = 0; i < events.length; i++) {
      const eventName = await getDocInfo("events", events[i], "eventName")
      const date = await getDocInfo("events", events[i], "date")
      const capacity = await getDocInfo("events", events[i], "capacity")
      const description = await getDocInfo("events", events[i], "description")
      const registered = await getDocInfo("events", events[i], "registered")
      const location = await getDocInfo("events", events[i], "location")
      const email = await getDocInfo("events", events[i], "email")
      const timeStart = await getDocInfo("events", events[i], "timeStart")
      const timeEnd = await getDocInfo("events", events[i], "timeEnd")
      const eventInfo = {
        id: events[i],
        eventName: eventName,
        date: date,
        capacity: capacity,
        description: description,
        registered: registered,
        location: location,
        email: email,
        timeStart: timeStart,
        timeEnd: timeEnd
      }
      eventMap[i] = eventInfo;
    }

    return eventMap.map((event) => {
      return <div><EventCard eventData={event}></EventCard></div>
    });
  }

  const displayInfo = async () => {
    const eventCards = await getEvents()
    let hours = await getCumHours(props.id)
    let members = await getMemList(props.id)
    const founder = await getDocInfo("groups", props.id, "founder")
    let canDeleteGroup = (founder == props.uid) ? <button className='forward-button' onClick={() => deleteGroup(props.id)}>Delete</button> : null
    props.setDisplay(
      <div className='group-info' style={{ marginLeft: "5%" }}>
        <div style={{ marginLeft: "60px" }}>
          <h1>{props.name}</h1>
        </div>

        <div className='group-info-round-rect'>
          <div style={{ width: "700px" }}>
            <div style={{ position: "relative", top: "5%", left: "10%" }}>
              <p>Group code: {props.id}</p>
              <p>Collective Hours: {hours}</p>
            </div>
            <div className='group-details-buttons'>
              <button className='forward-button'>Edit</button>
              <button className='forward-button' onClick={() => leaveGroup(props.uid, props.id)}>Leave Group</button>
              {canDeleteGroup}
            </div>

            <div style={{ paddingLeft: "10%" }}>
              <p>{props.description}</p>
              <p>{props.purpose}</p>
            </div>

            <div style={{ paddingLeft: "10%" }}>
              <h2>Events</h2>
              <div className='scroll-container'>
                {eventCards}
              </div>
            </div>
          </div>
        </div>

        <div className='group-info-member-list'>
          <h2>Member List</h2>
          <div className='scroll-container'>
            {members}
          </div>
        </div>
      </div>
    )
  }

  React.useEffect(() => {
    getImageByFile(props.img, setImage)
  }, [])

  return (
    <div className='group-card-container'>
      <button style={{ borderRadius: '5px', borderWidth: '0px' }} onClick={() => displayInfo()}>
        <div style={{ width: "200px", height: "123px" }}>
          <div>
            <img className='group-img' src={image} />
          </div>
          <div className='group-card-text'>
            <div style={{ position: "relative", width: "100%" }}>
              <h2 className='group-card-name'>{props.name}</h2>
            </div>
            <text className='group-card-desc'>filler description</text>
          </div>
          <div>
            {/* insert an icon here */}
            {props.numMembers}
          </div>
        </div>

      </button>
    </div>
  );
}

class GroupBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.uid,
      numGroups: 0,
      groups: null,
    };
  }

  componentDidMount = async () => {
    const groupArray = await this.renderGroups(localStorage.getItem("user-login"));
    this.setState({
      groups: groupArray,
    })
  }

  renderGroups = async (uid) => {
    if (uid != null) {
      console.log("numGroups")
      const numGroups = await getDocInfo("users", uid, "numGroups")
      console.log("groups")
      const groups = await getDocInfo("users", uid, "groups")
      let arr = []
      for (let i = 0; i < numGroups; i += 1) {
        arr[i] = <GroupCard name={await getDocInfo("groups", groups[i], "name")} img={await getDocInfo("groups", groups[i], "img")} setDisplay={this.props.setDisplay}
          description={await getDocInfo("groups", groups[i], "description")} purpose={await getDocInfo("groups", groups[i], "purpose")} id={groups[i]} uid={uid} />
      }
      console.log(arr)
      return arr;
    }
  }

  render() {
    let list;
    if (this.state.groups != null) {
      const groups = this.state.groups
      console.log(groups);
      list = groups.map((group) => {
        return <li className='group-card-list' style={{ listStyle: 'none', marginRight: '25%' }}>{group}</li>;
      })
    }
    return (
      <div className='groups'>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

const Community = (props) => {
  const front = <div style={{ marginLeft: "5%" }}>
    <h1>Welcome to your Community Page!</h1>
    <h2>Use the group bar to navigate between groups!</h2>
  </div>

  const [groupCode, setCode] = useState();
  const [display, setDisplay] = useState(front);

  const joinGroup = (uid, e) => {
    e.preventDefault();
    const success = updateGroup(uid, groupCode)
    if (success)
      props.updateInfo(props.uid);
  }

  const handleSubmit = (uid, name, desc, link, purpose, e) => {
    e.preventDefault();
    console.log(uid + " " + name + " " + desc + " " + link + " " + purpose)
    initializeGroup(uid, name, desc, link, purpose)
    setDisplay(front);
  }

  const createGroup = async () => {
    var name;
    var description;
    var link;
    var purpose;
    setDisplay(
      <div className='create-group-contain'>
        <div style={{ marginLeft: "-270px" }} className="form-header">
          <h1>Create your own group</h1>
        </div>
        
        <div className='create-group-round-rect'>
          <div style={{ paddingTop: "30px" }} className="form-body">
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center"}} onSubmit={(e) => { handleSubmit(props.uid, name, description, link, purpose, e) }}>
              {/* Insert icons representing each field later */}
              <div style={{ display: "flex", flexDirection: "row" }} className="form-row">
                <label style={{ width: "95px", margin: "7px", lineHeight: "34px" }}>Group Name:</label>
                <input className="horiz-field" placeholder='name' onChange={(e) => { name = e.target.value }}></input>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }} className="form-row">
                <label style={{ width: "95px", margin: "7px", lineHeight: "34px" }}>Description:</label>
                <input className="horiz-field" placeholder='description' onChange={e => { description = e.target.value }}></input>
              </div>
              <div style={{ marginLeft: "70px", display: "flex", flexDirection: "row" }} className="form-row">
                <label style={{ margin: "7px", lineHeight: "5px", marginRight: "15px" }}>Image: </label>
                <input style={{  }} type="file" placeholder='Upload Image' onChange={e => { link = e.target.files[0].name; uploadFile(e.target.files[0]) }}></input>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }} className="form-row">
                <label style={{ width: "95px", margin: "7px", lineHeight: "34px" }}>Purpose:</label>
                <input className="horiz-field" placeholder='purpose' onChange={e => { purpose = e.target.value }}></input>
              </div>
              <div className="form-row">
                <input className='forward-button' type='submit' value="Finalize Creation"></input>
              </div>
            </form>
            <div>{name} {description} {link} {purpose}</div>
          </div>
        </div>
        
        
      </div>
    )
  }

  const showPage = (display) => {
    setDisplay(display);
  }

  return (
    <div>
      <h3>Welcome to your community.</h3>
      <div className='group-create-bar'>
        <form onSubmit={(e) => joinGroup(props.uid, e)} style={{ display: "flex" }}>
          <input style={{ marginLeft: "-60px", width: "200px" }} className='input-field' id='create-group-input' name="input" type="text" placeholder='group code' onChange={(e) => setCode(e.target.value)} ></input>
          <input className='forward-button' type="submit" value="Join Group"></input>
        </form>
        <button id='create-group-button' className='forward-button' onClick={() => createGroup()}>Create A Group</button>
      </div>
      <div className='group-bar-contain'>
        <div className='group-bar-inner'>
          <h2 className='groupsHeader'>Your Groups</h2>
          <GroupBar uid={props.uid} setDisplay={(display) => showPage(display)} />
        </div>
      </div>
      <div>
        {display}
      </div>
    </div>
  );
}

export default Community;