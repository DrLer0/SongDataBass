import logo from './Cassandra_logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <br></br>
      <img src={logo} className="App-logo" alt="logo" />
      
      <header className="App-header">
        <h1>
          Song DataBass
        </h1>
        <h3>
          A React-Cassandra Database App
        </h3>
        <div className="searchArea">
          <input type="text" id="songData" placeholder="Insert Song"></input>
          <input type="submit" id="search"></input>
        </div>
        
      </header>
    </div>
  );
}

export default App;
