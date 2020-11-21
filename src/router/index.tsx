import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Root, Stack, LinkedStack } from '../pages';

const App: React.FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route exact path="/stack" component={Stack} />
      <Route exact path="/linkedstack" component={LinkedStack} />
    </Switch>
  </BrowserRouter>
);

export default App;
