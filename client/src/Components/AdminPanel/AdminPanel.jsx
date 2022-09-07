import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getPostAdmin, getUser, getUserDetails } from "../../Redux/Actions/Actions";
import CardsPost from "./CardsPost";
import CardsUsers from "./CardsUsers";
import CardsReview from "./CardsReviews";
import AdminMemberships from "./AdminMemberships";
import Reports from "./Reports";

export default function AdminPanel() {
  const dispatch = useDispatch();

  const { allPostsAdmin } = useSelector((state) => state.posts);
  const { allUsers } = useSelector((state) => state.users);
  const userLog = useSelector((state) => state.users.user);
  const { user } = useAuth0();

  useEffect(() => {
    dispatch(getPostAdmin());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getUserDetails(user.email));
    }
  }, [user]);

  const [showPost, setShowPost] = useState(false);
  function clickPost() {
    dispatch(getPostAdmin());
    if (!showPost) {
      setShowPost(true);
      setShowReports(false);
      setShowUsers(false);
      setShowReviews(false);
      setShowMemberships(false);
    }
  }
  const [showUsers, setShowUsers] = useState(false);
  function clickUsers() {
    dispatch(getUser());
    if (!showUsers) {
      setShowUsers(true);
      setShowPost(false);
      setShowReviews(false);
      setShowMemberships(false);
      setShowReports(false);
    }
  }
  const [showReviews, setShowReviews] = useState(false);
  function clickReviews() {
    //dispatch(getUser())
    if (!showReviews) {
      setShowReviews(true);
      setShowReports(false);
      setShowPost(false);
      setShowUsers(false);
      setShowMemberships(false);
    }
  }
  const [showMemberships, setShowMemberships] = useState(false);
  function clickMemberships() {
    //dispatch(getUser())
    if (!showMemberships) {
      setShowMemberships(true);
      setShowReviews(false);
      setShowPost(false);
      setShowUsers(false);
      setShowReports(false);
    }
  }
  const [showReports, setShowReports] = useState(true);
  function clickReports() {
    //dispatch(getUser())
    if (!showReports) {
      setShowReports(true);
      setShowMemberships(false);
      setShowReviews(false);
      setShowPost(false);
      setShowUsers(false);
    }
  }

  return (
    <div>
      {userLog && userLog.isAdmin ? (
        <div>
          <button onClick={() => clickReports()}>Reports</button>
          <button onClick={() => clickUsers()}>Users</button>
          <button onClick={() => clickPost()}>Posts</button>
          <button onClick={() => clickReviews()}>Reviews</button>
          <button onClick={() => clickMemberships()}>Memberships</button>

          {showUsers && (
            <div>
              <CardsUsers allUsers={allUsers} />
            </div>
          )}
          {showPost && (
            <div>
              <CardsPost currentPost={allPostsAdmin} />
            </div>
          )}
          {showReviews && (
            <div>
              <CardsReview allUsers={allUsers} />
            </div>
          )}
          {showMemberships && (
            <div>
              <AdminMemberships />
            </div>
          )}
          {showReports && (
            <div>
              <Reports currentPost={allPostsAdmin} />
            </div>
          )}
        </div>
      ) : (
        <h1>Admin required</h1>
      )}
    </div>
  );
}
