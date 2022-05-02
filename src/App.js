import logo from './logo.svg';
import './App.css';
import { signInWithGoogle } from './utils/firebase.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={signInWithGoogle}> Sign in with Google </button>
      </header>
    </div>
  );
}

export default App;
