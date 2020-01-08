import React from "react";
import { Route, Switch } from "react-router-dom";
import Authorisation from "./components/Authorisation";
import Chat from "./components/Chat";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Authorisation} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
}

export default App;
