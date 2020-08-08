import React from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import {BrowserRouter , Route} from 'react-router-dom';
import {Signup} from './components/Sign/Signup'
import {Signin} from './components/Sign/Signin'
import "./styles/main.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
