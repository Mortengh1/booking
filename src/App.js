import { Routes, Route } from "react-router-dom";
import Bookings from "./pages/Bookings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import ResSignup from "./pages/ResSignup";
import Nav from "./components/Nav";
import Protected from "./components/Protected";
import "./App.css";
import logo from "./images/utensils-solid.svg";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return (
    <main>
      <div className="Header">
        <div className="Logo">
          <a className="LogoLink" href="/">
            <img className="LogoIcon" src={logo} alt="" />
            <span>Restaurant Booking</span>
          </a>
        </div>
        <div className="navigation">
          <Nav />
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="Registration" element={<Registration />} />
          <Route path="ResSignup" element={<ResSignup />} />
          <Route
            index
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Home />
              </Protected>
            }
          />
          <Route
            path="Bookings"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Bookings />
              </Protected>
            }
          />
          <Route
            path="Profile"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="*"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <NoPage />
              </Protected>
            }
          />
        </Routes>
      </div>
    </main>
  );
}

export default App;
