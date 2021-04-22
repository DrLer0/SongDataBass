import logo from './Cassandra_logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Songs from "./pages/Songs";
import Artist from "./pages/Artist";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
    <Router>
      <div >
      <img src={logo} className="App-logo" alt="logo" />
        <Nav />
        <Switch>
          <Route exact path="/" component={Songs} />
          <Route exact path="/songs" component={Songs} />
          <Route exact path="/artist" component={Artist} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
