import React from "react";
import { Route, Switch } from "react-router-dom";
import Authorisation from "./components/Authorisation";
import Chat from "./components/Chat";

/*function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/authorisation" component={Authorisation} />
        <Route path="/registration" component={Registration} />
        <Route path="/chat" component={WorkingForm} />
      </Switch>
    </BrowserRouter>
  );
}*/

function App() {
  return (
    <Switch>
      <Route path="/" component={Authorisation} />
      <Route path="/chat/:login" component={Chat} />
    </Switch>
  );
}

export default App;
