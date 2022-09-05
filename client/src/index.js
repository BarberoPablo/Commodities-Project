import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import dotenv from "dotenv";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <Auth0Provider
          domain="dev-8blc4gou.us.auth0.com"
          clientId="tJkc2r5FoNG8a49WAtltabd4coXLKCzj"
          // redirectUri={"https://dev-commodities.vercel.app/profile"}
          redirectUri={"http://localhost:3000/profile"}

        >
          <App />
        </Auth0Provider>
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
