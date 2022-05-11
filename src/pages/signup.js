import React from 'react';
import { useState } from 'react';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot, faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import '../utils/firebase.js';
import { updateDBdoc } from '../utils/firebase.js';

const SignUp = (props) => {
  const [name, setName] = useState();
  const [affiliation, setAffiliation] = useState();
  const [number, setNumber] = useState();
  const [zipcode, setZip] = useState();

  const handleSubmit = (e) => {
    // console.log(props.doc.get("uid"));
    //add stuff to firebase
    e.preventDefault();
    const body = {
      name: name,
      affiliation: affiliation,
      number: number,
      zipcode: zipcode,
    }
    console.log(body);
    console.log(props.uid);
    updateDBdoc("users", body, props.uid);
  }
  // if (props.registered){

  // }
  // else{

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Let's get you started.</h2>
      <form onSubmit={e => { handleSubmit(e) }}>
        <div className="flex-form">
          <FontAwesomeIcon icon={faUser} />
          <input name="name" type="text" placeholder="name" onChange={e => setName(e.target.value)} />
        </div>
        <div className="flex-form">
          <FontAwesomeIcon icon={faAddressCard} />
          <input name="affiliation" type="text" placeholder="affiliation" onChange={e => setAffiliation(e.target.value)} />
        </div>
        <div className="flex-form">
          <FontAwesomeIcon icon={faPhone} />
          <input name="number" type="text" placeholder="phone number" onChange={e => setNumber(e.target.value)} />
        </div>
        <div className="flex-form">
          <FontAwesomeIcon icon={faLocationDot} />
          <input name="zipcode" type="text" placeholder="zip code" onChange={e => setZip(e.target.value)} />
        </div>
        <div className="flex-form">
          <input className='submit-button' type='submit' />
        </div>
      </form>
    </div>
  );
}

export default SignUp;