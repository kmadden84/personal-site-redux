import React, { useState } from 'react';
import { Container, Button, Row, Col, Card, Accordion, Form, Modal, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCode, faProjectDiagram, faList} from '@fortawesome/free-solid-svg-icons';

import {heroku,reset} from '../actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const axios = require('axios');



const Cards = (props) => {

  const [show, setShow] = useState(false);
  const [loadShow, setLoadShow] = useState(false);

  const handleClose = () =>  {
    setShow(false);
  }

  const handleLoadClose = () =>  {
    setLoadShow(false);
    props.reset() //passing to actions 
  }

  const herokuClick = (e, state) => {
    props.heroku(e); //passing to actions
    setLoadShow(true)
  }

  const handleShow = () => setShow(true);

  const [state, setState] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "message": "",
    "id": "",
    "sending": "false",
    "success": ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {

    setShow(true);
    //setLoading(true);

    e.preventDefault();
    setState({
      "sending": true
    })

    axios({
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      url: "/send",
      data: JSON.stringify({
        "name": state.first_name + " " + state.last_name,
        "email": state.email,
        "id": state.id,
        "message": state.message
      })
    }).then((response) => {
      if (response) {
      setState({
        "sending": false
      })
    } 
      if (response.data.msg === 'success') {
        setState({
          "success": true
        })
        resetForm();
      } else if (response.data.msg === 'fail') {
        //alert("Message failed to send.")
      }
    }).catch(error => {
    if (error) {
      setState({
        "success": false
      })
    }
  });


  }

  const resetForm = () => {
    document.getElementById('contact-form').reset();
  }

  (function matchHeight() {
    //Grab divs with the class name 'match-height'
    const cards = document.getElementsByClassName('card-text')

    //Find out how my divs there are with the class 'match-height' 
    var arrayLength = cards.length;
    var heights = [];

    //Create a loop that iterates through the cards variable and pushes the heights of the divs into an empty array
    for (var i = 0; i < arrayLength; i++) {
      heights.push(cards[i].offsetHeight);
    }

    //Find the largest of the divs
    function getHighest() {
      return Math.max(...heights);
    }

    //Set a variable equal to the tallest div
    var tallest = getHighest();

    //Iterate through cards and set all their height style equal to the tallest variable
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.height = tallest + "px";
    }
  })();

  return (
      
<div className="cardList">
    <Container>
      <Row>
        <Col lg={6}>
          <Card>
          <FontAwesomeIcon icon={faCoffee} />
            <Card.Body>
              <Card.Title>About Me</Card.Title>
              <Card.Text>
                Learn a bit more about the one they call Kevin Madden
               </Card.Text>
              <Link to="/about" variant="primary" className="btn btn-primary">Learn More</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
          <FontAwesomeIcon icon={faList} />
          <Card.Body>
              <Card.Title>Curriculum Vitae</Card.Title>
              <Card.Text>
                Take a look at some of my past experience and education
                            </Card.Text>
              <Link to="/cv" variant="primary" className="btn btn-primary">Learn More</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Card>
          <FontAwesomeIcon icon={faCode} />

            <Card.Body>
              <Card.Title>Skills/Code Stack</Card.Title>
              <Card.Text>
                What does this guy know, anyway?
                            </Card.Text>
              <Link to="/skills" variant="primary" className="btn btn-primary">Learn More</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
          <FontAwesomeIcon icon={faProjectDiagram} />
            <Card.Body>
              <Card.Title>Projects</Card.Title>
              <Card.Text>
                A portfolio of some of my past projects.  This is an external site, built with Node, Express and Pug.
                            </Card.Text>
              <a href="https://kevin-madden-portfolio.herokuapp.com/" variant="primary" className="btn btn-primary" target="_blank" onClick={(e) => herokuClick(e)}>Learn More</a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <div className="card-title h5">Get In Touch!</div>
                                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0" id="contact_form">
                <Card.Body>
                <p>I'm always open to hearing about new opportunities! If you think my skillset may be useful to your project or business, please reach out!</p>
                  <Form onSubmit={(e) => handleSubmit(e)} method="POST" id="contact-form">
                    <Row>
                      <Col lg={6}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="First Name" name="first_name" onChange={(e) => handleChange(e)}  value={state.first_name}/>
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Last Name" name="last_name" onChange={(e) => handleChange(e)}  value={state.last_name}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)}  value={state.email}/>
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>I Am A...</Form.Label>
                          <Form.Control as="select" name="id" onChange={(e) => handleChange(e)} value={state.id}>
                            <option>Agency Recruiter</option>
                            <option>Workplace Recruiter</option>
                            <option>Independent Recruiter</option>
                            <option>Stalker</option>
                            <option>Bot</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Form.Group controlId="exampleForm.ControlTextarea1" >
                          <Form.Label>Leave a message:</Form.Label>
                          <Form.Control as="textarea" rows="3" name="message" onChange={(e) => handleChange(e)} value={state.message}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                      Submit
                                        </Button>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
   
      <Modal show={show} onHide={handleClose} className="email-confirmation">
        <Modal.Header closeButton>
          <Modal.Title>Send Status...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{display: state.sending ? "block" : "none"}}>
        <Spinner animation="border" /> Message sending...
          </div>
          <div style={{display: state.sending ? "none" : "block"}}>
        {(state.success) ? "Message Received.  I'll be in touch with you soon!" : <p>Message not delivered (I promise this form worked when I set it up!), please email <a href="mailto:kmadden84@gmail.com">kmadden84@gmail.com</a></p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={loadShow} onHide={handleLoadClose}>
      
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
          console.log(props.loadStatus, props.loadFailed)
            
        })() 
      } 
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoadClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
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
 

Cards.propTypes = {
  heroku: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, {heroku, reset})(Cards)

