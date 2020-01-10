import React, { Component, useState } from 'react';
import { Row, Col, Jumbotron, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const About = (props) => {
  let yearVal = new Date().getFullYear();

  return (

    <div className="cardList">
      <Container>
        <Row>
          <Col md={12} lg={12}>
            <Jumbotron>
              <h1>About Me</h1>
              <p>
                Hey there! I'm an experienced Toronto-based web developer and lifelong learner who loves keeping up to date with the latest updates in web development!  I've worked on many sites for many Fortune 500 companies, including FaceBook, Apple, LinkedIn, Shopify, Twitter, and others.  My code stack includes HTML5, CSS3, Vanilla JavaScript, jQuery, SQL, PHP, Node.js and React.js.
                    The site you're currently on was built with React, Node, and Bootstrap. I'm always open to hearing about new opportunities!  If you'd like to get in touch, feel free to reach out to me via the contact form on the <Link to="/#contact">Home</Link> page.
              </p>
            </Jumbotron>
            <button onClick={() => props.history.goBack()}>Go Back</button>
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default About;