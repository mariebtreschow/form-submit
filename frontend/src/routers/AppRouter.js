import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormSubmit from '../components/FormSubmit';
import RegisteredUser from '../components/RegisteredUser';
import Header from '../components/Header';
import NotFound from '../components/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/users" exact={true} component={FormSubmit}/>
        <Route path="/users/:id" exact={true} component={RegisteredUser}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
