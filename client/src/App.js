import './App.css';
import Home from './Components/Home/Home';
// import { getPost,getUser } from './Redux/Actions/Actions'; action para hacer el dispatch y treaer users,posts,etc
import {Route} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Route exact path={'/'} component={Home}/>
      {/* More routes eje: Profile, Post, UserProfile  */}
    </div>
  );
}

export default App;
