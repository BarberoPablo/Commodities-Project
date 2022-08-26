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
import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Memberships from "./Components/Memberships/Membership";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PayPalScriptProvider
      options={{ "client-id": "AQmAOKkaooq3WRmt-zUyck2qmSVYykzLUOhUfHPFDEFfDGY92Pn_ExDZCdG2zmreMqCBN3tGJta5vEBT" }}
    >
      <div className="App">
        <Route path={"/"}>
          {" "}
          <Navbar setCurrentPage={setCurrentPage} />
        </Route>
        <Route exact path={"/"}>
          {" "}
          <Home currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Route>
        <Route path="/create-post" component={CreatePost} />
        <Route path={"/about-us"} component={AboutUs} />
        <Route path={"/contact-us"} component={ContactUs} />
        <Route path={"/privacy-policy"} component={PrivacyPolicy} />
        <Route path={"/terms-of-use"} component={TermsOfUse} />
        <Route path={"/glosary"} component={Glosary} />
        <Route path={"/profile"} component={Profile} />
        <Route path={"/"} component={Footer} />
        <Route path={"/memberships"} component={Memberships} />
        {/* More routes eje: Profile, Post, UserProfile  */}
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
