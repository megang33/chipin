import React from 'react';
import { useState } from 'react';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot, faPhone, faAddressCard, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { updateDBdoc, addDBdoc, addOrg } from '../utils/firebase.js';

const SignUp = (props) => {
  const [name, setName] = useState();
  const [affiliation, setAffiliation] = useState();
  const [number, setNumber] = useState();
  const [zipcode, setZip] = useState();
  const [role, setRole] = useState();

  const handleSubmit = async (e) => {
    // console.log(props.doc.get("uid"));
    //add stuff to firebase
    e.preventDefault();
    let body
    if (role){
      body = {
        name: name,
        oid: null,
        affiliation: affiliation,
        number: number,
        zipcode: zipcode,
        registered: true,
        groups: [],
        numGroups: 0,
        numHours: 0,
        role: role,
        pastEvents: [],
        currentEvents: [],
        eventsCompleted: 0,
      }
    }else{
      const oid = await addOrg(affiliation)
      body = {
        name: name,
        oid: oid,
        affiliation: affiliation,
        number: number,
        zipcode: zipcode,
        registered: true,
        groups: [],
        numGroups: 0,
        numHours: 0,
        role: role,
        pastEvents: [],
        currentEvents: [],
        eventsCompleted: 0,
      }
    }
    updateDBdoc("users", props.uid, body);
    props.updateInfo(props.uid);
  }

  const onChangeValue = (event) => {
    setRole(event.target.value == "volunteer" ? true : false)
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", paddingTop: "30px" }}>Let's get you started.</h1>
      <form className='round-rect' onSubmit={(e) => { handleSubmit(e) }}>
        <div style={{ paddingTop: "5%" }}>
          <div className="flex-form">
            <FontAwesomeIcon icon={faUser} />
            <input className='input-field' name="name" type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex-form">
            <FontAwesomeIcon icon={faBriefcase} />
            <div className='checkbox-container' onChange={onChangeValue}>
              <input className='checkbox' value="volunteer" name="role" type="radio" placeholder="role" /><text className='check-text'>volunteer</text>
              <input className='checkbox' value="organization" name="role" type="radio" placeholder="role" /><text className='check-text'>organization</text>
            </div>
          </div>
          <div className="flex-form">
            <FontAwesomeIcon icon={faAddressCard} />
            <input className='input-field' name="affiliation" type="text" placeholder="affiliation / organization name" onChange={(e) => setAffiliation(e.target.value)} />
          </div>
          <div className="flex-form">
            <FontAwesomeIcon icon={faPhone} />
            <input className='input-field' name="number" type="text" placeholder="phone number" onChange={(e) => setNumber(e.target.value)} />
          </div>
          <div className="flex-form">
            <FontAwesomeIcon icon={faLocationDot} />
            <input className='input-field' name="zipcode" type="text" placeholder="zip code" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div>
            <input className='submit-button' type='submit' />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;