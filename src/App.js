import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path="/log-in" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
