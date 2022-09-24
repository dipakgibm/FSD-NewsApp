import React, { Component } from "react";
import { Switch, Route, Link,Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";



import Bookmark from "./components/Bookmark"; 


import Dashboard from "./components/Dashboard";
import SearchByContent from "./components/SearchByContent";

import { Dropdown, DropdownButton } from "react-bootstrap";
import { BrowserRouter, Routes,Navigate } from "react-router-dom";
import Source from "./components/source/BBC"
import Footer from "./components/Footer/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import ReadBookmark from "./components/ReadBookmark";
import India from "./components/country/India"
import USA from "./components/country/USA"
import UK from "./components/country/UK"
import Ukraine from "./components/country/Ukraine"
import China from "./components/country/China"
import France from "./components/country/France"
import Russia from "./components/country/Russia"
import Business from "./components/category/Business"
import Sports from "./components/category/Sports"
import Entertainment from "./components/category/Entertainment"
import Science from "./components/category/Science"
import Health from "./components/category/Health"
import Technology from "./components/category/Technology"
import CNN from "./components/source/CNN"
import Reuters from "./components/source/Reuters"
import BBC from "./components/source/BBC"
import Techcrunch from "./components/source/Techcrunch"
import Thenextweb from "./components/source/Thenextweb"
import WallStreets from "./components/source/WallStreets"
import Washingtonpost from "./components/source/Washingtonpost"
import BookmarkSearch from "./components/BookmarkSearch";


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
      home:undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        
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
        <nav className="navbar navbar-expand navbar-dark bg-secondary">
          <Link to={"/"} className="navbar-brand">
            News App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href={"/home"} className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href={"/bookmarkSearch"} className="nav-link">
                Bookmark Search
              </a>
            </li>
            
            {(
              <li className="nav-item">
                <a href={"/search"} className="nav-link">
                  Search
                </a>
              </li>
            )}

            {(
              <li className="nav-item">
                <a href={"/bookmark"} className="nav-link">
                  Bookmark
                </a>
              </li>
            )}

            {
                    <DropdownButton id="dropdown-basic-button" title="Category" variant="secondary" >
                    <Dropdown.Item href="/category/business">Business</Dropdown.Item>
                    <Dropdown.Item href="/category/sports">Sports</Dropdown.Item>
                    <Dropdown.Item href="/category/entertainment">Entertainment</Dropdown.Item>
                    <Dropdown.Item href="/category/science">Science</Dropdown.Item>
                    <Dropdown.Item href="/category/health">Health</Dropdown.Item>
                    <Dropdown.Item href="/category/technology">Technology</Dropdown.Item>
                  </DropdownButton>
            }
             {
                    <DropdownButton id="dropdown-basic-button" title="Country" variant="secondary" >
                    <Dropdown.Item href="/country/in">India</Dropdown.Item>
                    <Dropdown.Item href="/country/us">USA</Dropdown.Item>
                    <Dropdown.Item href="/country/gb">United Kinkgdom</Dropdown.Item>
                    <Dropdown.Item href="/country/fr">France</Dropdown.Item>
                    <Dropdown.Item href="/country/cn">China</Dropdown.Item>
                    <Dropdown.Item href="/country/ua">Ukraine</Dropdown.Item>
                    <Dropdown.Item href="/country/ru">Russia</Dropdown.Item>
                  </DropdownButton>
            }

             {
                    <DropdownButton id="dropdown-basic-button" title="Source" variant="secondary">
                    <Dropdown.Item href="/source/bbc">BBC</Dropdown.Item>
                    <Dropdown.Item href="/source/wsj">Wall Street</Dropdown.Item>
                    <Dropdown.Item href="/source/techcrunch">Tech Crunch</Dropdown.Item>
                    <Dropdown.Item href="/source/cnn">CNN</Dropdown.Item>
                    <Dropdown.Item href="/source/reuters">Reuters</Dropdown.Item>
                    <Dropdown.Item href="/source/washingtonpost">Washington Post</Dropdown.Item>
                    <Dropdown.Item href="/source/thenextweb">The Next Web</Dropdown.Item>
                  </DropdownButton>
            }

         
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href ={"/login"} className="nav-link">
                  Login
                </a>
              </li>

              <li className="nav-item">
                <a href={"/register"} className="nav-link">
                  Sign Up
                </a>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
        <BrowserRouter>
                {/* <route> */}
                
            <ProtectedRoute exact path={["/", "/home"]} component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            
            <ProtectedRoute exact path="/bookmark" component={ReadBookmark} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/search" component={SearchByContent} />
            <ProtectedRoute exact path="/bookmarkSearch" component={BookmarkSearch} />
            

           
            {/* Protected Category */}
            <ProtectedRoute exact path="/category/business" component={Business} />
            <ProtectedRoute exact path="/category/sports" component={Sports} />
            <ProtectedRoute exact path="/category/entertainment" component={Entertainment} />
            <ProtectedRoute exact path="/category/science" component={Science} />
            <ProtectedRoute exact path="/category/health" component={Health} />
            <ProtectedRoute exact path="/category/technology" component={Technology} />
            {/* Protected Source */}
            <ProtectedRoute exact path="/source/bbc" component={BBC} />
            <ProtectedRoute exact path="/source/wsj" component={WallStreets} />
            <ProtectedRoute exact path="/source/techcrunch" component={Techcrunch} />
            <ProtectedRoute exact path="/source/cnn" component={CNN} />
            <ProtectedRoute exact path="/source/reuters" component={Reuters} />
            <ProtectedRoute exact path="/source/washingtonpost" component={Washingtonpost} />
            <ProtectedRoute exact path="/source/thenextweb" component={Thenextweb} />
            {/* Protected Country */}
            <ProtectedRoute exact path="/country/in" component={India} />
            <ProtectedRoute exact path="/country/gb" component={UK} />
            <ProtectedRoute exact path="/country/fr" component={France} />
            <ProtectedRoute exact path="/country/cn" component={China} />
            <ProtectedRoute exact path="/country/ua" component={Ukraine} />
            <ProtectedRoute exact path="/country/ru" component={Russia} />
            <ProtectedRoute exact path="/country/us" component={USA} />



            <Footer/>

              </BrowserRouter>
        </div>

      </div>
    );
  }
}

export default App;
