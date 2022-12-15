import { React, useRef, useState, useEffect } from "react";
import axios from "../api/axios";

const Profile = () => {
  //Gets the user id from loaclStorage
  const userId = localStorage.getItem("userId");
  //The url to the php file that gets the user information from the database
  const USERS_URL = "https://skole.mortengh.dk/PHP/users.php";
  //The url that handles the user information update
  const UPDATE_USERS_URL = "https://skole.mortengh.dk/PHP/updateUser.php";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNr, setPhoneNr] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  //Gets the user information based on user id
  useEffect(() => {
    axios.post(USERS_URL, JSON.stringify({ userId })).then((result) => {
      setFirstName(result.data.firstname);
      setLastName(result.data.lastname);
      setAge(result.data.age);
      setMail(result.data.mail);
      setPhoneNr(result.data.phonenr);
    });
  }, []);

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeAge = (e) => {
    setAge(e.target.value);
  };
  const handleChangePhoneNr = (e) => {
    setPhoneNr(e.target.value);
  };

  //Send a request to update the users information with the values from the field in the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        UPDATE_USERS_URL,
        JSON.stringify({ firstName, lastName, age, phoneNr, userId })
      )
      .then((result) => {
        if (result.data.status == "invalid") {
          //If the request is invalid, it sets the error message to the error
          setErrMsg(result.data.errorMessage);

        } else {
        }
      });
  };

  return (
    <>
      <div className="ProfileContainer">
        <div className="ProfileForm">
          <h1>Din profil</h1>
          <form onSubmit={handleSubmit}>
            <p
              ref={errRef}
              className={errMsg ? "ErrorMessage" : "offScreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <label htmlFor="firstName">Fornavn:</label>
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={(event) => handleChangeFirstName(event)}
            />
            <label htmlFor="lastName">Efternavn:</label>
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={(event) => handleChangeLastName(event)}
            />
            <label htmlFor="age">Alder:</label>
            <input
              name="age"
              type="text"
              value={age}
              onChange={(event) => handleChangeAge(event)}
            />
            <label htmlFor="mail">E-mail:</label>
            <input name="mail" type="text" value={mail} disabled />
            <label htmlFor="phoneNr">Tlf. Nr.:</label>
            <input
              name="phoneNr"
              type="text"
              value={phoneNr}
              onChange={(event) => handleChangePhoneNr(event)}
            />
            <button className="btn">Opdater</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
