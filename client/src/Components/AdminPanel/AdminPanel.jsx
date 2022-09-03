import {React,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getPost, getUser } from "../../Redux/Actions/Actions";
import CardsPost from "./CardsPost";
import CardsUsers from "./CardsUsers";
import CardsReview from "./CardsReviews";
import CreateCategory from "./CreateCategory";
import AdminMemberships from "./AdminMemberships";
import Reports from "./Reports";


export default function AdminPanel() {

const dispatch = useDispatch();

const { posts } = useSelector((state) => state.posts);
const { allUsers } = useSelector((state) => state.users);
const { user } = useAuth0();


useEffect(() => {
  dispatch(getPost());
  dispatch(getUser())
}, [dispatch]);

const [showPost, setShowPost]  = useState(false)
function clickPost(){
  dispatch(getPost())
  if(!showPost){
    setShowPost(true)
    setShowReports(false)
    setShowUsers(false)
    setShowCategory(false)
    setShowReviews(false)
    setShowMemberships(false)
  }
}
const [showUsers, setShowUsers]  = useState(false)
function clickUsers(){
  dispatch(getUser())
  if(!showUsers){
    setShowUsers(true)
    setShowPost(false)
    setShowCategory(false)
    setShowReviews(false)
    setShowMemberships(false)
    setShowReports(false)
  }
}
const [showCategory, setShowCategory]  = useState(false)
function clickCategory(){
  //dispatch(getUser())
  if(!showCategory){
    setShowCategory(true)
    setShowReports(false)
    setShowPost(false)
    setShowUsers(false)
    setShowReviews(false)
    setShowMemberships(false)
  }
}
const [showReviews, setShowReviews]  = useState(false)
function clickReviews(){
  //dispatch(getUser())
  if(!showReviews){
    setShowReviews(true)
    setShowReports(false)
    setShowCategory(false)
    setShowPost(false)
    setShowUsers(false)
    setShowMemberships(false)
  }
}
const [showMemberships, setShowMemberships]  = useState(false)
function clickMemberships(){
  //dispatch(getUser())
  if(!showMemberships){
    setShowMemberships(true)
    setShowReviews(false)
    setShowCategory(false)
    setShowPost(false)
    setShowUsers(false)
    setShowReports(false)
  }
}
const [showReports, setShowReports]  = useState(true)
function clickReports(){
  //dispatch(getUser())
  if(!showReports){
    setShowReports(true)
    setShowMemberships(false)
    setShowReviews(false)
    setShowCategory(false)
    setShowPost(false)
    setShowUsers(false)
  }
}


  return(
    <div>
    <button onClick={()=>clickReports()} >Reports</button>
    <button onClick={()=>clickUsers()}>Users</button>
    <button onClick={()=>clickPost()}>Posts</button>
    <button onClick={()=>clickReviews()}>Reviews</button>
    <button onClick={()=>clickMemberships()}>Memberships</button>
    <button onClick={()=>clickCategory()}>Category</button>

{showUsers &&
<div>
<CardsUsers allUsers={allUsers} />
</div>
}
{showPost &&
<div>
<CardsPost currentPost={posts}/>
</div>
}
{showCategory &&
<div>
  <CreateCategory/>
</div>}
{showReviews &&
<div>
<CardsReview allUsers={allUsers}/>
</div>}
{showMemberships &&
<div>
<AdminMemberships/>
</div>}
{showReports &&
<div>
<Reports currentPost={posts}/>
</div>}
  </div>
)
}
