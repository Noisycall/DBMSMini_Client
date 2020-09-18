import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Manage from "./Manage";
import ManageArt from "./ManageArt";
import AddArt from "./AddArt";

const ManageSuper = () => {
  return (
    <BrowserRouter basename="/manage" forceRefresh={true}>
      <Switch>
        <Route path="/list">
          <Manage />
        </Route>
        <Route path="/add">
          <AddArt />
        </Route>
        <Route path="/:id">
          <ManageArt />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default ManageSuper;
