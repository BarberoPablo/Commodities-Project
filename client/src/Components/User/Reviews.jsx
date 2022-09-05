import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'

function AutohideExample({profileUser}) {
  const [show, setShow] = useState(false);

  console.log('Reviews',profileUser.reviewUser)

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position='middle-center'>
        {profileUser?.reviewUser?.reviews?.map((e) => (
          <Toast onClose={() => setShow(false)} show={show}>
            <Toast.Header>
              <strong className="me-auto">{e.score}</strong>
            </Toast.Header>
              <Toast.Body>{e.comment}</Toast.Body>
          </Toast>
        ))}
        </ToastContainer>
      </Col>
      <Col xs={6}>
        <Button onClick={() => setShow(!show)}>Reviews</Button>
      </Col>
    </Row>
  );
}

export default AutohideExample;