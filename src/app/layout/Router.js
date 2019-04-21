import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@/app/views/Home';
import Page from '@/app/views/Page/Show';

const Router = () => <Switch>
  <Route exact path="/" component={Home} />
  <Route exac path="/book-story/:bookId/:pageId" component={Page} />
</Switch>;

export default Router;
