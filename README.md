# ChipIn

ChipIn is a web application to connect organizations with volunteers for local events. It provides a space for organizations to interface directly with volunteers and create and promote their events. ChipIn encourages peer-to-peer interaction through social volunteering groups. Organizations can create new groups and volunteers can join existing groups to connect with other volunteers and register for upcoming events with their group.

See the full presentation [here](https://docs.google.com/presentation/d/1jecW7fxHrA0GNcVPWc9xbd76hirpZJ1_0u-6q5xpMfo/edit?usp=sharing)

## Key Features
1. User accounts which allows for signup, registration, and login/logout for volunteers and organizations
2. Search for events filtered by distance with specific names and register for an event
3. View event location on google maps with ChipIn marker
4. Join or create a group. Once you join a group, you can view its members and upcoming events
5. Organizations can create new events which will update the total events
6. Dynamic timeline page (profile) which summarizes volunteer hours, events attended, and groups joined. It also displays upcoming events for the current user.

## Built With
 - React
 - Firebase
 - Node.js

## Run ChipIn Locally
1. Clone the repository: 
#### `git clone https://github.com/megang33/chipin.git`
#### `cd chipin`
2. Install the following modules
- Node modules: `npm install`
- Firebase: `npm install firebase`
- React-Router: `npm install react-router-dom`
- Font-Awesome Icons:
  - `npm i --save @fortawesome/fontawesome-svg-core`
  - `npm install --save @fortawesome/free-solid-svg-icons`
  - `npm install --save @fortawesome/react-fontawesome`
- Google Maps API: `npm i -S @react-google-maps/api`
- Materials UI: `npm install @mui/material @emotion/react @emotion/styled`
- React-Geocode: `npm install —save react-geocode`
- Mathjs: `npm install mathjs`

3. Set up Backend
- set up a new firebase project at https://firebase.google.com/ and add a web app to your project
- add a new file named **"config.js"** in the **utils** folder (where firebase.js is located) and paste in your unique Firebase config object like the following:

const firebaseConfig = {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;apiKey: "YOUR_FIREBASE_API_KEY",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;authDomain: "YOUR_PROJECT_ID.firebaseapp.com",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;projectId: "YOUR_PROJECT_ID",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;storageBucket: "YOUR_PROJECT_ID.appspot.com",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messagingSenderId: "SENDER_ID",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;appId: "YOUR_APP_ID"<br/>
};

4. In the project directory, you can run:
#### `npm start`
The app is now accessible at [http://localhost:3000](http://localhost:3000) so you can view it in your browser.
