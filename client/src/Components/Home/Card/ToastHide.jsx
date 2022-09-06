import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
function AutohideExample({ show, setShow, handleClick, e, Fav}) {
  const myUser = useSelector((state) => state.users.user);

  return (
    <Row>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={1500}
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
      
      {console.log(myUser.favoritesIds, e.id)}
      {myUser.favoritesIds?.includes(e.id) ? 
      <Button onClick={handleClick} variant="outline-light" >
          {<MdFavorite style={{color:'red'}} />}
      </Button> 
      : <Button onClick={handleClick} variant="outline-light" >
          {<MdFavorite style={{color:'gray'}} />}
      </Button>}
    </Row>
  );
}

export default AutohideExample;
