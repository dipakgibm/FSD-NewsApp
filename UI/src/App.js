import React, { Component } from "react";
import { Switch, Route, Link,Router } from "react-router-dom";
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
import Category from "./components/category"
import Country from "./components/country"
import Dashboard from "./components/dashboard";
import Search from "./components/Search";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { BrowserRouter, Routes,Navigate } from "react-router-dom";
import Source from "./components/source"
import Footer from "./components/Footer/Footer"


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
    const { currentUser, showModeratorBoard, showAdminBoard,bookmark,dashboard,search } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
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

            {
                    <DropdownButton id="dropdown-basic-button" title="Category"  >
                    <Dropdown.Item href="/business">Business</Dropdown.Item>
                    <Dropdown.Item href="/sports">Sports</Dropdown.Item>
                    <Dropdown.Item href="/entertainment">Entertainment</Dropdown.Item>
                    <Dropdown.Item href="/science">Science</Dropdown.Item>
                    <Dropdown.Item href="/health">Health</Dropdown.Item>
                    <Dropdown.Item href="/technology">Technology</Dropdown.Item>
                  </DropdownButton>
            }
             {
                    <DropdownButton id="dropdown-basic-button" title="Country"  >
                    <Dropdown.Item href="/in">India</Dropdown.Item>
                    <Dropdown.Item href="/us">USA</Dropdown.Item>
                    <Dropdown.Item href="/gb">United Kinkgdom</Dropdown.Item>
                    <Dropdown.Item href="/fr">France</Dropdown.Item>
                    <Dropdown.Item href="/cn">China</Dropdown.Item>
                    <Dropdown.Item href="/ua">Ukraine</Dropdown.Item>
                    <Dropdown.Item href="/ru">Russia</Dropdown.Item>
                  </DropdownButton>
            }

             {
                    <DropdownButton id="dropdown-basic-button" title="Source"  >
                    <Dropdown.Item href="/bbc">BBC</Dropdown.Item>
                    <Dropdown.Item href="/wsj">Wall Street</Dropdown.Item>
                    <Dropdown.Item href="/techcrunch">Tech Crunch</Dropdown.Item>
                    <Dropdown.Item href="/cnn">CNN</Dropdown.Item>
                    <Dropdown.Item href="/reuters">Reuters</Dropdown.Item>
                    <Dropdown.Item href="/washingtonpost">Washington Post</Dropdown.Item>
                    <Dropdown.Item href="/thenextweb">The Next Web</Dropdown.Item>
                  </DropdownButton>
            }

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
        <BrowserRouter>
                {/* <route> */}
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/user" component={BoardUser} />
            <Route exact path="/mod" component={BoardModerator} />
            <Route exact path="/admin" component={BoardAdmin} />
            <Route exact path="/bookmark" component={<Bookmark/>} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/business"><Category categories="business" /></Route> 
            <Route exact path="/sports"><Category categories="sports" /></Route> 
            <Route exact path="/entertainment"><Category categories="entertainment" /></Route> 
            <Route exact path="/science"><Category categories="science" /></Route> 
            <Route exact path="/health"><Category categories="health" /></Route> 
            <Route exact path="/technology"><Category categories="technology" /></Route> 
            <Route exact path="/in"><Country countries="in" /></Route> 
            <Route exact path="/gb"><Country countries="gb" /></Route> 
            <Route exact path="/fr"><Country countries="fr" /></Route> 
            <Route exact path="/cn"><Country countries="cn" /></Route> 
            <Route exact path="/ua"><Country countries="ua" /></Route> 
            <Route exact path="/ru"><Country countries="ru" /></Route> 
            <Route exact path="/us"><Country countries="us" /></Route> 
            <Route exact path="/bbc"><Source domains="bbc.com" /></Route> 
            <Route exact path="/wsj"><Source domains="wsj.com" /></Route> 
            <Route exact path="/techcrunch"><Source domains="techcrunch.com" /></Route> 
            <Route exact path="/cnn"><Source domains="cnn.com" /></Route> 
            <Route exact path="/reuters"><Source domains="reuters.com" /></Route> 
            <Route exact path="/washingtonpost"><Source domains="washingtonpost.com" /></Route> 
            <Route exact path="/thenextweb"><Source domains="thenextweb.com" /></Route> 
            <Footer/>


</BrowserRouter>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;