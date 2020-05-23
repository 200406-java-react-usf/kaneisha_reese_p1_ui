import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './Store';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import LoginComponent from './components/login-component/LoginContainer';
import NavbarComponent from './components/navbar-component/NavbarContainer';
import DashboardComponent from './components/dashboard-component/DashboardContainer';
import UpdateUserComponent from './components/update-user-component/UpdateUserContainer'
import UserComponent from './components/user-component/UserContainer';
import ReimbComponent from './components/reimb-component/ReimbContainer';


function App() {
  return (
    <div className="App">
      <Provider store ={store}>
        <Router>
          <AppBar color="primary" position="static">
            <Toolbar>
              <Typography variant="h5" color="inherit">
                <NavbarComponent />
              </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path='/login' render={()=><LoginComponent />} />
            <Route path='/dashboard' render={()=><DashboardComponent />} />
            <Route path='/update' render={()=><UpdateUserComponent />} />
            <Route path='/users' render= {()=><UserComponent />} />
            <Route path='/reimbs' render= {()=><ReimbComponent />} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
