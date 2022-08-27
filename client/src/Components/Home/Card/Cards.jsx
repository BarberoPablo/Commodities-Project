import React from "react";
import CardDetail from "./CardDetail";
import s from "./Card.module.css"
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const Cards = ({ currentPost }) => {
  const { allUsers } = useSelector((state) => state.users);

  return (
    <Container fluid="md">
      <Row>
        {currentPost?.map((e, i) => {
          return (
            <CardDetail
              e={e}
              key={i}
              user={allUsers.find((c) => e.userId === c.id)}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default Cards;
