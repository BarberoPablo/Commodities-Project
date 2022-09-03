import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { MdFavorite } from "react-icons/md";

function AutohideExample({ show, setShow, handleClick, e, Fav}) {
  return (
    <Row>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide
        style={{ position: "absolute", right: "0", top: "20", width: "14.2%" }}
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
      <Button onClick={handleClick} variant="outline-light" >
          {<MdFavorite style={{color:'red'}} />}
        </Button>
    </Row>
  );
}

export default AutohideExample;
