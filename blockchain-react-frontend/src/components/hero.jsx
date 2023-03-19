import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styles.css';
const Hero = () => {
  return (
    <div
      className="hero-section"
      // style={{ backgroundImage: `url('/path/to/image.jpg')` }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1>Heading text</h1>
            <p>Some subheading or description text goes here</p>
            <button className="btn btn-primary">Call-to-action button</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;