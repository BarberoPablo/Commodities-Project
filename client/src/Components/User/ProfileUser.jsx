import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Users.module.css";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { getProfileDetails, getPost, getContactsUser,getUserDetails, getUser } from "../../Redux/Actions/Actions";
import {useAuth0} from '@auth0/auth0-react' 

const ProfileUser = ({ match }) => {
  const id = match.params.id;
  const { profileUser } = useSelector((state) => state.users); //trae los datos de un usuario en especifico
  const { posts } = useSelector((state) => state.posts); //trae todos los posts
  const filter = posts.filter((e) => e.userId === profileUser.id); //filtra los posts del usuario seleccionado
  const [showA, setShowA] = useState(false);
  const dispatch = useDispatch();
  const toggleShowA = () => setShowA(!showA);
  const {user} = useAuth0()

  // CHANGES
  console.log('profileUser',profileUser)
  // console.log('filter',filter)
  // console.log('posts',posts)
  
  const userLog = useSelector((state)=>state.users.user) // trae un array con los datos del usuario logeado
  console.log('userLog',userLog)

  const toggleShowB = (e) =>{
    dispatch(getContactsUser(userLog?.id,id))// dispatch llenar el array de contactos con el id del usuario logeado y el id del usuario que hizo el posteo
  }
  //

  useEffect(() => {
    dispatch(getUser()) //trae todos los usuarios
    dispatch(getProfileDetails(id)); //trae los datos del usuario en especifico 
    dispatch(getPost()); //trae todos los posteos
  }, [dispatch]);
  
  useEffect(()=>{
    if(user){
      dispatch(getUserDetails(user.email))
    }
  },[user])

  return (
    <>
      {profileUser ? (
        <div className={s.container}>
          <div className={s.card}>
            <div className={s.user_photo} id="user_photo">
              <img src={profileUser.image} alt="a" />
            </div>
            { 
              userLog.contactsIds?.includes(profileUser.id) ? 
             <div>
              <p>{profileUser.name}</p>
              <p>{profileUser.email}</p>
              <p>{profileUser.phone}</p>
              <p>{profileUser.country}</p>
             </div>
             :
              null
            }
            <Button variant="warning" className={s.btn} size="sm" onClick={toggleShowB}>
              Contact
            </Button>
            <ToastContainer position="bottom-center">
              <Toast show={showA} onClose={toggleShowA} bg="secondary">
                <Toast.Body>By accepting, one of your contacts will be deducted, are you sure?</Toast.Body>
                {/* <Button variant="warning" size="sm" onClick={toggleShowB}>
                  ok
                </Button> */}
              </Toast>
            </ToastContainer>
          </div>
          <div className={s.containerPost}>
            {filter &&
              filter.map((e, i) => {
                return (
                  <div key={i} className={s.container_x}>
                    <div className={s.container_a}>
                      {e.sell ? (
                        <p
                          style={{
                            color: "red",
                            marginTop: "20px",
                            marginLeft: "15px",
                          }}
                        >
                          Seller
                        </p>
                      ) : (
                        <p
                          style={{
                            color: "green",
                            marginTop: "20px",
                            marginLeft: "15px",
                          }}
                        >
                          Buyer
                        </p>
                      )}
                      <p className={s.container_time}>
                        {e.createdAt
                          .slice(0, 10)
                          .replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1")}
                      </p>
                    </div>
                    <div className={s.container_b}>
                      <p>
                        Category: <b>{e.categoryName}</b>
                      </p>
                      <p>
                        Sub Category: <b>{e.subCategory}</b>
                      </p>
                      <p>
                        Country: <b>{e.country}</b>
                      </p>
                      <p>
                        payment:{" "}
                        {e.payment?.map((e, i) => {
                          return <b key={i}>{e} </b>;
                        })}
                      </p>
                      <p>
                        Shipping: <b>{e.shipping}</b>
                      </p>
                    </div>
                    <div>
                      <hr />
                      <b>{e.title}</b>
                      <p>{e.description}</p>
                      {e.image ? (
                        <img
                          src={e.image}
                          alt={e.title}
                          style={{ width: "30%", height: "30%" }}
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <h1>aaaaaaaaaa</h1>
      )}
    </>
  );
};

export default ProfileUser;


// NO SE PUEDE BUSCAR UN PERFIL POR PARAMS PORQUE SE ROMPE 