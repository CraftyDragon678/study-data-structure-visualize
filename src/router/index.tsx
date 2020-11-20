import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Root, Stack } from "../pages";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route exact path="/stack" component={Stack} />
    </Switch>
  </BrowserRouter>
);

export default App;
