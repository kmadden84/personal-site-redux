import React, { Component, useState } from 'react';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {heroku, reset} from '../actions';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { Modal, Spinner, Button } from 'react-bootstrap';

const Header = (props) => {

  const [show, setShow] = useState(false);


  const handleClose = () =>  {
    setShow(false);
    props.reset() //passing to actions 
  }

  const herokuClick = (e, state) => {
    props.heroku(e); //passing to actions

    setShow(true)
  }

  return (
    <div>
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Link to="/" className="navbar-brand">Kevin Madden</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/about" className="nav-link">About Me</Link>
            <Link to="/cv" className="nav-link">Curriculum Vitae</Link>
            <Link to="/skills" className="nav-link">Code Stack</Link>
            <a href="https://kevin-madden-portfolio.herokuapp.com/" className="nav-link" onClick={(e) => herokuClick(e)}>Portfolio</a>
            <Link to="/#contact" className="nav-link">Contact</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    <Modal show={show} onHide={handleClose}>
      
      <Modal.Header closeButton>
        <Modal.Title>Loading Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {
    
        (() => {  

          let link = props.newLink;
          if (props.loadStatus !== "loaded" && props.loadFailed !== "true") {
          return (
            <div style={{textAlign:"center"}}><Spinner animation="border" /><p>Initiating Heroku server... this can take up to 1 minute.  Link will load momentarily</p></div> 
          )
          
        } else if (props.loadStatus === "loaded" && props.loadFailed === "false") { 
            return (
            <div style={{textAlign:"center"}}><p>App has loaded! Click link below</p><a target="_blank" href={props.newLink} variant="primary" className="btn btn-primary" >Learn More</a></div>
            )
        }
        else if (props.loadFailed === "true" && props.loadStatus !== "loaded") {
          return(
            <div style={{textAlign:"center"}}> <p>Error Loading App. If you could <Link to="/#contact" className="nav-link" onClick={handleClose}>contact</Link> me and let me know, it'd be much appreciated.</p></div>
          )
        }
          
      })() 
    } 
    
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
    
  );
}
const mapStateToProps = (state) => {
  return {
    loadStatus: state.loadStatus,
    loadFailed: state.loadFailed,
    newLink: state.newLink,
    show: state.modal
  }
 };
 

Header.propTypes = {
  heroku: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {heroku, reset})(Header)


