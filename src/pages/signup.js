import React from 'react';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLocationDot, faPhone, faAddressCard } from '@fortawesome/free-solid-svg-icons'

const SignUp = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Let's get you started.</h2>
      <form>
        <span>
          <FontAwesomeIcon icon={faUser} />
          <input type="text" placeholder="name" />
        </span>
        <FontAwesomeIcon icon={faAddressCard} />
        <input type="text" placeholder="affiliation" />
        <FontAwesomeIcon icon={faPhone} />
        <input type="text" placeholder="phone number" />
        <FontAwesomeIcon icon={faLocationDot} />
        <input type="text" placeholder="zip code" />
      </form>
    </div>
  );
}
export default SignUp;