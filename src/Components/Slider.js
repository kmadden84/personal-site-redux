import { Container, Carousel, Row, Col, Modal, Spinner, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {heroku, reset} from '../actions';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';



const Slider = (props, state) => {


  

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

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
    <Container>
      <Row>
        <Col>
          <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/img/project-5-large-1.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Fetching / Parsing / Styling JSON Data</h3>
                <p>A app which fetches student information, then parses and styles the data.  Clicking a student box opens more info in a modal, and you can toggle between student cards via the modal.</p>
                <p><a href="http://www.kevin-madden-portfolio.club/projects/json_data/index.html" rel="noopener noreferrer" target="_blank" className="bannerLink">Live Demo</a></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/img/project-8-large-1.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Full Stack React.js + Express app.</h3>
                <p>This is a course depository app, where you can create an account and add courses and descriptions to a depository.  You may only edit and/or delte your own courses.  The React client fetches data from a REST API created with Node, Express, SQLite, and Sequelize.</p>
                <p><a href="https://course-depot.herokuapp.com/" rel="noopener noreferrer" target="_blank" className="bannerLink" onClick={(e) => herokuClick(e)}>Live Demo</a></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/img/project-10-large-1.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Full Stack Dating Site</h3>
                <p>
                  A dating site, where you can create a profile, and see your matches based on your profile information.  Profile info is fetched/stored in a database created with Node, Express, Sequelize, and SQLite.  Authentication with basic-auth.
                </p>
                <p><a href="https://km-dating-app.herokuapp.com/" rel="noopener noreferrer" target="_blank" className="bannerLink" onClick={(e) => herokuClick(e)}>Live Demo</a></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/img/project-9-large-1.jpg"
                alt="Fourth slide"
              />
              <Carousel.Caption>
                <h3>Open Tabel Restaurant search</h3>
                <p>
                  Search Open Table restaurants by city.  Results are paginated.
                </p>
                <p><a href="https://bmoapptest.herokuapp.com/" target="_blank" rel="noopener noreferrer" className="bannerLink" onClick={(e) => herokuClick(e)}>Live Demo</a></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/img/project-4-large-1.jpg"
                alt="Fourth slide"
              />
              <Carousel.Caption>
                <h3>Game Show App</h3>
                <p>
                  A word guessing game, similar to Wheel of Fortune. Each incorrectly guessed letter removes 1 of your 5 lives
                </p>
                <p><a href="http://www.kevin-madden-portfolio.club/projects/game_show/index.html" target="_blank" rel="noopener noreferrer" className="bannerLink" >Live Demo</a></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
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


    </Container>

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
 

Slider.propTypes = {
  heroku: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, {heroku, reset})(Slider)

