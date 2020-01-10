import { Accordion, Card, Button, Row, Col, Container, Jumbotron, ListGroup, Modal, Spinner } from 'react-bootstrap'
import React, { Component, useState } from 'react';

const CV = (props) => {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setLoading(true);
  }
  const handleImageLoaded = () => {
    setLoading(false);
  }

  return (
    <div className="cardList">
      <Container>
        <Row>
          <Col md={12} lg={12}>
            <Jumbotron>
              <Accordion defaultActiveKey="0">
                <h1>
                  Curriculum Vitae
                </h1>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <strong>Bell Media</strong> - Jr. Front End Developer / Site Production Specialist (November 2019-Present)
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <ListGroup>
                        <ListGroup.Item>Updating the Bell.ca website using HTML5, CSS3, JavasScript, and jQuery</ListGroup.Item>
                        <ListGroup.Item>Working with clients and stakeholders to ensure accurate, timely delivery of website content</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      <strong>Q4 Inc</strong> - Jr. Front End Developer / Web Support Analyst (June 2014 - February 2019)
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <ListGroup>
                        <ListGroup.Item>Primary role at Q4 was to maintain and update company Investor Relations websites and apps. Worked with companies including Best Buy, Wal-Mart, LinkedIn, Nike, Shopify, Apple and other large Fortune 500 IR teams</ListGroup.Item>
                        <ListGroup.Item>Updated and built websites using HTML5, CSS3, jQuery, and JavaScript</ListGroup.Item>
                        <ListGroup.Item>Built out custom functionality as required</ListGroup.Item>
                        <ListGroup.Item>Built site pages from Photoshop mock-ups</ListGroup.Item>
                        <ListGroup.Item>Drafted responsive emails in HTML/CSS and distribute to client email subscribers</ListGroup.Item>
                        <ListGroup.Item>Optimized SEO using meta, alt, and title tags, site-speed optimization, as well as using sitemaps via Webmaster Tools, Google Analytics & Search Console, 301 redirects, and more</ListGroup.Item>
                        <ListGroup.Item>Updated sites to ensure Accessibility/WCAG compliance (ARIA labels, title tags, alt tags, contrast toggles, etc…)</ListGroup.Item>
                        <ListGroup.Item>Worked with clients and stakeholders to ensure accurate, timely delivery of website content</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                      <strong>SigmaXL Inc.</strong> - Webmaster / Office Manager / Software QA (November 2010 - March 2014)
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <ListGroup>
                        <ListGroup.Item>Updated the website using HTML, CSS and JavaScript</ListGroup.Item>
                        <ListGroup.Item>Updated software help documentation</ListGroup.Item>
                        <ListGroup.Item>Optimized the website's organic and paid SEO using Google AdWords, Bing Ads, Google Analytics and Webmaster Tools</ListGroup.Item>
                        <ListGroup.Item>Managed Social Media presence (Twitter, Facebook, LinkedIn)</ListGroup.Item>
                        <ListGroup.Item>Managed Invoicing, Sales Tracking and Processing</ListGroup.Item>
                        <ListGroup.Item>Handled accounts payable and payroll</ListGroup.Item>
                        <ListGroup.Item>Tested software to ensure compliance with workbook</ListGroup.Item>
                        <ListGroup.Item>Created, narrated, edited, and compressed website help videos with Camtasia </ListGroup.Item>
                        <ListGroup.Item>Provided technical support to clients over phone, email and live chat</ListGroup.Item>
                        <ListGroup.Item>Working with clients and stakeholders to ensure accurate, timely delivery of website content</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                      <strong>Education</strong>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <ListGroup>
                        <ListGroup.Item>Simon Fraser University: Bachelor of Arts, Major: Criminology. 2007.</ListGroup.Item>
                        <ListGroup.Item>Team Treehouse: <a rel="noopener noreferrer" href="https://join.teamtreehouse.com/full-stack-javascript-techdegree/?_ga=2.160914429.1792897713.1575135632-963753930.1575135632" target="_blank">FullStack JavaScript</a>. <a className="link" onClick={handleShow}>Certificate of Completion</a>. 2019.</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Jumbotron>
            <button onClick={() => props.history.goBack()}>Go Back</button>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Certificate of Completion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: loading ? "block" : "none" }}>
              <Spinner animation="border" />
            </div>
            <img
              src="https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/13234958"
              onLoad={() => handleImageLoaded()}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>

  );
}

export default CV;