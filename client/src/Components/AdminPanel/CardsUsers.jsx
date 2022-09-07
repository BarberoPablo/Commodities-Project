import { banUser } from "../../Redux/Actions/Actions";
import { useDispatch } from "react-redux";
import x from "./Admin.module.css"

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
            <div className={x.cardR}>

<img src={e.image} alt={e.name} className={x.item} id={x.img} />

<p className={x.item}>{e.name} {e.email}</p>

<button onClick={()=>handleBan(e)} className={x.item}>{e.isBanned? "UNBAN USER":"BAN USER"} </button>

<p className={e.isBanned? x.BANNED:x.NOTBANNED}> {e.isBanned? "BANNED":"NOT BANNED"}</p>
{/* {e.verified? "VERIFIED":"NOT VERIFIED"} */}

              </div>
              )
            })
        }
</div>
  )
}
