import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@/app/views/Home';
import Page from '@/app/views/Page/Show';
import UserNew from '@/app/views/User/New';
import UserEdit from '@/app/views/User/Edit';
import Results from '@/app/views/Results';

const Content = () => <section 
  className="section"
>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exac path="/book/:bookId/story/:pageId?" component={Page} />
    <Route exac path="/register" component={UserNew} />
    <Route exac path="/profile/edit" component={UserEdit} />
    <Route exac path="/results" component={Results} />
  </Switch>
</section>;
  
export default Content;
