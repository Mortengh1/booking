import { useRef, useState, useEffect } from "react";

import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
//The url to the php file that handles login requests
const LOGIN_URL = "https://skole.mortengh.dk/PHP/login.php";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //Stores the page the user tried to acces without being logged in
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //Tells which field to focus
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  //When submitting the login form, it runs the post request with the mail and password
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(LOGIN_URL, JSON.stringify({ mail: user, pwd }))
      .then((result) => {
        console.log(result.data);
        if (result.data.status == "invalid") {
          //If the request is invalid, it sets the error message
          setErrMsg(result.data.errorMessage);
        } else {
          //Stores the user id in loaclStoreafe and sets loggedIn to true
          localStorage.setItem("userId", result.data.userId);
          localStorage.setItem("loggedIn", true);
          //Empties the user and password field
          setUser("");
          setPwd("");
          //Navigates to the stored page from earlier
          navigate(from, { replace: true });
          //Reloads the site
          window.location.reload();
        }
      });
  };

  return (
    <div className="App">
      <div className="LoginContainer">
        <div className="LoginForm">
          <h1>Log ind</h1>
          <p
            ref={errRef}
            className={errMsg ? "ErrorMessage" : "offScreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              onChange={(e) => setUser(e.currentTarget.value)}
              value={user}
              required
            ></input>
            <label htmlFor="password">Kodeord:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.currentTarget.value)}
              value={pwd}
              required
            ></input>
            <button className="btn">Log ind</button>
            <p>
              Har du ikke en bruger? <br />
              Så registrer dig <a href="/registration">her</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
