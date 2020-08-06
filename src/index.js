import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Normal from "./normal";

function App() {
  return (
    <Router>
      <div style={{ marginBottom: 30 }}>
        <Link to="/normal" style={{ marginRight: 20 }}>
          normal
        </Link>
      </div>
      <Switch>
        <Route path="/normal" component={Normal} />
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
