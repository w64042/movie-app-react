import React from 'react';
import './App.css';
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
