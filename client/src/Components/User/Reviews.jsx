import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import s from "./Users.module.css";
import { BsStarFill, BsStar } from "react-icons/bs";

function AutohideExample({profileUser}) {
  const [show, setShow] = useState(false);

  return (
      <div className={s.date}>
        <ToastContainer className={s.toast} style={{maxWidth: '50%'}} >
        {profileUser?.reviewUser?.reviews?.map((e) => (
          <Toast onClose={() => setShow(false)} show={show} animation={true} style={{minWidth: '100%', backgroundColor: '#151e22'}}>
            <Toast.Header  style={{color: '#151e22'}}>
            {e.score === '1' ? <strong className="me-auto"><BsStarFill/> <BsStar/> <BsStar/> <BsStar/> <BsStar/></strong> : null}
            {e.score === '2' ? <strong className="me-auto"><BsStarFill/> <BsStarFill/> <BsStar/> <BsStar/> <BsStar/></strong> : null}
            {e.score === '3' ? <strong className="me-auto"><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/> <BsStar/></strong> : null}
            {e.score === '4' ? <strong className="me-auto"><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/></strong> : null}
            {e.score === '5' ? <strong className="me-auto"><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/></strong> : null}
            </Toast.Header>
              <Toast.Body>{e.comment}</Toast.Body>
          </Toast>
        ))}
        </ToastContainer>
        {profileUser?.reviewUser?.reviews?.length > 0 ? 
        <Button onClick={() => setShow(!show)} variant="outline-light" size='sm'>Reviews</Button>
        : 
        <Button onClick={() => setShow(!show)} variant="outline-light" size='sm' disabled>Reviews</Button>
        }
     </div>
  );
}

export default AutohideExample;