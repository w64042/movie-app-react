import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Sass/main.scss';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { Header } from './Components/Menu/Header';
import Login from './Components/Login/Login';
function App() {
  return (
    <div className="App">
      {/* <Router>
        <Header />
      </Router> */}
      <Login/>
    </div>
  );
}

export default App;
