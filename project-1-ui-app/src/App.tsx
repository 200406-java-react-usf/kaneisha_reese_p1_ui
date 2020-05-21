import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './Store';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import LoginComponent from './components/login-component/LoginContainer';
import NavbarComponent from './components/navbar-component/NavbarContainer';
import DashboardComponent from './components/dashboard-component/DashboardContainer';
import UpdateUserComponent from './components/update-user-component/UpdateUserContainer'
import NewUserComponent from './components/new-user-component/NewUserContainer';
import UserComponent from './components/user-component/UserContainer'


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
            <Route path='/newuser' render={()=><NewUserComponent />} />
            <Route path='/update' render={()=><UpdateUserComponent />} />
            <Route path='/users' render= {()=><UserComponent />} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
