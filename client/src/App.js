import './App.css';
import Home from './Components/Home/Home';
// import { getPost,getUser } from './Redux/Actions/Actions'; action para hacer el dispatch y treaer users,posts,etc
import {Route} from 'react-router-dom'
import Footer from "./Components/Home/Footer/Footer.jsx"
import AboutUs from "./Components/Home/Footer/AboutUs.jsx"
import ContactUs from "./Components/Home/Footer/ContactUs.jsx"
import PrivacyPolicy from "./Components/Home/Footer/PrivacyPolicy.jsx"
import TermsOfUse from "./Components/Home/Footer/TermsOfUse.jsx"
import Glosary from './Components/Home/Footer/Glosary';
import CreatePost from "./Components/CreatePost/CreatePost.jsx"
import Navbar from './Components/Home/Navbar/Navbar';

function App() {

  return (
    <div className="App">
      <Route path={'/'} component={Navbar}/>
      <Route exact path={'/'} component={Home}/>
      <Route path="/create-post" component={CreatePost}/>
      <Route path={'/about-us'} component={AboutUs}/>
      <Route path={'/contact-us'} component={ContactUs}/>
      <Route path={'/privacy-policy'} component={PrivacyPolicy}/>
      <Route path={'/terms-of-use'} component={TermsOfUse}/>
      <Route path={'/glosary'} component={Glosary}/>
      <Route path={'/'} component={Footer}/>
      {/* More routes eje: Profile, Post, UserProfile  */}
    </div>
  );
}

export default App;
