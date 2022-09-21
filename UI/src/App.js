import React, { Component } from "react";
import { Switch, Route, Link,Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

import BoardAdmin from "./components/Admin";
import Bookmark from "./components/Bookmark"; 
import Category from "./components/Category"
import Country from "./components/Country"
import Dashboard from "./components/Dashboard";
import SearchByContent from "./components/SearchByContent";

import { Dropdown, DropdownButton } from "react-bootstrap";
import { BrowserRouter, Routes,Navigate } from "react-router-dom";
import Source from "./components/Source"
import Footer from "./components/Footer/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import ReadBookmark from "./components/ReadBookmark";


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
                <Link to={"/profile"} className="nav-link">
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
            <Route exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/bookmark" component={ReadBookmark} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/search" component={SearchByContent} />
            
            {/* Protected Category */}
            <ProtectedRoute exact path="/category/business" component={Category} />
            <ProtectedRoute exact path="/category/sports" component={Category} />
            <ProtectedRoute exact path="/category/entertainment" component={Category} />
            <ProtectedRoute exact path="/category/science" component={Category} />
            <ProtectedRoute exact path="/category/health" component={Category} />
            <ProtectedRoute exact path="/category/technology" component={Category} />
            {/* Protected Source */}
            <ProtectedRoute exact path="/source/bbc" component={Source} />
            <ProtectedRoute exact path="/source/wsg" component={Source} />
            <ProtectedRoute exact path="/source/techcrunch" component={Source} />
            <ProtectedRoute exact path="/source/cnn" component={Source} />
            <ProtectedRoute exact path="/source/reuters" component={Source} />
            <ProtectedRoute exact path="/source/washingtonpost" component={Source} />
            <ProtectedRoute exact path="/source/thenextweb" component={Source} />
            {/* Protected Country */}
            <ProtectedRoute exact path="/country/in" component={Country} />
            <ProtectedRoute exact path="/country/gb" component={Country} />
            <ProtectedRoute exact path="/country/fr" component={Country} />
            <ProtectedRoute exact path="/country/cn" component={Country} />
            <ProtectedRoute exact path="/country/ua" component={Country} />
            <ProtectedRoute exact path="/country/ru" component={Country} />
            <ProtectedRoute exact path="/country/us" component={Country} />


            <Route exact path="/category/business">< Category categories="business" /></Route>
            <Route exact path="/category/sports"><Category categories="sports" /></Route> 
            <Route exact path="/category/entertainment"><Category categories="entertainment" /></Route> 
            <Route exact path="/category/science"><Category categories="science" /></Route> 
            <Route exact path="/category/health"><Category categories="health" /></Route> 
            <Route exact path="/category/technology"><Category categories="technology" /></Route> 
            <Route exact path="/country/in"><Country countries="in" /></Route> 
            <Route exact path="/country/gb"><Country countries="gb" /></Route> 
            <Route exact path="/country/fr"><Country countries="fr" /></Route> 
            <Route exact path="/country/cn"><Country countries="cn" /></Route> 
            <Route exact path="/country/ua"><Country countries="ua" /></Route> 
            <Route exact path="/country/ru"><Country countries="ru" /></Route> 
            <Route exact path="/country/us"><Country countries="us" /></Route> 
            <Route exact path="/source/bbc"><Source domains="bbc.com" /></Route> 
            <Route exact path="/source/wsj"><Source domains="wsj.com" /></Route> 
            <Route exact path="/source/techcrunch"><Source domains="techcrunch.com" /></Route> 
            <Route exact path="/source/cnn"><Source domains="cnn.com" /></Route> 
            <Route exact path="/source/reuters"><Source domains="reuters.com" /></Route> 
            <Route exact path="/source/washingtonpost"><Source domains="washingtonpost.com" /></Route> 
            <Route exact path="/source/thenextweb"><Source domains="thenextweb.com" /></Route> 
            

            <Footer/>

              </BrowserRouter>
        </div>

      </div>
    );
  }
}

export default App;
