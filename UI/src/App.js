import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Bookmark from "./components/board-bookmark.component"; 
import Source from "./components/board-source.component"
import Dashboard from "./components/dashboard";
import Card from "./components/card";
import Search from "./components/Search";
 

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      bookmark:undefined,
      source:undefined,
      dashboard:undefined,
      search:undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        bookmark: user,
        source:user,
        dashboard:user,
        search:user,
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      bookmark:undefined,
      source:undefined,
      dashboard:undefined,
      search:undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard,bookmark,source,dashboard,search } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            News App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            
            {search && (
              <li className="nav-item">
                <Link to={"/search"} className="nav-link">
                  Search
                </Link>
              </li>
            )}

            {bookmark && (
              <li className="nav-item">
                <Link to={"/bookmark"} className="nav-link">
                  Bookmark
                </Link>
              </li>
            )}

            {source && (
              <li className="nav-item">
                <Link to={"/source"} className="nav-link">
                  Source
                </Link>
              </li>
            )}

            {dashboard && (
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}

            {/* {card && (
              <li className="nav-item">
                <Link to={"/card"} className="nav-link">
                  Card
                </Link>
              </li>
            )} */}

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}


            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/bookmark" component={Bookmark} />
            <Route path="/source" component={Source} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/search" component={Search} />
            {/* <Navbar.Brand href="/Search">Search</Navbar.Brand> */}

          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;
