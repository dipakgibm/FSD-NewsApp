import React from "react";
import { Navbar } from "react-bootstrap";
import { Dropdown, DropdownButton, Form, FormControl, Button } from "react-bootstrap";
export const Header = () => {
  return (

    <Navbar bg="dark" variant="dark" fixed="top" className="justify-content-center">
      <Navbar.Brand fontSize="0.80 rem" href="/">Home</Navbar.Brand>
      <Navbar.Brand fontSize="0.80 rem" href="/search">Search</Navbar.Brand>
      <Navbar.Brand fontSize="0.80 rem" href="/bookmark">Bookmark</Navbar.Brand>

      
      <DropdownButton id="dropdown-basic-button" title="Category"  >
                    <Dropdown.Item href="/category/business">Business</Dropdown.Item>
                    <Dropdown.Item href="/category/sports">Sports</Dropdown.Item>
                    <Dropdown.Item href="/category/entertainment">Entertainment</Dropdown.Item>
                    <Dropdown.Item href="/category/science">Science</Dropdown.Item>
                    <Dropdown.Item href="/category/health">Health</Dropdown.Item>
                    <Dropdown.Item href="/category/technology">Technology</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Country"  >
                    <Dropdown.Item href="/country/in">India</Dropdown.Item>
                    <Dropdown.Item href="/country/us">USA</Dropdown.Item>
                    <Dropdown.Item href="/country/gb">United Kinkgdom</Dropdown.Item>
                    <Dropdown.Item href="/country/fr">France</Dropdown.Item>
                    <Dropdown.Item href="/country/cn">China</Dropdown.Item>
                    <Dropdown.Item href="/country/ua">Ukraine</Dropdown.Item>
                    <Dropdown.Item href="/country/ru">Russia</Dropdown.Item>
         </DropdownButton>
         <DropdownButton id="dropdown-basic-button" title="Source"  >
                    <Dropdown.Item href="/source/bbc">BBC</Dropdown.Item>
                    <Dropdown.Item href="/source/wsj">Wall Street</Dropdown.Item>
                    <Dropdown.Item href="/source/techcrunch">Tech Crunch</Dropdown.Item>
                    <Dropdown.Item href="/source/cnn">CNN</Dropdown.Item>
                    <Dropdown.Item href="/source/reuters">Reuters</Dropdown.Item>
                    <Dropdown.Item href="/source/washingtonpost">Washington Post</Dropdown.Item>
                    <Dropdown.Item href="/source/thenextweb">The Next Web</Dropdown.Item>
        </DropdownButton>
        <Navbar.Brand fontSize="0.80 rem" href="/login">Login</Navbar.Brand>
        <Navbar.Brand fontSize="0.80 rem" href="/registration">Sign Up</Navbar.Brand>


    </Navbar>




  );
};
