import "./App.css";
import Home from "./Components/Home/Home";
// import { getPost,getUser } from './Redux/Actions/Actions'; action para hacer el dispatch y treaer users,posts,etc
import { Route } from "react-router-dom";
import Footer from "./Components/Home/Footer/Footer.jsx";
import AboutUs from "./Components/Home/Footer/AboutUs.jsx";
import ContactUs from "./Components/Home/Footer/ContactUs.jsx";
import PrivacyPolicy from "./Components/Home/Footer/PrivacyPolicy.jsx";
import TermsOfUse from "./Components/Home/Footer/TermsOfUse.jsx";
import Glosary from "./Components/Home/Footer/Glosary";
import CreatePost from "./Components/CreatePost/CreatePost.jsx";
import Navbar from "./Components/Home/Navbar/Navbar";
import Profile from "./Components/User/Profile";
import { useEffect, useState } from "react";
import Memberships from "./Components/Memberships/Memberships";
import Feedback from "./Components/Home/Footer/Feedback.jsx";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import ProfileUser from "./Components/User/ProfileUser";
import Favorites from "./Components/Home/Favorites/Favorites";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [Fav, setFav] = useState(() => {
    const savedFav = window.localStorage.getItem("Fav");
    if (savedFav) {
      return JSON.parse(savedFav);
    } else {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("Fav", JSON.stringify(Fav));
  }, [Fav]);

  return (
    <div className="App">
      <Route path={"/"}>
        <Navbar setCurrentPage={setCurrentPage} />
      </Route>
      <Route exact path={"/"}>
        <Home currentPage={currentPage} setCurrentPage={setCurrentPage} setFav={setFav} Fav={Fav} />
      </Route>
      <Route path="/create-post" component={CreatePost} />
      <Route path={"/about-us"} component={AboutUs} />
      <Route path={"/contact-us"} component={ContactUs} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/terms-of-use"} component={TermsOfUse} />
      <Route path={"/glosary"} component={Glosary} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/memberships"} component={Memberships} />
      <Route path={"/feedback"} component={Feedback} />
      <Route path={"/admin-panel"} component={AdminPanel} />
      <Route path={"/profile-user"} component={ProfileUser} />
      <Route path={"/favorites"} component={Favorites} />
      {/* More routes eje: Profile, Post, UserProfile  */}
    </div>
  );
}

export default App;
