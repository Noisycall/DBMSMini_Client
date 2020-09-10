import React, {useContext} from "react";
import "./App.css";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {AuthContext} from "./components/AuthContextProvider/AuthContextProvider";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import NavBar from "./NavBar/NavBar";
import Register from "./components/Register/Register";
import Gallery from "./components/Gallery/Gallery";

const ProtectedRoute = (props: any) => {
  if (props.user[1]) {
    return <>{props.children}</>;
  } else return <Redirect to={"/login"}/>;
};

function App() {
  let {val, toggleAuth} = useContext(AuthContext);
  return (
      <div className="App">
        <Router>
          <NavBar/>
          <Switch>
            <Route path="/gallery">
              <ProtectedRoute user={val}>
                <Gallery/>
              </ProtectedRoute>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
