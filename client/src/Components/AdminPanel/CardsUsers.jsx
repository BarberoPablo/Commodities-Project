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

<p>{e.name} {e.email}</p>

<button onClick={()=>handleBan(e)}>{e.isBanned? "UNBAN USER":"BAN USER"}</button>


<p>{e.verified? "VERIFIED":"NOT VERIFIED"} {e.isBanned? "BANNED":"NOT BANNED"}</p>

              </div>
              )
            })
        }
</div>
  )
}
