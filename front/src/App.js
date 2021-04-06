import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Detail from "./Component/Detail";
import Main from "./Component/Main";
import "./Style/App.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Main} />
        <Route exact path={"/:id"} component={Detail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
