import React, { Component, useState } from 'react';
import { Navbar, Row, Col } from 'react-bootstrap';
import { faGithub } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Footer = () => {
  let yearVal = new Date().getFullYear();

  return (
    <div className="footer">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom">
        <p style={{ color: "white" }}>© Kevin Madden {yearVal}</p>
        <div className="footer--social">
          <a href="https://github.com/kmadden84" target="_blank"><FontAwesomeIcon icon={['fab', 'github']} style={{ color: "#fff" }} /></a>
          <a href="https://www.linkedin.com/in/kevin-madden-12865035/" target="_blank"><FontAwesomeIcon icon={['fab', 'linkedin']} style={{ color: "#fff" }} /></a>
        </div>
      </Navbar>
    </div>

  );
}

export default Footer;