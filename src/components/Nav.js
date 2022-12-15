import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
    //Get the loggedIn status from localStorage
    const isLoggedIn = localStorage.getItem('loggedIn');
    //If the user clicks the logout button, it clears the localStorage and reloads the page
    const logout =  async () =>{
        localStorage.setItem('userId', '');
        localStorage.setItem('loggedIn', '');
        localStorage.clear();
        window.location.reload();
    }

    return (
      //If the user is logged in, the nav lets the user see the nav for logged in users
      //If the user is not logged in, it lets the user see the nav for users that are not logged in
        isLoggedIn
        ? <nav>
            <NavLink to="/" end>Restauranter</NavLink>
            <NavLink to="/Bookings">Bookings</NavLink>
            <NavLink to="/Profile">Profil</NavLink>
          <button onClick={logout}>Log ud</button>
        </nav>
        :   <nav>
                <NavLink to="/" end>Restauranter</NavLink>
                <NavLink to="/Bookings">Bookings</NavLink>
                <NavLink to="/Registration">Registrer</NavLink>
                <NavLink to="/Login">Log ind</NavLink>
              
            </nav>
        
    );
}
