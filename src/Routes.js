import React from 'react';
import Home from './Components/Public/Home'
import './App.css';
import NavBar from './Components/Public/Views/Navbar'
import { Route, Switch } from 'react-router-dom';

export const Routes = () => {
  return (
    <div className="App">
        <NavBar />
        <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/About" component={About} /> */}
        </Switch>
    </div>
  );
};
export default Routes