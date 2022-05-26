import React, { useEffect } from 'react'
import { useState } from 'react'
import { initializeGroup, updateGroup, updateDBdoc, getDocInfo, getDocSnap} from '../utils/firebase';
import '../index.css'
import { getDoc } from 'firebase/firestore';
const GroupCard = (props) => {
  const leaveGroup = async (user, group) => {
    const numGroups= await getDocInfo("users", user, "numGroups")
    const groupsArray = await getDocInfo("users", user, "groups")
    const numUsers= await getDocInfo("groups", group, "numMembers")
    const userArray = await getDocInfo("groups", group, "members")
    groupsArray.splice(groupsArray.indexOf(group), 1)
    userArray.splice(userArray.indexOf(group), 1)
    const groupBody = {
      numMembers: numUsers - 1,
      members: userArray
    }
    const userBody ={
      numGroups: numGroups - 1,
      groups: groupsArray
    }

    updateDBdoc("users", user, userBody);
    updateDBdoc("groups", group, groupBody);
  }

  const getCumHours = async (group) => {
    const userArray = await getDocInfo("groups", group, "members");
    let total = 0;
    for (let i = 0; i < userArray.length; i++){
      total += await getDocInfo("users", userArray[i], "numHours");
    }
    console.log(total)
    return total;
  }

  const getMemList = async (group) => {
    const userArray = await getDocInfo("groups", group, "members");
    const nameArray = new Array(userArray.length)
    for (let i = 0; i < userArray.length; i++){
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

  const displayInfo = async () => {
    let hours = await getCumHours(props.id)
    let members = await getMemList(props.id)
    props.setDisplay(
      <div className='groupsite' style={{marginLeft: "5%"}}>
        <div>
          <div>
            <h1>{props.name}</h1>
            <p>Group code: {props.id}</p>
            <p>Collective Hours: {hours}</p>
          </div>
          <button>Edit</button>
          <button onClick={() => leaveGroup(props.uid, props.id)}>Leave Group</button>
          <div>
            <p>{props.description}</p>
            <p>{props.purpose}</p>
          </div>
          <h2>Events</h2>
          <ul>
            <li>filler event card one</li>
            <li>filler event card two</li>
          </ul>
        </div>
        <div>
          <h2>Member List</h2>
          {members}
        </div>
      </div>
    )
  }

  return(
    <div className='group-card-container'>
      <button style={{ borderRadius: '5px', borderWidth: '0px' }} onClick={() => displayInfo()}>
        <div style={{ width: "200px", height: "123px"}}>
          <div>
            <img className='group-img' src={props.img}/>
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
  constructor(props){
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
    if (uid != null){
      console.log("numGroups")
      const numGroups = await getDocInfo("users", uid, "numGroups")
      console.log("groups")
      const groups = await getDocInfo("users", uid, "groups")
      let arr = []
      for (let i = 0; i < numGroups; i += 1){
        console.log("name")
        arr[i] = <GroupCard name={await getDocInfo("groups", groups[i], "name")} img={await getDocInfo("groups", groups[i], "img")} setDisplay={this.props.setDisplay}
                  description={await getDocInfo("groups", groups[i], "description")} purpose={await getDocInfo("groups", groups[i], "purpose")} id={groups[i]} uid={uid}/>
      }
      console.log(arr)
      return arr;
    }
  }

  render() {
    let list;
    if (this.state.groups != null){
      const groups = this.state.groups
      console.log(groups);
      list = groups.map((group) => {
        return <li className='group-card-list' style={{listStyle: 'none', marginRight: "-8px"}}>{group}</li>;
      })
    }
    return(
      <div className='groups'>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

const Community = (props) => {
    const front = <div style={{marginLeft: "5%"}}>
      <h1>Welcome to your Community Page!</h1>
      <h2>Use the group bar to navigate between groups!</h2>
      <text>
        This is going to be filler text for where all group activity is going to take place,
        where all relevant event details will appear and where you can navigate to individual
        group pages!
      </text>
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

    const createGroup = () => {
      var name;
      var description;
      var link;
      var purpose;
      setDisplay(
        <div>
          <h1>Create your own group</h1>
          <form style={{display:"flex", flexDirection:"column",}} onSubmit={(e) => {handleSubmit(props.uid, name, description, link, purpose, e)}}>
            {/* Insert icons representing each field later */}
            <div>
              <input placeholder='name' onChange={(e) => {name = e.target.value}}></input>
            </div>
            <div>
              <input placeholder='description' onChange={e => {description = e.target.value}}></input>
            </div>
            <div>
              <input placeholder='upload an image (link for now)' onChange={e => {link = e.target.value}}></input>
            </div>
            <div>
              <input placeholder='purpose' onChange={e => {purpose = e.target.value}}></input>
            </div>
            <div>
              <input type='submit' value="Finalize Creation"></input>
            </div>
          </form>
          <div>{name} {description} {link} {purpose}</div>
        </div>
      )
    }

    const showPage = (display) => {
      setDisplay(display);
    }

    return(
      <div>
        <h3>Welcome to your community.</h3>
        <div style={{display: 'flex', marginRight: '50rem', backgroundColor: "#D9BFB1"}}>
          <form onSubmit={(e) => joinGroup(props.uid, e)} style={{display: "flex"}}>
            <input name="input" type="text" placeholder='group code...' onChange={(e) => setCode(e.target.value)} ></input>
            <input type="submit" value="Join Group"></input>
          </form>
          <button onClick={() => createGroup()}>Create A Group</button>
        </div>

        <div style={{ float: "right", marginTop: "-5%" }}>
          <h2 className='groups-header'>your groups</h2>
          <div className='group-bar-contain'>
            <div className='group-bar-inner'>
              <GroupBar uid={props.uid} setDisplay={(display) => showPage(display)}/>
            </div>
          </div>
        </div>
        <div>
          {display}
        </div>  
      </div>
    );
  }

export default Community;