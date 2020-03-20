import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getUser } from "./js/_actions/user";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";

import Index from "./page/index";
import Ticket from "./page/ticket";
import Invoice from "./page/invoice";
import EditTransaksi from "./page/admin/edit-transaksi";
import { IoLogoWindows } from "react-icons/io";

function App({ getUser, user }) {
  useEffect(() => {
    getUser();
    setFlag(true);
  }, []);

  const [flag, setFlag] = useState(false);
  if (user.loading == false && flag == true) {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/admin">
              {/* {alert(user.data.roles)} */}
              {user.data.roles !== "Admin" ? (
                <Redirect to="/" />
              ) : (
                <EditTransaksi />
              )}
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/invoice">
              <Invoice />
            </Route>
            <Route path="/ticket">
              {user.data.roles !== "User" ? <Redirect to="/" /> : <Ticket />}
            </Route>
            <Route path="/">
              {user.data.roles === "Admin" ? (
                <Redirect to="/admin" />
              ) : (
                <Index />
              )}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  } else {
    return "";
  }
}

function Logout() {
  localStorage.removeItem("token");
  window.location.replace("/");
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(getUser())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
