import React from 'react'
import { useState } from 'react'
import { initializeGroup, updateGroup, updateDBdoc, getDocInfo} from '../utils/firebase';

import '../index.css'

const GroupCard = (props) => {
  console.log(props.name)
  return(
    <div className='group-card-container'>
      <button>
        <div>
          <img src={props.img} width="100px"/>
        </div>
        <div>
          <h2>{props.name}</h2>
          <text>filler description</text>
        </div>
        <div>
          {/* insert an icon here */}
          {props.numMembers}
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
    const groupArray = await this.renderGroups(this.state.id);
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
        arr[i] = <GroupCard name={await getDocInfo("groups", groups[i], "name")} img={"https://tinyurl.com/yu7zjska"}/>
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
        return <li className='group-card-list' style={{listStyle: 'none', marginRight:'25%'}}>{group}</li>;
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
    const [groupCode, setCode] = useState();
    const [name, setName] = useState();
    const [display, setDisplay] = useState();

    const joinGroup = (uid, e) => {
      e.preventDefault();
      const success = updateGroup(uid, groupCode)
      if (success)
        props.updateInfo(props.uid);
    }

    const createGroup = (uid, e) => {
      e.preventDefault();
      initializeGroup(uid, name)
    }

    return(
      <div>
        <h3>Welcome to your community.</h3>
        <div style={{display: 'flex', marginRight: '50rem', backgroundColor: "#D9BFB1"}}>
          <form onSubmit={(e) => joinGroup(props.uid, e)} style={{display: "flex"}}>
            <input name="input" type="text" placeholder='group code...' onChange={(e) => setCode(e.target.value)} ></input>
            <input type="submit" value="Join Group"></input>
          </form>
          <form onSubmit={(e) => createGroup(props.uid, e)} style={{display: "flex"}}>
            <input name="input" type="text" placeholder='group' onChange={(e) => setName(e.target.value)}></input>
            <input type="submit" value="New Group" ></input>
          </form>
        </div>

        <div className='group-bar-contain'>
          <div style={{display: 'flex', float: 'right', flexDirection: 'column', top: "1px", paddingRight: "10px" }}>
            <h2 className='groups-header'>Your Groups</h2>
            <GroupBar uid={props.uid}/>
          </div>
        </div>
        
      </div>
    );
  }

export default Community;