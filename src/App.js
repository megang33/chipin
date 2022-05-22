import React from 'react';
import './App.css';
import { signInWithGoogle, updateStateDoc } from './utils/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from "./utils/firebase"
import { Routing } from './components/routing.js';
import Card from "./components/MyCard"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      userInfo: null,
    }
  }

  async updateInfo(uid) {
    const newUserInfo = await updateStateDoc(uid);
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

  handleSignOut() {
    this.setState({
      online: false,
      userInfo: null,
    })
  }

  render() {
    const doc = this.state.userInfo;

    //function to update information using db (realtime)

    return (
      <div className='App'>
        <Card
          title='Card Title'
          imageURL=''
          body='This is a test'
        />
      </div>
      /*
      <React.StrictMode>
        <Router>
          <Routing uid={this.state.online ? doc.get("uid") : null} userInfo={this.state.userInfo} handleSignIn={() => this.handleSignIn()}
            loggedIn={this.state.online} registered={this.state.online ? doc.get("registered") : null}
            handleSignOut={() => this.handleSignOut()} updateInfo={(newDoc) => this.updateInfo(newDoc)} />
        </Router>
      </React.StrictMode>
      */
    );
  }
}

export default App;
