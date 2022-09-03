import { banUser } from "../../Redux/Actions/Actions";
import { useDispatch } from "react-redux";


export default function CardsUsers ({allUsers}) {
  const dispatch = useDispatch();


function handleBan(e){
dispatch(banUser(e.id))

}

  return(
<div>
  <p>usuarios:</p>
{allUsers?.map((e) => {
  console.log(e.isBanned)
          return (
            <div>

<img src={e.image} alt={e.name} />


<input type="text" placeholder={e.name}/>
<input type="text" placeholder={e.email}/>

<button>UPDATE USER</button>
<button onClick={()=>handleBan(e)}>BAN USER</button>
<p>{e.name}</p>
{/* <p>{e.country}</p> 
<p>{e.email}</p> */}
<p>{e.verified? "VERIFIED":"NOT VERIFIED"} {e.isBanned? "BANNED":"NOT BANNED"}</p>

              </div>
              )
            })
        }
</div>
  )
}
