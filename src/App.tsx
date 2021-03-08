import React from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { About } from "./components/About/About";
import { yandexMetrica } from "./yandexMetrica";
import { NAV_ROOT, NAV_ABOUT } from "./constants";
import "./styles/main.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path={NAV_ROOT}>
            <Dashboard />
          </Route>
          <Route exact path={NAV_ABOUT}>
            <About />
          </Route>
        </Switch>
      </Router>
      {process.env.NODE_ENV === "production" && yandexMetrica()}
    </div>
  );
}

export default App;
