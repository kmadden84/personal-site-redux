import React, { Component, useState } from 'react';
import { Navbar, Row, Col, Jumbotron, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Skills = (props) => {
    let yearVal = new Date().getFullYear();
    console.log(yearVal)

    return (

        <div className="cardList">
        <Container>
            <Row>
                <Col md={12} lg={12}>
                    <Jumbotron>
                        <h1>Skills</h1>
                        <p>I'm a web developer with many years' front-end experience working on production level sites.  My code stack includes:</p>
                     <ul>
                     <li>HTML5</li>
                     <li>CSS3 / Bootstrap</li>
                     <li>JavaScript</li>
                     <li>jQuery</li>
                     <li>React.js / Redux / Hooks</li>
                     <li>Node.js / Express</li>
                     <li>SQL</li>
                     </ul>

                     <p>My "To Learn" list includes: Python, PHP, and Angular</p>

                    </Jumbotron>
                    <button onClick={()=> props.history.goBack()}>Go Back</button>

                </Col>

            </Row>

            </Container>

        </div>

    );
}

export default Skills;