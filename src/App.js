import React from 'react';
import './App.css';
import { getDocSnap, signInWithGoogle } from './utils/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from "./utils/firebase"
import { Routing } from './components/routing.js';
import NavBar from './components/navbar.js';
import Card from "./components/MyCard"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      userInfo: null,
    }
  }

  async componentDidMount(){
    console.log("hi")
    const doc = await getDocSnap("users", localStorage.getItem("user-login"))
    if (doc != null){
      this.setState({
        online: true,
        userInfo: doc,
      })
    }
    console.log("forcing")
    this.forceUpdate();
  }

  async updateInfo(uid) {
    const newUserInfo = await getDocSnap("users", uid);
    this.setState({
      userInfo: newUserInfo
    })
  }

  async handleSignIn() {
    const userInfo = await signInWithGoogle();
    this.setState({
      userInfo: userInfo,
      online: true,
    })
  }

  async handleSignIn() {
    const userInfo = await signInWithGoogle();
    this.setState({
      userInfo: userInfo,
      online: true,
    })
  }

  handleSignOut() {
    this.setState({
      online: false,
      userInfo: null,
    })
    localStorage.removeItem("user-login")
  }

  render() {
    const doc = this.state.userInfo;
    const user = localStorage.getItem("user-login");
    if (user === null && this.state.online) {
      localStorage.setItem("user-login", doc.get("uid"))
    }
    if (this.state.online === true)
      console.log(doc.get("uid"))
    return (
      <React.StrictMode>
        <Router>
          {/* <NavBar signedIn={this.state.loggedIn} handleSignIn={this.state.handleSignIn} handleSignOut={this.state.handleSignOut} /> */}
          <Routing uid={this.state.online ? doc.get("uid") : null} name={this.state.online ? doc.get("name") : null} numGroups={this.state.online ? doc.get("numGroups") : null} userInfo={this.state.userInfo} handleSignIn={() => this.handleSignIn()}
            loggedIn={this.state.online} registered={this.state.online ? doc.get("registered") : null} role={this.state.online ? doc.get("role") : null}
            handleSignOut={() => this.handleSignOut()} updateInfo={(newDoc) => this.updateInfo(newDoc)} />
        </Router>
      </React.StrictMode>
    );
  }
}

export default App;
