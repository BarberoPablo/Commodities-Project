import React from "react";
import CardDetail from "./CardDetail";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const Cards = ({ currentPost, setFav, Fav }) => {
  const { allUsers } = useSelector((state) => state.users);

  return (
    <Container
      fluid="md"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Row style={{ width: "80%" }}>
        {allUsers.length > 0
          ? currentPost?.map((e, i) => {
              const actualUser = allUsers.find((user) => e.userId === user.id);
              return actualUser.isBanned ? null : (
                <CardDetail
                  Fav={Fav}
                  setFav={setFav}
                  e={e}
                  key={i}
                  user={actualUser}
                />
              );
            })
          : null}
      </Row>
    </Container>
  );
};

export default Cards;
/*
currentPost?.map((e, i) => {
              return (
                <CardDetail
                  Fav={Fav}
                  setFav={setFav}
                  e={e}
                  key={i}
                  user={allUsers.find((c) => e.userId === c.id)}
                />
              );
            })
*/

/*
<Row style={{ width: "80%" }}>
        {allUsers.length > 0
          ? currentPost?.map((e, i) => {
              const actualUser = allUsers.find((user) => e.userId === user.id);
              return actualUser.isBanned ? null : (
                <CardDetail
                  Fav={Fav}
                  setFav={setFav}
                  e={e}
                  key={i}
                  user={actualUser.id}
                />
              );
            })
          : null}
      </Row>
*/
