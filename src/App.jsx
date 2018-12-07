import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Base from './client/Base.jsx';
import Home from './client/Home.jsx';
import About from './client/About.jsx';
import CustomNavbar from './client/CustomNavbar.jsx';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <CustomNavbar/>
          <Route exact path="/" component={Home}/>
          <Route path="/About" component={About}/>
          <Route path="/Base" component={Base}/>
        </div>
      </Router>
    )
  }
}

export default App;
