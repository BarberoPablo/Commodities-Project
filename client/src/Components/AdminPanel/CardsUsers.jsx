
export default function CardsUsers ({allUsers}, {allCountries}) {
console.log(allCountries)

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
<select>
        <option hidden value="">
        {e.country}
        </option>
        {allCountries?.map((c) => (
          <option value={c.name.common}>{c.name.common}</option>
        ))}
</select>
<button>UPDATE USER</button>
<button>BAN USER</button>
{/* <p>{e.name}</p>
<p>{e.country}</p> 
<p>{e.email}</p> */}
<p>{e.verified? "VERIFIED":"NOT VERIFIED"} {e.isBanned? "BANNED":"NOT BANNED"}</p>

              </div>
              )
            })
        }
</div>
  )
}
