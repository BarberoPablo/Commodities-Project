import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import {MdFavorite} from 'react-icons/md'

function AutohideExample({ show,setShow,handleClick,e}) {

  return (
    <Row>
      <Col>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          autohide
          style={{ position: "absolute", right: "2%", top: "10" }}
        >
          <Toast.Header>
            <strong className="me-auto">{e.title}</strong>
            <small>{e.categoryName}</small>
          </Toast.Header>
          <Toast.Body>
            <a href={"/favorites"} style={{ textDecoration: "none" }}>
              MY FAVORITES
            </a>
          </Toast.Body>
        </Toast>
      </Col>
      <Col>
        <Button onClick={handleClick}>{<MdFavorite />}</Button>
      </Col>
    </Row>
      
  );
}

export default AutohideExample;