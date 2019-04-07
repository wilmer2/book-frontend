import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import BookStory from '../pages/BookStory';


const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exac path="/book-story/:bookId/:pageId" component={BookStory} />
    </Switch>
  );
}

export default Router;
