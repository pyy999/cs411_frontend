import React, { Component } from 'react';
import { 
  CSSTransition, 
  TransitionGroup 
} from 'react-transition-group';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Particles from 'react-particles-js'
import TopNavbar from './Navbar.jsx'
import ParticlesWrap from './ParticlesWrapper'
import Home from './Home.jsx'
import Graphs from './Graphs.jsx'
import Uploads from './Uploads.jsx'
import Query from './Query.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import * as Data from './data.js';

var regex = /\b(?!landing)\b\S+/i;
const supportsHistory = 'pushState' in window.history;

function App() {
  return (
    <div className="mainDiv">
      <Router forceRefresh={!supportsHistory}>    
        <div>
          <Route exact path="/" component={Home} />  
          <Route path={regex} component={TopNavbar} />
          <main>
            <Route
              render={({ location }) => {
                const { pathname } = location;
                return (
                 <div>

                  <TransitionGroup>
                    <CSSTransition 
                      key={pathname}
                      classNames="page"
                      timeout={{
                        enter: 1000,
                        exit: 1000,
                      }}
                    >
                      <Route
                        location={location}
                        render={() => (
                          <Switch>
                            <Route path={Data.navbar_items[0][1]} component={Graphs} />
                            <Route path={Data.navbar_items[1][1]} component={Uploads} />
                            <Route path={Data.navbar_items[2][1]} component={Query} />
                          </Switch>
                        )}
                      />
                    </CSSTransition>
                  </TransitionGroup>
                  </div>
                );
              }}
            />
          </main>
        </div>
      </Router>
      <div className="myFill" style={{position:'absolute', top:0, left:0, zIndex:-100}}>
            <ParticlesWrap/>
      </div>
    </div>
  );
}

export default App;
