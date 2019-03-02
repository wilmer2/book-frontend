import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}

export default Router;
