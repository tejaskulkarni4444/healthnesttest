import React from 'react';
import Home from './Components/Public/Home'
import './App.css';
import NavBar from './Components/Public/Views/Navbar'
import { Route, Switch } from 'react-router-dom';
import Profile from './Components/Private/Profile'

export const Routes = () => {
  return (
    <div className="App">
        <NavBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
        </Switch>
    </div>
  );
};
export default Routes