import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { MdFavorite } from "react-icons/md";

function AutohideExample({ show, setShow, handleClick, e }) {
  return (
    <Row>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide
        style={{ position: "absolute", right: "0", top: "20",width:'14.2%' }}
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
      <Button onClick={handleClick}>{<MdFavorite />}</Button>
    </Row>
  );
}

export default AutohideExample;
